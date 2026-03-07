/* BOOT SCREEN */
window.addEventListener("load", function () {
    const boot = document.getElementById("boot-screen");
    if (boot) {
        setTimeout(function () {
            boot.style.display = "none";
        }, 2000);
    }
});

/* USERS */
const users = {
    "c.bradford": "admin123",
    "a.kalsi": "Ak123",
    "l.phillips": "Lewis123",
    "h.oliver": "Oliver123",
    "b.henderson": "Bradyn123",
    "j.anderson": "Jacob123",
    "s.rob": "Rob123",
     "b.nelson": "Anders123",
    "t.evans": "Terry123"
};

/* LOGIN */
function login() {

    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();

    if (users[user] && users[user] === pass) {
        localStorage.setItem("currentUser", user);
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Invalid Username or Password.";
    }
}

/* PROTECT DASHBOARD */
function checkLogin() {
    if (!localStorage.getItem("currentUser")) {
        window.location.href = "index.html";
    }
}

/* HOME */
function loadDashboard() {

    let user = localStorage.getItem("currentUser");

    document.getElementById("main-content").innerHTML = `
        <div class="dashboard-head">
            <h2>Welcome, ${user}</h2>
            <p><strong>System Status:</strong> Secure</p>
            <p><strong>Access Level:</strong> Command</p>
            <hr>
            <p>All activity is logged.</p>
        </div>

        <section class="embedded-form-panel">
            <div class="panel-header">
                <h3>Custody Arrest Form</h3>
                <p>Complete and submit the form directly from the command terminal.</p>
            </div>

            <iframe
                class="form-frame"
                title="Custody Arrest Form"
                src="https://docs.google.com/forms/d/e/1FAIpQLSc0nEq5miwEXDaBhYyFhvJC1miMQuS8uXL7X6CX0c7yisyTlg/viewform?embedded=true"
                loading="lazy">
            </iframe>
        </section>
    `;
}

/* REPORTS PASSWORD CHECK */
function viewReports() {

    let currentUser = localStorage.getItem("currentUser");
    let entered = prompt("Re-enter your password:");

    if (users[currentUser] === entered) {
        window.open(
            "https://docs.google.com/spreadsheets/d/1gwpjY4qQ4U59kASsyFLvgkYKMdKCV0MOqqEBOn3cTqQ/edit",
            "_blank"
        );
    } else {
        alert("Access Denied.");
    }
}

/* LOGOUT */
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
