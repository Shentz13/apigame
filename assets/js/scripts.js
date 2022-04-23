function requestGeneric (page, urlApi, methodApi, tokenApi, param) {
    console.log("requestgeneric");
    var params = {
        url: urlApi,
        method: methodApi,
    }    
    
    if(tokenApi !== false) {
        params["token"] = localStorage.getItem("token");
    }

    fetch("http://127.0.0.1:8000/api/generic", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        },
        body: JSON.stringify(params)       
    
    }).then((response) => response.json()).then((response) => {
        
    genererFront(page, urlApi, response);
    })
};


function afficherMessage(message, html = null) {
    console.log("MESSAGE: ", message);
    $("#notifs").html("<h1>"+message+"</h1>");
    if(html) {
        $("#notifs").append(html); 
    }
}

const passwordInput = `
<div class="input-group mb-2" style="width:50%;">

<input type="text" class="form-control" id="inlineFormInputGroup" name="chestPassword" placeholder="Enter password">
<div class="input-group-prepend">
  <button type="button" id="unlockChest" class="input-group-text bg-warning">Dévérouiller</button>
</div>
</div>`;

const traitement = [{
    entree: [
        {route: 'http://141.95.153.155', message: 'presentation'},
        {route: 'http://141.95.153.155/inscription', message: 'message'},
    ],
    etage1 : [
        {route: 'http://141.95.153.155:8000', message: 'presentation'},
        {route: 'http://141.95.153.155/tresor', message: 'message'},
        {route: 'http://141.95.153.155/reset', message: 'retreived_tresors'},
        {route: 'http://141.95.153.155/1', message: 'message'},
        {route: 'http://141.95.153.155/coffre', message: 'text', html: passwordInput},
        {route: 'http://141.95.153.155/36', message: 'message'},
    ],
    etage2 : [
        {route: 'http://141.95.153.155:8000', message: 'presentation', html: '<button type="button" id="inscription" class="btn btn-warning text-dark">Ben c\'est toujours moi !</button>'}, // Escalier depuis l'étage 1 (envoi avec token)
    ],
}]

function genererFront(stage, url, response) {

console.log("STAGE: ", stage);
console.log("URL: ", url);
console.log("RESPONSE: ", response);

    traitement[0][stage].forEach((index) => {
        if(index.route == url) {
            var ind = index.message;
            message = response[ind];

            if(index.hasOwnProperty("html")){
                html = index.html;
            } else {
                html = null;
            }
            
            afficherMessage(message, html);
        }
    })

}


$(document).ready(function () {
    console.log("Ready");

    // Un webservice par étage ?

    //Inscription
    const inscription = (urlApi, b64token) => {


        localStorage.setItem("tokenb64", b64token);

        console.log(localStorage);

        var params = {
            url: urlApi,
            token: b64token,
        }   

        fetch("http://127.0.0.1:8000/api/inscription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(params)
        }).then((response) => response.json()).then((response) => {
            var message = response.message;
            console.log(message);
            $(".show").removeClass('show');
            $(".modal-backdrop").addClass("hidden");
            $('main, footer').html('');
            afficherMessage(message);

            localStorage.setItem("token", response["x-auth-token"][0]);
            console.log(localStorage);

            let params = (new URL(document.location)).searchParams;
            let stage = params.get('stage');

            if(!stage) {
                $("main").html('<a href="http://localhost/apigame/etage1.php" class="btn btn-primary text-light">Pénétrer dans le donjon</a>');
            }        
            

        })
    }




    $(document).on("click", "#modalLauncher", function() {
        $("#notifs").html("");
    })

    $(document).on("click", "#inscription", function() {
        var username = $("#usename").val();
        var password = $("#password").val();
        var urlInscription = "";
        if(parseInt($("#inscription").attr("data-stage")) == 2) {
            urlInscription = "http://141.95.153.155:8000/inscription";
        } else if (parseInt($("#inscription").attr("data-stage")) == 3) {
            urlInscription = "http://141.95.153.155:7259/inscription";
        } else {
            urlInscription = "http://141.95.153.155/inscription";
        }

        if(username != "" && password != "") {
            inscription(urlInscription, btoa(username + ": " + password));
        } else {
            inscription(urlInscription, localStorage.getItem("tokenb64"));
        }
    })
  

})