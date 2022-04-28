$(document).ready(function () {

  // On load
  requestGeneric("etage3", "http://141.95.153.155:7259", "get", localStorage.getItem("tokenStage2"));

  // Récap
  $(document).on("click", "#recap", function () {

    requestGeneric("etage3", "http://141.95.153.155:7259/reset", "get", localStorage.getItem("tokenStage3"));
  })

  // Dragon
  $(document).on("click", "#dragon", function () {

    requestGeneric("etage3", "http://141.95.153.155:7259/dragon", "get", localStorage.getItem("tokenStage3"));
  })

  $(document).on("click", "#killDragon", function () {
    requestGeneric("etage3", "http://141.95.153.155:7259/dragon", "delete", localStorage.getItem("tokenStage3"));
  })

})