
function loginUser(){

const users = {
"admin":"met123",
"officer1":"police1",
"officer2":"metpolice"
};

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if(users[user] && users[user] === pass){
window.location.href = "dashboard.html";
}
else{
document.getElementById("error").innerText = "Invalid Login";
}

}
