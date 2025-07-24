// Servicio de autenticación para login, registro y logout

const API_URL = '/api/auth';

export async function login(email, password, username) {
  if (!email || !password) throw new Error('Email y contraseña requeridos');
  // Usa el username si se pasa como argumento, si no, usa el de localStorage
  const userNameToSend = typeof username === 'string' ? username : (localStorage.getItem('lastUsername') || undefined);
  const body = userNameToSend ? { email, password, username: userNameToSend } : { email, password };
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Error al iniciar sesión');
  return { user: data.data.user };
}

export async function register(email, password, username = '') {
  if (!email || !password) throw new Error('Email y contraseña requeridos');
  // Guarda el username en localStorage para el login posterior
  localStorage.setItem('lastUsername', username);
  localStorage.setItem('profile_custom_username', username);
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username })
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Error al registrarse');
  return { user: data.data.user };
}

export async function logout(token) {
  const res = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Error al cerrar sesión');
  return true;
} 