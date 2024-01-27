// listener function that controls button's clickability
function adjustUploadButton(){
    var logoInput = document.getElementById("logoInput");
    var uploadButton = document.getElementById("uploadButton");

    // Check if the input is not empty
    try{
        if (logoInput.files.length > 0) {
            uploadButton.disabled = false;
        } else {
            uploadButton.disabled = true;
        }
    }
    catch(error){
        console.log('unable to check the file existence', error)
        uploadButton.disabled = true;
    }
}
export default adjustUploadButton