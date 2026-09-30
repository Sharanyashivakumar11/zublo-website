const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');

const script = readFileSync(`${__dirname}/expo.js`, 'utf8');

function setup(fetch, values = {}, valid = true) {
  let submit, timer, cleared = false, resets = 0;
  const events = [];
  const form = {
    action: 'https://example.test/submit',
    reportValidity: () => valid,
    addEventListener: (_, handler) => { submit = handler; },
    reset: () => { resets++; }
  };
  const button = { disabled: false, textContent: '' };
  const status = { hidden: true, textContent: '', className: '' };
  const elements = { 'growth-form': form, 'growth-submit': button, 'growth-status': status };
  vm.runInNewContext(script, {
    document: { querySelectorAll: () => [], getElementById: id => elements[id] },
    window: { gtag: (...args) => events.push(args) },
    FormData: class { get(key) { return values[key] ?? ''; } },
    URLSearchParams, AbortController, fetch,
    setTimeout: callback => { timer = callback; return 1; },
    clearTimeout: () => { cleared = true; }
  });
  return {
    button, status, events,
    submit: () => submit({ preventDefault() {} }),
    timeout: () => timer(),
    get resets() { return resets; },
    get cleared() { return cleared; }
  };
}

test('invalid form never sends a request', async () => {
  const app = setup(() => { throw new Error('Should not send'); }, {}, false);
  await app.submit();
  assert.equal(app.status.hidden, true);
  assert.equal(app.resets, 0);
});

test('accepted request includes fields and defaults, then resets and tracks', async () => {
  let request;
  const app = setup(async (_, options) => {
    request = options;
    return { ok: true, json: async () => ({ success: true }) };
  }, { name: 'Test', email: 'contact@zublo.co', service: 'Expo Growth Check' });
  await app.submit();
  assert.equal(request.mode, 'cors');
  assert.equal(request.body.get('email'), 'contact@zublo.co');
  assert.equal(request.body.get('service'), 'Expo Growth Check');
  assert.match(request.body.get('message'), /Discuss on the call/);
  assert.match(request.body.get('message'), /Please arrange by email/);
  assert.equal(app.status.className, 'status-success');
  assert.equal(app.resets, 1);
  assert.equal(app.button.disabled, false);
  assert.equal(app.cleared, true);
  assert.equal(app.events[0][1], 'growth_check_request_sent');
});

for (const [name, fetch] of [
  ['HTTP failure', async () => ({ ok: false })],
  ['backend rejection', async () => ({ ok: true, json: async () => ({ success: false }) })],
  ['malformed response', async () => ({ ok: true, json: async () => { throw new Error('Bad JSON'); } })],
  ['network failure', async () => { throw new Error('Offline'); }]
]) {
  test(`${name} preserves fields, allows retry, and never tracks success`, async () => {
    const app = setup(fetch);
    await app.submit();
    assert.equal(app.status.className, 'status-error');
    assert.equal(app.resets, 0);
    assert.equal(app.events.length, 0);
    assert.equal(app.button.disabled, false);
    assert.equal(app.status.hidden, false);
    assert.equal(app.cleared, true);
  });
}

test('duplicate submit while sending produces only one request', async () => {
  let finish, calls = 0;
  const app = setup(() => {
    calls++;
    return new Promise(resolve => { finish = resolve; });
  });
  const pending = app.submit();
  assert.equal(app.button.disabled, true);
  await app.submit();
  assert.equal(calls, 1);
  finish({ ok: true, json: async () => ({ success: true }) });
  await pending;
  assert.equal(app.button.disabled, false);
});

test('timeout releases button and warns against an accidental duplicate', async () => {
  const app = setup((_, options) => new Promise((_, reject) => {
    options.signal.addEventListener('abort', () => reject(Object.assign(new Error('Timeout'), { name: 'AbortError' })));
  }));
  const pending = app.submit();
  app.timeout();
  await pending;
  assert.equal(app.button.disabled, false);
  assert.equal(app.resets, 0);
  assert.match(app.status.textContent, /may have reached us/);
  assert.match(app.status.textContent, /before sending again/);
});
