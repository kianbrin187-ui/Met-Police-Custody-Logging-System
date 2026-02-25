const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby9bpy8HdtUOgt76AZaL6kqrO8FcuTDAIDzjFKDYCsc9XpCBdyxoN1k3E219AMwjmg6/exec";

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

function saveBooking() {
  fetch(WEB_APP_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      type: "booking",
      officers: document.getElementById("officers").value,
      suspect: document.getElementById("suspect").value,
      reason: document.getElementById("reason").value,
      location: document.getElementById("location").value,
      time: document.getElementById("time").value,
      caution: document.getElementById("caution").value,
      search: document.getElementById("search").value,
      items: document.getElementById("items").value,
      force: document.getElementById("force").value,
      additional: document.getElementById("additional").value
    })
  })
  .then(r => r.json())
  .then(res => {
    alert("Saved as " + res.arrestNumber);
    location.reload();
  });
}
