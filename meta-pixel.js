/* Pixel da Meta "Guia Quando Ela Fala" + aviso de cookies (LGPD). Portfólio da Escutaris.
   O pixel só é carregado depois que a pessoa aceita. A escolha fica guardada no navegador.
   Cliques no botão de compra (Eduzz) viram InitiateCheckout. A Compra é marcada pela própria
   Eduzz, com este mesmo número de pixel colado no produto. */
(function () {
  var PIXEL_ID = '2213228415914608';
  var CHAVE = 'guia-quando-ela-fala-cookies';

  function lerEscolha() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function gravarEscolha(v) { try { localStorage.setItem(CHAVE, v); } catch (e) {} }

  function ligarPixel() {
    if (window.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (a && window.fbq && a.href.indexOf('chk.eduzz.com') > -1) window.fbq('track', 'InitiateCheckout');
  });

  function mostrarAviso() {
    var css = document.createElement('style');
    css.textContent =
      '.esc-cookies{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;' +
      'background:#fefefe;color:#2A1C35;border:1px solid #E2D5EE;border-radius:14px;box-shadow:0 8px 28px rgba(42,28,53,.14);' +
      'padding:16px 18px;font:400 14px/1.55 "DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color-scheme:only light}' +
      '.esc-cookies p{margin:0 0 12px}' +
      '.esc-cookies__botoes{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}' +
      '.esc-cookies button{font:inherit;font-weight:500;border-radius:999px;padding:8px 18px;cursor:pointer;border:1px solid #C94E76}' +
      '.esc-cookies__sim{background:#C94E76;color:#fefefe}' +
      '.esc-cookies__nao{background:transparent;color:#C94E76}';
    document.head.appendChild(css);

    var caixa = document.createElement('div');
    caixa.className = 'esc-cookies';
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-label', 'Aviso de cookies');
    caixa.innerHTML =
      '<p>Usamos cookies para medir as visitas e mostrar nossos anúncios a quem já conhece este guia. Você pode aceitar ou recusar.</p>' +
      '<div class="esc-cookies__botoes">' +
      '<button type="button" class="esc-cookies__nao">Recusar</button>' +
      '<button type="button" class="esc-cookies__sim">Aceitar</button></div>';
    document.body.appendChild(caixa);

    caixa.querySelector('.esc-cookies__sim').addEventListener('click', function () {
      gravarEscolha('aceito'); caixa.remove(); ligarPixel();
    });
    caixa.querySelector('.esc-cookies__nao').addEventListener('click', function () {
      gravarEscolha('recusado'); caixa.remove();
    });
  }

  var escolha = lerEscolha();
  if (escolha === 'aceito') ligarPixel();
  else if (escolha !== 'recusado') {
    if (document.body) mostrarAviso();
    else document.addEventListener('DOMContentLoaded', mostrarAviso);
  }
})();
