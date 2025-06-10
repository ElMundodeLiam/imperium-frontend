const API = 'https://imperium-backend-bpkr.onrender.com/api';
let token = '';

async function registrar() {
  const nombre = document.getElementById('reg-nombre').value;
  const contraseña = document.getElementById('reg-pass').value;

  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, contraseña })
  });

  const data = await res.json();
  alert(data.msg || 'Registrado correctamente');
}

async function login() {
  const nombre = document.getElementById('login-nombre').value;
  const contraseña = document.getElementById('login-pass').value;

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, contraseña })
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    alert('Login exitoso');
    obtenerPerfil();
  } else {
    alert(data.msg || 'Error al iniciar sesión');
  }
}

async function obtenerPerfil() {
  const res = await fetch(`${API}/user/perfil`, {
    headers: { 'x-auth-token': token }
  });
  const data = await res.json();
  document.getElementById('usuario').textContent = data.nombre;
  document.getElementById('saldo').textContent = data.saldo;
  document.getElementById('perfil').style.display = 'block';
  document.getElementById('acciones').style.display = 'block';
}

async function apostar() {
  const monto = parseFloat(document.getElementById('apostar-monto').value);
  const res = await fetch(`${API}/user/apostar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    },
    body: JSON.stringify({ monto })
  });
  const data = await res.json();
  alert(data.msg || 'Apuesta realizada');
  obtenerPerfil();
}

async function recargar() {
  const monto = parseFloat(document.getElementById('recargar-monto').value);
  const res = await fetch(`${API}/user/recargar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    },
    body: JSON.stringify({ monto })
  });
  const data = await res.json();
  alert(data.msg || 'Saldo recargado');
  obtenerPerfil();
}
