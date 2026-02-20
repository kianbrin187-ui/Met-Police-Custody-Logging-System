const officerInput = document.getElementById('officerSearch');
const selectedOfficers = document.getElementById('selectedOfficers');
let officersList = [];

// Fetch officers from Google Script
fetch('https://script.google.com/macros/s/AKfycbwLNWHGGRaBJL79vrDwZ_vflEjJgdIPq41hxT-V4P4K-Bru3pX5H_E-pzXHs0U6z144/exec?type=officers')
  .then(response => response.json())
  .then(data => {
    officersList = data; // assuming data is an array of officer names or objects with names
    console.log('Officers loaded:', officersList);
  })
  .catch(err => console.error('Error fetching officers:', err));

// Function to add selected officer to the list
function addOfficer() {
  const officerName = officerInput.value.trim();
  if (!officerName) return;

  const li = document.createElement('li');
  li.textContent = officerName;
  selectedOfficers.appendChild(li);
  officerInput.value = '';
}

// Optional: Simple autocomplete for officer search
officerInput.addEventListener('input', function() {
  const value = this.value.toLowerCase();
  const match = officersList.find(officer => officer.toLowerCase().includes(value));
  if (match) this.value = match; // you can improve this with a dropdown
});

// Prevent default form submission for demo
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Booking saved (demo)');
});
