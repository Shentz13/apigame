function requestGeneric (page, urlApi, methodApi, tokenApi) {

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

}

function afficherMessage(message) {
    console.log("MESSAGE: ", message);
    $("#notifs").html("<h1>"+message+"</h1");
}



const traitement = [{
    inscription: [
        {route: 'http://141.95.153.155', message: 'presentation', format: 'json'},
        {route: 'http://141.95.153.155/inscription', message: 'message'},
    ],
    etage1 : [
        {route: 'http://141.95.153.155:8000', message: 'presentation'},

    ],
    etage2 : {},
    etage3 : {}
}]

function genererFront(stage, url, response) {
console.log(response);
    traitement[0][stage].forEach((index) => {
        if(index.route == url) {
            var ind = index.message;
            var message = JSON.parse(response);
            afficherMessage(message[ind]);
        }
    })

}
    /*
    for (var [key, value] of Object.entries(traitement[0])) {
        console.log(`${key}: ${value}`);
        var etage = key[stage];

        for (var [k,v] of Object.entries(traitement[0][etage])) {
            var message = key[stage][method];
            console.log(message);
        }
        
    }*/




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
                $("main").html('<a href="http://localhost/apigame/donjon.php" class="btn btn-primary text-light">Pénétrer dans le donjon</a>');
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
            inscription("http://141.95.153.155/inscription", btoa(username + ": " + password));
        }
    })

    const genererFooter = (step) => {

    }

    

})