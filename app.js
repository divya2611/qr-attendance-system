// Function to start the QR code scanner
function startScanner() {
    const outputDiv = document.getElementById('output');
    
    // Initialize the QR code scanner
    const qrCodeScanner = new Html5Qrcode("preview");
  
    // Start the scanner
    qrCodeScanner.start(
      { facingMode: "environment" }, // Camera settings
      {
        fps: 10,   // Frames per second
        qrbox: 250 // The size of the QR box for scanning
      },
      onScanSuccess, // On successful scan, call the onScanSuccess function
      onScanError    // On scan error, call the onScanError function
    );
    
    // On successful scan, display the QR code data
    function onScanSuccess(decodedText, decodedResult) {
      const studentData = decodedText.split(","); // Assuming QR code stores data as comma-separated
      const name = studentData[0];
      const rollNo = studentData[1];
      const timestamp = new Date().toLocaleString();
      
      // Display the student info
      outputDiv.innerHTML = `Student: ${name}<br>Roll No: ${rollNo}<br>Timestamp: ${timestamp}`;
      
      // Send the data to Google Sheets
      submitAttendanceToGoogleSheet(name, rollNo, timestamp);
    }
  
    // Handle any errors that occur during the scanning process
    function onScanError(errorMessage) {
      console.error("Error: ", errorMessage);
    }
  }
  
  // Start the QR code scanner when the page loads
  window.onload = function() {
    startScanner();
  };
  
  // Function to submit the attendance data to Google Sheets
  function submitAttendanceToGoogleSheet(name, rollNo, timestamp) {
    const url = "YOUR_GOOGLE_APPS_SCRIPT_URL";  // Replace with the actual URL from your Google Apps Script
    
    const data = {
      name: name,
      rollNo: rollNo,
      timestamp: timestamp
    };
    
    // Send the POST request to Google Apps Script
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log("Attendance recorded:", data))
    .catch(error => console.error("Error:", error));
  }
  