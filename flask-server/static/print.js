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
    context.drawImage(logoOverlay, 0, 0, canvas.width, canvas.height)

    // 
}