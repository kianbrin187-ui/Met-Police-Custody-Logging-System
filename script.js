// SEARCHABLE MULTI SELECT
$(document).ready(function () {

  fetch("https://script.google.com/macros/s/AKfycbzYpmTRa154NWV3DJnujmyCTGoJzU97DfR7kWgeVDEigZ3mbIryuZouG1eu7SZcgILP/exec?type=officers")
    .then(res => res.json())
    .then(data => {

      const officerData = data.map(officer => ({
        id: officer,
        text: officer
      }));

      $('#officerSelect').select2({
        data: officerData,
        placeholder: "Search and select officers"
      });

    })
    .catch(err => {
      console.error("Officer fetch failed:", err);
      alert("Could not load officers.");
    });

});


// LOGIN MODAL
function openArrests() {
  document.getElementById("loginModal").style.display = "block";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function checkLogin() {

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if(username === "BX" && password === "1234"){
      window.open("https://docs.google.com/spreadsheets/d/11UGQqD2kpNuOUzrPCYd5nlOCFimIchxZy0uv4cregYs/edit#gid=0", "_blank");
      closeLogin();
  }
  else if(username === "SX" && password === "5678"){
      window.open("https://docs.google.com/spreadsheets/d/11UGQqD2kpNuOUzrPCYd5nlOCFimIchxZy0uv4cregYs/edit#gid=0", "_blank");
      closeLogin();
  }
  else {
      alert("Access Denied");
  }
}


// FORM SUBMIT
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const data = {
    custodyOfficer: document.getElementById('custodyOfficer').value,
    custodyCallsign: document.getElementById('custodyCallsign').value,
    officers: $('#officerSelect').val(),
    suspectName: document.getElementById('suspectName').value,
    reason: document.getElementById('reason').value,
    location: document.getElementById('location').value,
    timeOfArrest: document.getElementById('timeOfArrest').value,
    cautionRead: document.getElementById('cautionRead').value,
    searched: document.getElementById('searched').value,
    itemsFound: document.getElementById('itemsFound').value,
    forceUsed: document.getElementById('forceUsed').value,
    additionalInfo: document.getElementById('additionalInfo').value
  };

  fetch("https://script.google.com/macros/s/AKfycbzYpmTRa154NWV3DJnujmyCTGoJzU97DfR7kWgeVDEigZ3mbIryuZouG1eu7SZcgILP/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(resp => {
    if(resp.status === "success"){
      alert("Booking saved successfully");
      document.getElementById("bookingForm").reset();
      $('#officerSelect').val(null).trigger('change');
    } else {
      alert("Error saving booking");
    }
  })
  .catch(err => alert("Submission failed"));
});
