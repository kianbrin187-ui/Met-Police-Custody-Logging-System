/* Dashboard Panels */

function loadHome(){

let user = localStorage.getItem("currentUser");

document.getElementById("main-content").innerHTML = `
<h2>Hello ${user}</h2>
<p>System Status: Secure</p>
`;
}

function loadForm(){

document.getElementById("main-content").innerHTML = `

<div class="form-card">

<h2>Police Report Form</h2>

<iframe class="form-frame"
src="YOUR GOOGLE FORM EMBED LINK HERE">
</iframe>

</div>

`;
}

function logout(){
window.location.href="index.html";
}