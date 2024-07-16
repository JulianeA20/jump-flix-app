document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');

  if (!registerForm) {
    console.error('Elemento #registerForm não encontrado');
    return;
  }

  registerForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;
    const confirmPassword = document.getElementById('confirmeSenha').value;

    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Senha:', password);

    if (password !== confirmPassword) {
      alert('As senhas não conferem');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      console.log('Response: ', response);

      if (!response.ok) {
        console.error('Resposta não OK: ', response.status);
        const errorText = await response.text();
        console.error('Texto do erro: ', errorText);
        throw new Error(errorText);
      }

      const result = await response.json();
      console.log('Resposta JSON:', result);

      if (response.status === 201) {
        // Redirecionar ou fazer algo após o registro bem-sucedido
        window.location.href = '../login/login.html';
      } else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = result.msg;
        errorMessage.style.display = 'block';
      }
    } catch(e) {
      console.error('Erro na requisição', e);
      alert('Ocorreu um erro ao processar a requisição');
    }
  });

  // Lógica do mostrar senha
  const togglePassword1 = document.getElementById('togglePassword1');
  const togglePassword2 = document.getElementById('togglePassword2');
  const senha = document.getElementById('senha');
  const confirmeSenha = document.getElementById('confirmeSenha');

  function toggleIcon(icon, input) {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    icon.setAttribute('name', type === 'password' ? 'eye-off-outline' : 'eye-outline');
  }

  if (togglePassword1 && senha) {
    togglePassword1.addEventListener('click', function () {
      toggleIcon(togglePassword1, senha);
    });
  }

  if (togglePassword2 && confirmeSenha) {
    togglePassword2.addEventListener('click', function () {
      toggleIcon(togglePassword2, confirmeSenha);
    })
  }
});