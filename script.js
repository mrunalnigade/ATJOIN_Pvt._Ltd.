document.getElementById('pdfForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const rank = document.getElementById('rank').value;
    const idNumber = document.getElementById('idNumber').value;

    const photoFile = document.getElementById('photo').files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const photoDataUrl = event.target.result;

        // Create the PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Create the image object
        const img = new Image();
        img.src = photoDataUrl;
        img.onload = function() {
            // Add photo to the left
            doc.addImage(img, 'JPEG', 20, 30, 50, 50); // x, y, width, height

            // Set the position for the text on the right side
            const textX = 80; // Start the text on the right of the image
            const textYName = 40; // Y position for name
            const textYId = 60; // Y position for ID number
            const textYRank = 80; // Y position for rank

            doc.setFontSize(22);
            doc.text("Name: " + name, textX, textYName);

            doc.setFontSize(16);
            doc.text("ID Number: " + idNumber, textX, textYId);
            doc.text("Rank: " + rank, textX, textYRank);

doc.setFontSize(16);
            doc.text(" Congratulations!! You have secured : " + rank, textX, textYRank);
         
            // Save the PDF
            doc.save('output.pdf');
        }
    };

    reader.readAsDataURL(photoFile);
});