const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/jwt/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status === 201) {
      alert("The register was success!");
      window.location.replace("/api/views/login");
    } else if (result.status === 401) {
      alert("This email is already in use.");
    } else alert("Invalid credentials");
  });
});
