document.addEventListener('DOMContentLoaded', () => {

  const items = document.querySelectorAll('.radio-item');

  items.forEach(item => {

    item.addEventListener('click', () => {

      document.querySelectorAll('.radio-circle')
      .forEach(circle => {
        circle.classList.remove('selected');
      });

      item.querySelector('.radio-circle')
      .classList.add('selected');

    });

  });

});

document.addEventListener('DOMContentLoaded', () => {

  const circles = document.querySelectorAll('.timeline-circle');

  circles.forEach(circle => {

    circle.addEventListener('click', () => {

      circle.classList.toggle('done');

      if(circle.classList.contains('done')){
        circle.innerHTML = '✓';
      } else {
        circle.innerHTML = '';
      }

    });

  });

});

function togglePassword(){

      const password =
      document.getElementById("password");

      if(password.type === "password"){
        password.type = "text";
      }else{
        password.type = "password";
      }

  }