// function used to set style of the current logo display in the table:
function frameLogo(storageID){
    
    // fetch the stored image path for attachment:
    fetch(`/getStoragePath?StorageID=${storageID}`,{
        method: 'GET'
    })
    .then(Response => Response.json())
    .then(data => {
        //frame logo
        var fetchedPath = data["Logo_Storage_Path"]
        var overlayImage = document.getElementById("circle-overlay")
        overlayImage.setAttribute("src", fetchedPath)
    })
    .catch(error => {
        console.log("Error", error)
    })
}

export default frameLogo