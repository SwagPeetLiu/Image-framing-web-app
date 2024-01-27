import frameLogo  from "./frameLogo.js"
import adjustUploadButton from "./adjustUploadButton.js"
import adjustDownloadButton from "./print.js"

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
    var seconds = currentTimeStamp.getSeconds()
    var formattedTime = hours + ':' + (minutes < 10 ? "0" : "") + minutes + ':' + (seconds < 10 ? "0": "") + seconds;
    formData.append('timestamp', formattedTime)
    console.log('FileName', `Received file named ${file.name} at ${formattedTime}`)

    // Post the logo to the server 
    fetch("/uploadLogo", {
        method: 'POST', body: formData
    })
    .then(Response => Response.json())
    .then(data => {
        // calling out the image attachment function
        listLogo(formattedTime, file.name, data["StorageID"])

        // set up the newly added logo
        frameLogo(data["StorageID"])

        // clear the image input field
        clearFileInput(input)

        // Enable downloading:
        adjustDownloadButton()
    })
    .catch (error => {
        console.log('Error', error);
    })
}

// function used to list the uploaded logo
function listLogo(timestamp, logoName, storageID){
    var listContainer = document.getElementById('logo-listing-container')
    var logoTable = document.getElementById("logo-table")

    // adding the listed logo:
    var newRow = logoTable.insertRow()
    var fileNameCell = newRow.insertCell(0)
    fileNameCell.innerHTML = logoName
    fileNameCell.setAttribute("StorageID", storageID)
    fileNameCell.setAttribute("Status", "Attached")

    // adding in the listener for logo swaps
    fileNameCell.addEventListener("click", function(){
        var currentStatus = this.getAttribute("Status")

        // only proceed to swapping logos if the current image framing is not this one
        if (currentStatus != "Attached"){

            // Retrieve this current selected image to attack it:
            frameLogo(storageID)

            // list this logo as as attached
            this.setAttribute("Status", "Attached")

            // adjust the visibility of the other logos:
            adjustTableVisibility(listContainer, logoTable, storageID)
        }
    })

    // list the timing
    var timeCell = newRow.insertCell(1)
    timeCell.innerHTML = timestamp
    
    // examine the table's status for upload displays:
    adjustTableVisibility(listContainer, logoTable, storageID)
}

// function used to adjust the table visibility
function adjustTableVisibility(listContainer, logoTable, newID){
    if (logoTable.rowCount <= 1){
        listContainer.style.visibility = "hidden"
    }
    else{
        listContainer.style.visibility = "visible"
    }

    // adjust all other potential logos' clickability:
    for (var rowIndex = 1; rowIndex < logoTable.rows.length; rowIndex++){
        var listedLogo = logoTable.rows[rowIndex].cells[0]
        var listedID = listedLogo.getAttribute("StorageID")
        if (listedID != newID){
            listedLogo.classList.add("logo-switch-style")
            listedLogo.setAttribute("Status", "Await")
        }
        else{
            listedLogo.classList.remove("logo-switch-style")
        }
    }
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
export default uploadLogo