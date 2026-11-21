/* =============================================================
   Formulário de contato — envio sem sair da página.
   Sem este script o formulário continua funcionando: o POST
   normal vai para a Formspree e volta pela página de confirmação
   deles. Com ele, a pessoa recebe a resposta aqui mesmo.
   ============================================================= */
(function () {
  'use strict';

  var form = document.querySelector('[data-cform]');
  if (!form || !window.fetch) return;

  var status = form.querySelector('[data-cform-status]');
  var send = form.querySelector('.cform__send');
  var label = send ? send.textContent : 'Enviar';

  function say(text, state) {
    if (!status) return;
    status.textContent = text;
    if (state) status.setAttribute('data-state', state);
    else status.removeAttribute('data-state');
  }

  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) return;      // deixa o navegador avisar
    event.preventDefault();

    if (send) { send.disabled = true; send.textContent = 'Enviando…'; }
    say('');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        say('Mensagem enviada. Respondo assim que vir.', 'ok');
      })
      .catch(function () {
        say('Não consegui enviar agora. Me chame em leandrovgoulart@gmail.com.', 'erro');
      })
      .then(function () {
        if (send) { send.disabled = false; send.textContent = label; }
      });
  });
})();
