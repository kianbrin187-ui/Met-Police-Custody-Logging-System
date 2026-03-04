/* Boot timing */
setTimeout(function(){
document.getElementById("boot").style.display="none";
},2000);

/* USER DATABASE */
const users = {
    "c.bradford": "admin123",
    "a.kalsi": "Ak123",
    "l.phillips": "Lewis123",
    "h.oliver": "Oliver123",
    "b.henderson": "Bradyn123",
    "j.anderson": "Jacob123",
    "s.rob": "Rob123",
     "t.evans": "Terry123"
};

/* LOGIN FUNCTION */

function login(){

let user = document.getElementById("username").value.trim();
let pass = document.getElementById("password").value.trim();

if(users[user] && users[user] === pass){

localStorage.setItem("currentUser", user);
window.location.href="dashboard.html";

}else{

document.getElementById("error").innerText="Invalid Username or Password";

}

}

/* DASHBOARD */

function loadHome(){

let user = localStorage.getItem("currentUser");

if(!user){
window.location.href="index.html";
return;
}

document.getElementById("main-content").innerHTML=
"<h2>Hello " + user + "</h2><p>System Status: Secure</p>";
}

function loadForm(){

document.getElementById("main-content").innerHTML=`
<iframe 
width="100%" 
height="80%" 
style="border:none;border-radius:8px;background:white;"
src="https://docs.google.com/forms/d/e/1FAIpQLSc0nEq5miwEXDaBhYyFhvJC1miMQuS8uXL7X6CX0c7yisyTlg/viewform?embedded=true">
</iframe>
`;
}

function logout(){
localStorage.removeItem("currentUser");
window.location.href="index.html";
}
