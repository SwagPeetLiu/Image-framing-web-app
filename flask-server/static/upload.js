// Function used to uploadLogo to the server
function uploadLogo(){

    // reference to the current logo
    var input = document.getElementById("logoInput")
    var file = input.files[0]
    var formData = new FormData();
    formData.append('logo', file)

    // append the current time for reference
    var currentTimeStamp = new Date()
    var hours = currentTimeStamp.getHours()
    var minutes = currentTimeStamp.getMinutes()
    var formattedTime = hours + ':' + (minutes < 10 ? "0" : "") + minutes;
    formData.append('timestamp', formattedTime)
    console.log('FileName', `Received file named ${file.name} at ${formattedTime}`)

    // Post the logo to the server 
    fetch("/uploadLogo", {
        method: 'POST', body: formData
    })
    .then(Response => Response.json())
    .then(data => {
        // calling out the image attachment function
        console.log('Message', data);
        listLogo(formattedTime, file.name)

        // set up the newly added logo
        frameLogo(file.name)

        // clear the image input field
        clearFileInput(input)
    })
    .catch (error => {
        console.log('Error', error);
    })
}

// function used to list the uploaded logo
function listLogo(timestamp, logoName){
    var listContainer = document.getElementById('logo-listing-container')
    var logoTable = document.getElementById("logo-table")

    // adding the listed logo:
    var newRow = logoTable.insertRow()
    var fileNameCell = newRow.insertCell(0)
    fileNameCell.innerHTML = logoName
    var timeCell = newRow.insertCell(1)
    timeCell.innerHTML = timestamp
    
    // examine the table's status for upload displays:
    adjustTableVisibility(listContainer, logoTable)
}

// function used to adjust the table visibility
function adjustTableVisibility(listContainer, logoTable){
    if (logoTable.rowCount <= 1){
        listContainer.style.visibility = "hidden"
    }
    else{
        listContainer.style.visibility = "visible"
    }

    // adjust all other potential logos' clickability:
    
}

// function used to set style of the current logo display in the table:
function frameLogo(logoName){
    var overlayImage = document.getElementById("circle-overlay")
    var newImageSource = `/static/images/preserved-logo-images/${logoName}`
    overlayImage.setAttribute("src", newImageSource)
}

// functio used to clear the image input field
function clearFileInput(input){
    // for IT11, Chrome, Firefox
    try{
        input.value = ""
    }
    // account For IE10 and lower
    catch(e){
        if (input.value){
            input.type = "text"
            input.type = "file"
        }
    }
    adjustUploadButton()
}

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