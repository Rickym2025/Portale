let authToken = localStorage.getItem('rm_admin_pass') || '';

window.addEventListener('DOMContentLoaded', () => {
    if (authToken) {
        verifyAndStart();
    }
});

async function handleLoginSubmit(e) {
    e.preventDefault();
    const pass = document.getElementById('admin-password').value.trim();
    if (!pass) return alert("Inserisci la password.");

    const btn = document.getElementById('login-btn');
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Verifica...`;

    authToken = pass;
    const ok = await loadMasterData();

    if (ok) {
        localStorage.setItem('rm_admin_pass', pass);
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
    } else {
        alert("Password non corretta!");
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-key"></i> Sblocca Ecosistema`;
    }
}

async function verifyAndStart() {
    const ok = await loadMasterData();
    if (ok) {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
    } else {
        logout();
    }
}

function logout() {
    localStorage.removeItem('rm_admin_pass');
    location.reload();
}
