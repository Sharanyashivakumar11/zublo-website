const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const source = readFileSync(`${__dirname}/../google-apps-script.js`, 'utf8');
function setup(fail = false) {
  const emails = [];
  const context = vm.createContext({
    MailApp: { sendEmail: email => { if (fail) throw new Error('Quota'); emails.push(email); } },
    Logger: { log() {} }
  });
  vm.runInContext(source, context);
  return { context, emails };
}
test('expo receipt goes to visitor with reply address and no reserved appointment claim', () => {
  const { context, emails } = setup();
  assert.equal(context.sendGrowthAcknowledgment('Test', 'visitor@example.com', 'Expo Growth Check'), true);
  assert.equal(emails.length, 1);
  assert.equal(emails[0].to, 'visitor@example.com');
  assert.equal(emails[0].replyTo, 'contact@zublo.co');
  assert.match(emails[0].body, /confirmed only once we agree on a time/);
});
test('other services do not receive the expo receipt', () => {
  const { context, emails } = setup();
  assert.equal(context.sendGrowthAcknowledgment('Test', 'visitor@example.com', 'Website'), false);
  assert.equal(emails.length, 0);
});
test('invalid or multiple recipients cannot receive a receipt', () => {
  const { context, emails } = setup();
  for (const email of ['', 'invalid', 'a@example.com,b@example.com', 'a@example.com\nb@example.com']) {
    assert.equal(context.sendGrowthAcknowledgment('Test', email, 'Expo Growth Check'), false);
  }
  assert.equal(emails.length, 0);
});
test('receipt failure does not throw or request a duplicate submission', () => {
  const { context } = setup(true);
  assert.equal(context.sendGrowthAcknowledgment('Test', 'visitor@example.com', 'Expo Growth Check'), false);
});
