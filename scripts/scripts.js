document.addEventListener('DOMContentLoaded', () => {
  // Quando a página foi aberta a partir de uma sala específica
  // (?from=salaN, vindo de um detalhes_salaN.html), o link de "voltar"
  // passa a apontar para essa mesma sala em vez do padrão fixo. Sem
  // isso, cancelar ou registrar observação a partir de qualquer sala
  // que não a 1 te devolveria sempre para a Sala 1.
  const params = new URLSearchParams(window.location.search);
  const from = params.get('from');
  const validRooms = ['sala1', 'sala2', 'sala3', 'sala4', 'sala5'];

  if (from && validRooms.includes(from)) {
    const backLink = document.querySelector('.back');
    if (backLink) {
      backLink.setAttribute('href', `detalhes_${from}.html`);
    }
  }

  document.querySelectorAll('.radio-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.radio-circle').forEach(c => c.classList.remove('selected'));
      item.querySelector('.radio-circle').classList.add('selected');
    });
  });

  document.querySelectorAll('.timeline-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      circle.classList.toggle('done');
      circle.innerHTML = circle.classList.contains('done') ? '✓' : '';
    });
  });

  document.querySelectorAll('.textarea-box textarea').forEach(textarea => {
    const counter = textarea.closest('.textarea-box')?.querySelector('.counter');
    if (!counter) return;
    const max = parseInt(counter.textContent.split('/')[1]) || 200;
    textarea.addEventListener('input', () => {
      counter.textContent = `${textarea.value.length}/${max}`;
    });
  });

});

function togglePassword() {
  const pw = document.getElementById('password');
  if (pw) pw.type = pw.type === 'password' ? 'text' : 'password';
}