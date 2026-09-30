(() => {
  const track = (event, detail = {}) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, { campaign: 'small-business-expo', ...detail });
    }
  };

  document.querySelectorAll('a[href="#book"]').forEach(link => {
    link.addEventListener('click', () => track('growth_check_click', {
      placement: link.closest('header') ? 'header' : link.classList.contains('mobile-booking') ? 'mobile_bar' : 'hero'
    }));
  });
  document.querySelectorAll('[data-track]').forEach(link => {
    link.addEventListener('click', () => track(link.dataset.track));
  });

  const form = document.getElementById('growth-form');
  const button = document.getElementById('growth-submit');
  const status = document.getElementById('growth-status');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity() || button.disabled) return;
    const fields = new FormData(form);
    const body = new URLSearchParams();
    ['name', 'email', 'business', 'service'].forEach(key => body.set(key, String(fields.get(key) || '')));
    body.set('message', [
      'Free 15-minute Expo Growth Check request. Source: small-business-expo.',
      `Website or Google profile: ${fields.get('website') || 'Not provided'}`,
      `Preferred time: ${fields.get('preferred_time') || 'Please arrange by email'}`
    ].join('\n'));
    button.disabled = true;
    button.textContent = 'Sending your request…';
    status.hidden = true;
    try {
      await fetch(form.action, { method: 'POST', body, mode: 'no-cors', redirect: 'follow' });
      // The existing endpoint returns an opaque response: receipt and booking cannot be confirmed here.
      status.textContent = 'Your request has been sent. We’ll email you to arrange a time. Your appointment is confirmed only once we agree on a time. If you don’t hear from us, contact contact@zublo.co.';
      status.className = 'status-success';
      track('growth_check_request_sent');
      form.reset();
    } catch {
      status.textContent = 'We couldn’t send your request. Please try again or email contact@zublo.co to arrange your free Growth Check.';
      status.className = 'status-error';
    } finally {
      status.hidden = false;
      button.disabled = false;
      button.textContent = 'Request my free Growth Check →';
    }
  });
})();
