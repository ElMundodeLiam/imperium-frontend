const API = 'https://imperium-backend-bpkr.onrender.com/api';
let token = '';

async function register() {
  const nombre = document.getElementById('regUsername').value;
  const contraseña = document.getElementById('regPassword').value;

  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, contraseña })
  });

  const data = await res.json();
  alert(data.msg || 'Registrado correctamente');
}

async function login() {
  const nombre = document.getElementById('logUsername').value;
  const contraseña = document.getElementById('logPassword').value;

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, contraseña })
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    alert('Login exitoso');
    mostrarPanel(nombre);
  } else {
    alert(data.msg || 'Error al iniciar sesión');
  }
}

function mostrarPanel(nombre) {
  document.getElementById('userPanel').style.display = 'block';
  document.getElementById('welcomeMsg').textContent = `Bienvenido, ${nombre}`;
}

function logout() {
  token = '';
  document.getElementById('userPanel').style.display = 'none';
  document.getElementById('welcomeMsg').textContent = '';
  document.getElementById('balance').textContent = '';
}

async function getBalance() {
  const res = await fetch(`${API}/user/perfil`, {
    headers: {
      'x-auth-token': token
    }
  });

  const data = await res.json();
  document.getElementById('balance').textContent = `Saldo: $${data.saldo}`;
}
