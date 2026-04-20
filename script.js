/* BOOT SCREEN */
window.addEventListener("load", function () {
    const boot = document.getElementById("boot-screen");
    if (boot) {
        setTimeout(function () {
            boot.style.display = "none";
        }, 2000);
    }

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (usernameInput && passwordInput) {
        [usernameInput, passwordInput].forEach(function (input) {
            input.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    login();
                }
            });
        });
    }
});

/* USERS */
const users = {
    "c.bradford": "admin123",
    "a.kalsi": "Akalsi",
    "l.phillips": "Lewis123",
    "h.oliver": "Oliver123",
        "t.hanson": "Toby123",
    "d.lloyd": "Wolfie123",
    "s.werth": "Sam123",
    "s.rob": "Rob123",
};

/* USER RANKS */
const userRanks = {
    "c.bradford": "Superintendent",
    "a.kalsi": "Chief Inspector",
    "l.phillips": "Sergeant",
    "h.oliver": "Chief Superintendent",
    "t.evans": "Deputy Commssioner"
};

/* THEME */
function initTheme() {
    let savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    let currentTheme = document.body.getAttribute("data-theme") || "light";
    let nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeButton(nextTheme);
}

function updateThemeButton(theme) {
    let toggleButton = document.getElementById("theme-toggle-btn");

    if (toggleButton) {
        toggleButton.innerText = theme === "dark"
            ? "Switch to Light Mode"
            : "Switch to Dark Mode";
    }
}

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
    let userRank = userRanks[user] || "Officer";

    document.getElementById("main-content").innerHTML = `
        <div class="dashboard-head">
            <h2>Welcome, ${user}</h2>
            <div class="rank-row">
                <p><strong>System Status:</strong> Secure</p>
                <p><strong>Rank:</strong> <span class="rank-pill">${userRank}</span></p>
            </div>
            <hr>
            <p>All activity is logged and monitored.</p>
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
