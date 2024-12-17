function startScanner() {
    const outputDiv = document.getElementById('output');
    
    // Initialize the QR code scanner
    const qrCodeScanner = new Html5QrcodeScanner("preview", {
      fps: 10,
      qrbox: 250
    });
    
    // Start the scanner
    qrCodeScanner.render(onScanSuccess);
    
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
  }
  
  // Start the QR code scanner
  startScanner();
  
  // Function to submit the attendance data to Google Sheets
  function submitAttendanceToGoogleSheet(name, rollNo, timestamp) {
    const url = "https://script.google.com/macros/s/AKfycbym04UeYiSsYFr7wl8gFxU90T1SiaaqovmC0m7Fqrw/dev";  // Replace with the actual URL from your Google Apps Script
    
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
  