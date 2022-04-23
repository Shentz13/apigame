$(document).ready(function () {
    console.log("Ready");

    // Trésor caché
    $(document).on("click", "#hiddenTreasure", function() {
        requestGeneric("etage1", "http://141.95.153.155/tresor", "get", localStorage.getItem("tokenStage1"));
    })

    // Escalier
    $(document).on("click", "#escalierBtn", function() {
        console.log(localStorage.getItem("token"));

        requestGeneric("etage1", "http://141.95.153.155:8000", "get", localStorage.getItem("token"));
    })

    // Récap
    $(document).on("click", "#recap", function() {

        requestGeneric("etage1", "http://141.95.153.155/reset", "get", localStorage.getItem("tokenStage1"));
    })

    // Trésor
    $(document).on("click", "#treasure", function() {
    
        requestGeneric("etage1", "http://141.95.153.155/1", "get", localStorage.getItem("tokenStage1"));
    })

    // Coffre
    $(document).on("click", "#coffre", function() {
    
    requestGeneric("etage1", "http://141.95.153.155/coffre", "get", localStorage.getItem("tokenStage1"));
    })

    // Trésor dévérouillé
    $(document).on("click", "#unlockChest", function() {
        const chestPassword = $("input[name='chestPassword']").val();
    
        requestGeneric("etage1", "http://141.95.153.155/36", "get", localStorage.getItem("tokenStage1"));
    })

})