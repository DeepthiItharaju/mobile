// Function called when a QR code is successfully scanned
function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code scanned: ${decodedText}`, decodedResult);
    document.getElementById('qr-reader-results').innerHTML = `Scanned Code: ${decodedText}`;
}

// Function called when the scanner fails to scan a QR code
function onScanFailure(error) {
    console.warn(`Code scan error: ${error}`);
}

// Function to start the QR scanner
function startQrScanner() {
    const qrReader = new Html5Qrcode("qr-reader");

    qrReader.start(
        { facingMode: "environment" }, // Prefer rear camera if available
        {
            fps: 10,  // Scanning frames per second
            qrbox: { width: 250, height: 250 } // QR code scanning box dimensions
        },
        onScanSuccess,
        onScanFailure
    ).then(() => {
        console.log("QR scanner started successfully.");
    }).catch(err => {
        console.error("Error starting QR scanner:", err);
        document.getElementById('qr-reader-results').innerHTML = 'Unable to start the QR code scanner. Please check your camera settings.';
    });
}

// Function to check camera access
function checkCameraAccess() {
    console.log("Checking for camera access...");
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            console.log("Camera access granted.");

            // Log details of the stream (helpful for debugging)
            console.log("Stream:", stream);
            
            // Start QR scanner
            startQrScanner();

            // Optional: Stop the temporary stream to release it for use by the scanner
            stream.getTracks().forEach(track => track.stop());

        })
        .catch((err) => {
            console.error("Error accessing camera:", err);
            document.getElementById('qr-reader-results').innerHTML = 'Camera access denied. Please allow camera access to scan QR codes.';
        });
}

// Start the process of checking camera access and initiating the QR scanner
checkCameraAccess();
