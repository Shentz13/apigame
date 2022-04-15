$(document).ready(function () {
    console.log("Ready");

    // Un webservice par étage ?
    
    const afficherMessage = (message) => {
        console.log("MESSAGE: ", message);
        $("#notifs").html("<h1>"+message+"</h1");
    }

    //Inscription
    const inscription = (urlApi, b64token) => {

        if(urlApi.includes(":8000")) {
            localStorage.setItem("tokenStage2", b64token);
        } else if (urlApi.includes(":7259")) {
            localStorage.setItem("tokenStage3", b64token);
        } else {
            localStorage.setItem("tokenStage1", b64token);
        }

        console.log("token: ", b64token);
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
            $(".show").removeClass('show');
            $(".modal-backdrop").addClass("hidden");
            $('main, footer').html('');
            afficherMessage(message);
        
            let params = (new URL(document.location)).searchParams;
            let stage = params.get('stage'); // la chaine de caractère "Jonathan Smith".
            if(!stage) {
                $("main").html('<a href="http://localhost/apigame/donjon.php" class="btn btn-primary text-light">Pénétrer dans le donjon</a>');
            }
                            
            

        })
    }


    const requestGeneric = (urlApi, methodApi, tokenApi) => {

        var params = {
            url: urlApi,
            method: methodApi,
        }    
        
        if(tokenApi) {
            if(urlApi.includes(":8000")) {
                params["token"] = localStorage.getItem("tokenStage2");
            } else if (urlApi.includes(":7259")) {
                params["token"] = localStorage.getItem("tokenStage3");
            } else {
                params["token"] = localStorage.getItem("tokenStage1");
            }
        }

        fetch("http://127.0.0.1:8000/api/generic", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(params)       
        
        }).then((response) => response.json()).then((response) => {
            var message = response.presentation;
            afficherMessage(message);

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
            inscription("http://141.95.153.155:8000/inscription", btoa(username + ": " + password));
        }
    })

    const genererFooter = (step) => {

    }

    //Onload
    requestGeneric("http://141.95.153.155", "get", false);
    // Effacer tous les éléments
    localStorage.clear();
})