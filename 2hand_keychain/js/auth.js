// =========================================
// KEY2HAND — Auth (mock, localStorage)
// Demo credentials & settings from CONFIG in config.js
// =========================================

const AUTH_KEY = 'key2hand_user';

// ---- Auth helpers ----
function getUser() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)) || null; }
  catch { return null; }
}

function saveUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'index.html';
}

function isLoggedIn() {
  return getUser() !== null;
}

// ---- Update navbar user area ----
function updateAuthNav() {
  const user = getUser();
  const authArea = document.getElementById('auth-nav');
  if (!authArea) return;

  if (user) {
    authArea.innerHTML = `
      <div class="nav-user-wrap">
        <span class="nav-user-name">👤 ${user.name}</span>
        <button class="btn btn-ghost btn-sm" onclick="logout()">Logout</button>
      </div>
    `;
  } else {
    authArea.innerHTML = `
      <a href="login.html" class="btn btn-ghost btn-sm">Login</a>
      <a href="register.html" class="btn btn-primary btn-sm">Register</a>
    `;
  }
}

document.addEventListener('DOMContentLoaded', updateAuthNav);
