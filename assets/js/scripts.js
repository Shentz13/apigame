function monitor(body, mode, type) {
    //body = JSON.stringify(body);
    console.log(body);
    var text = '<p class="bracket">{</p>';
    for (const [key, value] of Object.entries(body)) {
        console.log(`${key}: ${value}`);
        text += `<p><span class="bold">${key}:</span> ${value}</p>`;
      }
      text += '<p class="bracket">}</p>';

      var title = type == "request" ? "Requête" : "Réponse";
      
    if(mode) {
        $("#monitor").append('<br><h1>'+title+'</h1>'+text);
    } else {
        $("#monitor").html('<h1>'+title+'</h1>'+text);
    }
        
}

function requestGeneric (page, urlApi, methodApi, tokenApi, param) {
    console.log("requestgeneric");
    var params = {
        url: urlApi,
        method: methodApi,
    }    

    if(urlApi == "http://141.95.153.155:8000/vieux" && methodApi == "post") {
        var params = {
            url: urlApi,
            method: methodApi,
            data: param
        }  
    }

    if(tokenApi !== false) {
        params["token"] = tokenApi;
    }

    monitor(params, false, "request"); // affichage détails requete

    fetch("http://127.0.0.1:8000/api/generic", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        },
        body: JSON.stringify(params), 
    
    }).then((response) => response.json()).then((response) => {
        
        urlApi = methodApi == "post" ? urlApi + '/reponse' : urlApi;
        if(urlApi == "http://141.95.153.155/coffre") {
            localStorage.setItem("message", response.message);
        }
        monitor(response, true, "reponse");
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
        {route: 'http://141.95.153.155:8000', message: 'presentation', html: '<button type="button" id="inscription" data-stage="2" class="btn btn-warning text-dark">Ben c\'est toujours moi !</button>'}, // Escalier depuis l'étage 1 (envoi avec token)
        {route: 'http://141.95.153.155:8000/vieux', message: 'descripton', html: '<h1>"En un mot, quelle est la notion de HTTP qui différencie la méthode POST et PUT ?"</h1><div style="display:flex;flex-direction:row;"><input type="text" name="reponseVieux" class="form-control"><button type="button" class="btn btn-light" id="reponseVieux">Soumettre la réponse</button></div>'},
        {route: 'http://141.95.153.155:8000/reset', message: 'retreived_tresors'},
        {route: 'http://141.95.153.155:8000/couloir', message: 'message', html: '</h1><button type="button" class="btn btn-light" id="boutCouloir">Voyons cela !</button>'},
        {route: 'http://141.95.153.155:8000/couloir/1', message: 'message'},
        {route: 'http://141.95.153.155:8000/vieux/reponse', message: 'message'},
    ],
    etage3 : [
        {route: 'http://141.95.153.155:7259', message: 'presentation', html:'<button type="button" id="inscription" data-stage="3" class="btn btn-warning text-dark">Ben c\'est toujours moi !</button>'},
        {route: 'http://141.95.153.155:7259/reset', message: 'retreived_tresors'},
        {route: 'http://141.95.153.155:7259/dragon', message: 'message'},
    ]
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

        monitor(params, false, "request"); // affichage détails requete

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

            

            let params = (new URL(document.location)).searchParams;
            let stage = params.get('stage');

            if(!stage) {
                $("main").html('<div id="monitor"></div><a href="http://localhost/apigame/etage1.php" class="btn btn-primary text-light">Pénétrer dans le donjon</a>');
                localStorage.setItem("tokenStage1", response["x-auth-token"][0]);
                localStorage.setItem("token", response["x-auth-token"][0]);
                console.log(localStorage);
            } else if(stage == '2') {
                $("main").html('<div id="monitor"></div><div id="oldMan"></div>');
                $("footer").html(`
                <a href="http://localhost/apigame/etage1.php" class="btn btn-primary text-light">Redescendre à l'étage inférieur</a>
                <button type="button" class="btn btn-primary" id="recap">Trésors trouvés</button>
                <button type="button" class="btn btn-primary" id="couloir">Emprunter le couloir</button>
                <a href="http://localhost/apigame/etage3.php?stage=3" class="btn btn-primary text-light">Prendre les
        escaliers</a>
              `);
              localStorage.setItem("tokenStage2", response["x-auth-token"][0]);
              console.log(localStorage);
            } else if(stage == '3') {
                $("footer").html(`
                <a href="http://localhost/apigame/etage2.php?stage=2" class="btn btn-primary text-light">Redescendre à l'étage inférieur</a>
                <button type="button" class="btn btn-primary" id="recap">Trésors trouvés</button>
                <button type="button" class="btn btn-primary" id="dragon">Combattre le dragon</button>
                `);
                localStorage.setItem("tokenStage3", response["x-auth-token"][0]);
                console.log(localStorage);
               
            }    
            
            monitor(params, false, "request"); // affichage détails requete
        })
    }




    $(document).on("click", "#modalLauncher", function() {
        $("#notifs").html("");
    })

    $(document).on("click", "#inscription", function() {
        var password = "";
        var username = "";
        var urlInscription = "";
        if(parseInt($("#inscription").attr("data-stage")) == 2) {
            urlInscription = "http://141.95.153.155:8000/inscription";
        } else if (parseInt($("#inscription").attr("data-stage")) == 3) {
            urlInscription = "http://141.95.153.155:7259/inscription";
        } else {
            urlInscription = "http://141.95.153.155/inscription";
            username = $("#username").val();
            password = $("#password").val();
        }

        if(username != "" && password != "") {
            console.log("checkpoint1");
            inscription(urlInscription, btoa(username + ": " + password));
        } else {
            if(parseInt($("#inscription").attr("data-stage")) != 1) {
                var tok = localStorage.getItem("tokenb64");
                console.log("checkpoint2");
                inscription(urlInscription, tok);
            } 
            
        }
    })
  

})