// function used to enable users to download a framed logo with the demo image:
function downloadImage(){
    //getting references to the images:
    const productImage = document.getElementById('productImage');
    const logoOverlay = document.getElementById('circle-overlay');

    // Create a canvas element to paint these two images
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d'); 
    canvas.width = productImage.width
    canvas.height = productImage.height

    // draw images:
    context.drawImage(productImage, 0, 0, canvas.width, canvas.height)
    const overlayPosition = calculateOverlayPosition(logoOverlay, productImage);
    context.drawImage(logoOverlay, overlayPosition.x, overlayPosition.y, logoOverlay.width, logoOverlay.height);


     // create psuedo link to automate download
     const dataURL = canvas.toDataURL('image/png');
     const downloadLink = document.createElement('a');
     downloadLink.href = dataURL;
     downloadLink.download = `framed_${getFileName()}`;
     document.body.appendChild(downloadLink);
     downloadLink.click();
 
     // Remove the temporary anchor from the document
     document.body.removeChild(downloadLink);
}

// Calculate the position of the overlay relative to the product image
function calculateOverlayPosition(overlay, productImage) {
    // Calculate the position based on desired styling
    const overlayPosition = {
        x: productImage.width * 0.67 - overlay.width / 2,
        y: productImage.height * 0.5 - overlay.height / 2
    };

    return overlayPosition;
}

// function used to fetch Name of the framed logo
function getFileName(){
    var logoTable = document.getElementById("logo-table")
    for (var rowIndex = 1; rowIndex < logoTable.rows.length; rowIndex++){
        var listedLogo = logoTable.rows[rowIndex].cells[0]
        var listedStatus = listedLogo.getAttribute("Status")
        if (listedStatus == "Attached"){
            return listedLogo.innerHTML.split(".")[0]
        }
    }
    return "NA"
}

// enable downloading of image when a logo is loded in
function adjustDownloadButton(){
    var downloadButton = document.getElementById("print-button")
    if (downloadButton.style.visibility == "hidden"){
        var logoTable = document.getElementById("logo-table")
        if (logoTable.rows.length > 1){
            downloadButton.style.visibility = "visible"
            downloadButton.addEventListener('click', downloadImage)
        }
    }
}

export default adjustDownloadButton
