$(document).ready(function () {
    console.log("Ready");

    // Un webservice par étage ?
    


//Inscription
// En-tête : Authorization: Basic (username: password encodé en base 64)
const inscription = (b64token) => {

    console.log("token: ", b64token);
    var params = {
        url:"http://141.95.153.155:8000/inscription",
        token:b64token,
    }   

    fetch("http://127.0.0.1:8000/api/inscription", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(params)
      }).then((response) => console.log(response))
}


const requestGeneric = (urlApi, methodApi, tokenApi) => {

    var params = {
        url: urlApi,
        method: methodApi,
    }    
    
    if(tokenApi !== false) {
        if(tokenApi) {
            params["token"] = tokenApi;
        } else {
            //localstorage
        }
    }

    fetch("http://127.0.0.1:8000/api/generic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(params)
        
       
      }).then((response) => {
          afficherMessage(response.message);console.log(response["message"])})


}

const afficherMessage = (message) => {
    $("#notifs").html("<h1>"+message+"</h1");
}



$(document).on("click", "#inscription", function() {
    var username = $("#usename").val();
    var password = $("#password").val();

    if(username != "" && password != "") {
        inscription(btoa(username + ": " + password));
    }
    

})

    //Onload
    requestGeneric("http://141.95.153.155", "get", false);

})