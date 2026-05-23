document.addEventListener('DOMContentLoaded', () => {
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