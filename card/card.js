(() => {
  const url = 'https://zublo.co/card/';
  const dialog = document.getElementById('qr-dialog');
  document.getElementById('show-qr').addEventListener('click', () => dialog.showModal());
  document.getElementById('close-qr').addEventListener('click', () => dialog.close());
  document.getElementById('share-card').addEventListener('click', async () => {
    const status = document.getElementById('share-status');
    status.textContent = '';
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Zublo contact', text: 'Save Zublo’s contact details.', url });
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        status.textContent = 'Link copied. Paste it into a text or message.';
      } else {
        status.textContent = 'Share this link: zublo.co/card/';
      }
    } catch (error) {
      if (error.name !== 'AbortError') status.textContent = 'Share this link: zublo.co/card/';
    }
  });
  if (new URLSearchParams(location.search).get('share') === '1') dialog.showModal();
})();
