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



})