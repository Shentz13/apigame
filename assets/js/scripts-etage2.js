$(document).ready(function () {

    //Onload
    requestGeneric("etage2", "http://141.95.153.155:8000", "get", localStorage.getItem("token"));
  
    // Vieux
    $(document).on("click", "#oldMan", function() {
        requestGeneric("etage2", "http://141.95.153.155:8000/vieux", "get", localStorage.getItem("tokenStage2"));
    })

    // Récap
    $(document).on("click", "#recap", function() {

        requestGeneric("etage2", "http://141.95.153.155:8000/reset", "get", localStorage.getItem("tokenStage2"));
    })

    // Couloir
    $(document).on("click", "#couloir", function() {

        requestGeneric("etage2", "http://141.95.153.155:8000/couloir", "get", localStorage.getItem("tokenStage2"));
    })

    // Bout couloir
    $(document).on("click", "#boutCouloir", function() {

        requestGeneric("etage2", "http://141.95.153.155:8000/couloir/1", "get", localStorage.getItem("tokenStage2"));
    })

    // Reponse vieux
    $(document).on("click", "#reponseVieux", function() {

        let value = $("input[name='reponseVieux']").val();
        if(value != "") {
            requestGeneric("etage2", "http://141.95.153.155:8000/vieux", "post", localStorage.getItem("tokenStage2"), value);
        }
        
    })
    

    
    
    })