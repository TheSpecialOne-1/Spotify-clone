// auth.js

document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email    = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      alert('Signup successful! Please log in.');
      window.location.href = 'login.html';
    } else {
      alert(data.error || 'Signup failed');
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred during signup.');
  }
});
