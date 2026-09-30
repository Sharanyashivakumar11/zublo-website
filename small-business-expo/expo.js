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
      `What they want help with: ${fields.get('goal') || 'Discuss on the call'}`,
      `Website or Google profile: ${fields.get('website') || 'Not provided'}`,
      `Preferred time: ${fields.get('preferred_time') || 'Please arrange by email'}`
    ].join('\n'));
    button.disabled = true;
    button.textContent = 'Sending your request…';
    status.hidden = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, { method: 'POST', body, mode: 'cors', redirect: 'follow', signal: controller.signal });
      if (!response.ok) throw new Error('Request rejected');
      const result = await response.json();
      if (result.success !== true) throw new Error('Request not accepted');
      status.textContent = 'Your request has been received. We’ll email you to arrange a time. Your appointment is confirmed only once we agree on a time. If you don’t hear from us, contact contact@zublo.co.';
      if (result.acknowledgmentSent === true) {
        status.textContent += ' A receipt has also been emailed to you.';
      }
      status.className = 'status-success';
      track('growth_check_request_sent');
      form.reset();
    } catch (error) {
      status.textContent = error.name === 'AbortError'
        ? 'This is taking longer than expected, so we couldn’t confirm your request. It may have reached us. Please email contact@zublo.co before sending again.'
        : 'We couldn’t confirm your request. Please email contact@zublo.co to arrange your free Growth Check, or try again if you were offline.';
      status.className = 'status-error';
    } finally {
      clearTimeout(timeout);
      status.hidden = false;
      button.disabled = false;
      button.textContent = 'Request my free Growth Check →';
    }
  });
})();
