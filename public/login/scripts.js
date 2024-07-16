function handleError(error) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = error.msg;
  errorMessage.style.display = 'block'; // Mostrar o elemento de erro
  setTimeout(() => {
    errorMessage.style.display = 'none'; // Ocultar o elemento de erro após 5 segundos
  }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');

  if (!loginForm) {
    console.error('Elemento #loginForm não encontrado');
    return;
  }

  loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Email:', email);
    console.log('Senha:', password);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });


      if (!response.ok) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = result.msg;
        errorMessage.style.display = 'block'; // Mostrar o elemento de erro
      } else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'none'; // Ocultar o elemento de erro
      }

      const result = await response.json();
      console.log('Resposta JSON:', result);

      if (response.status === 200) {
        alert(result.msg);
        window.location.href = '../dashboard/dashboard.html';
      } else {
        alert(result.msg);
      }
    } catch(e) {
      handleError(e)
    }
  });

  // Lógica de mostrar senha
  const togglePassword = document.getElementById('togglePassword');
  const passwordField = document.getElementById('password');

  togglePassword.addEventListener('click', () => {
    // Alterna o tipo de entrada entre 'password' e 'text'
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // Alterna o ícone do olho
    const iconName = togglePassword.getAttribute('name') === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
    togglePassword.setAttribute('name', iconName);
  });
});