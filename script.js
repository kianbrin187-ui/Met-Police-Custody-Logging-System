// --- Autocomplete & Multiple Officers ---
const officerInput = document.getElementById('officerSearch');
const selectedOfficers = document.getElementById('selectedOfficers');
const suggestionsList = document.getElementById('officerSuggestions');
let officersList = [];

// Fetch officers
fetch('https://script.google.com/macros/s/AKfycbzYpmTRa154NWV3DJnujmyCTGoJzU97DfR7kWgeVDEigZ3mbIryuZouG1eu7SZcgILP/exec?type=officers')
  .then(res => res.json())
  .then(data => {
    officersList = data.map(o => o.name || o);
  })
  .catch(err => console.error('Error fetching officers:', err));

officerInput.addEventListener('input', function() {
  const value = this.value.toLowerCase();
  suggestionsList.innerHTML = '';
  if(!value) return;

  const matches = officersList.filter(o => o.toLowerCase().includes(value));
  matches.slice(0,5).forEach(match => {
    const li = document.createElement('li');
    li.textContent = match;
    li.addEventListener('click', () => {
      officerInput.value = match;
      suggestionsList.innerHTML = '';
    });
    suggestionsList.appendChild(li);
  });
});

document.addEventListener('click', e => {
  if(e.target !== officerInput) suggestionsList.innerHTML = '';
});

function addOfficer() {
  const name = officerInput.value.trim();
  if(!name) return;

  const exists = Array.from(selectedOfficers.children).some(li => li.textContent === name);
  if(exists) return;

  const li = document.createElement('li');
  li.textContent = name;
  selectedOfficers.appendChild(li);
  officerInput.value = '';
}

// --- View Arrests Button with Password ---
function openArrests() {
  const username = prompt("Enter username:");
  const password = prompt("Enter password:");
  const allowedUsers = {
    "BX":"password1",
    "SX":"password2",
    "GX":"password3"
  };

  if(allowedUsers[username] && allowedUsers[username] === password){
    window.open("https://docs.google.com/spreadsheets/d/11UGQqD2kpNuOUzrPCYd5nlOCFimIchxZy0uv4cregYs/edit#gid=0","_blank");
  } else {
    alert("Access denied: invalid credentials.");
  }
}

// --- Submit Form to Google Sheet ---
document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    custodyOfficer: document.getElementById('custodyOfficer').value,
    custodyCallsign: document.getElementById('custodyCallsign').value,
    officers: Array.from(selectedOfficers.children).map(li => li.textContent),
    suspectName: document.getElementById('suspectName').value,
    reason: document.getElementById('reason').value,
    location: document.getElementById('location').value,
    timeOfArrest: document.getElementById('timeOfArrest').value,
    cautionRead: document.getElementById('cautionRead').value,
    searched: document.getElementById('searched').value,
    itemsFound: document.getElementById('itemsFound').value,
    forceUsed: document.getElementById('forceUsed').value,
    additionalInfo: document.getElementById('additionalInfo').value,
    allergies: document.getElementById('allergies').value,
    biometrics: document.getElementById('biometrics').value,
    medication: document.getElementById('medication').value,
    alerting: document.getElementById('alerting').value,
    dependents: document.getElementById('dependents').value,
    recentMedication: document.getElementById('recentMedication').value
  };

  fetch("https://script.google.com/macros/s/AKfycbzYpmTRa154NWV3DJnujmyCTGoJzU97DfR7kWgeVDEigZ3mbIryuZouG1eu7SZcgILP/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(resp => {
    if(resp.status === "success"){
      alert("Booking saved successfully!");
      document.getElementById('bookingForm').reset();
      selectedOfficers.innerHTML = "";
    } else {
      alert("Error: " + resp.message);
    }
  })
  .catch(err => alert("Error: " + err.message));
});
