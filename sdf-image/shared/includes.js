(function () {
  var scripts = document.getElementsByTagName('script');
  var base = scripts[scripts.length - 1].src.replace(/[^/]+$/, '');

  function injectSync(url, targetId) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      if (xhr.status === 200 || xhr.status === 0) {
        var el = document.getElementById(targetId);
        if (el) el.outerHTML = xhr.responseText;
      }
    } catch (e) {
      console.warn('includes.js: could not load ' + url);
    }
  }

  injectSync(base + 'partials/header.html', 'site-header');
  injectSync(base + 'partials/footer.html', 'site-footer');

  // Update nav hrefs from config
  if (typeof SITE !== 'undefined') {
    document.querySelectorAll('[data-link]').forEach(function (a) {
      var key = a.getAttribute('data-link');
      if (SITE.links[key]) a.href = SITE.links[key];
    });
  }

  // Populate Web3Forms key
  if (typeof SITE !== 'undefined' && SITE.forms) {
    var keyInput = document.querySelector('input[name="access_key"]');
    if (keyInput) keyInput.value = SITE.forms.web3formsKey;
  }
})();
