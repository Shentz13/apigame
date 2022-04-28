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

        const { ['log']: c } = console;

        const chestPassword = $("input[name='chestPassword']").val();
        var toDecrypt = localStorage.getItem('message');
/*
        const key = chestPassword;//CryptoJS.enc.Utf8.parse("hf8685nfhfhjs9h8");
        const iv1 = chestPassword;//CryptoJS.enc.Utf8.parse("hf8685nfhfhjs9h8");
        const plainText = CryptoJS.AES.decrypt(toDecrypt, key, {
            keySize: 16,
            iv: iv1,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        c(plainText.toString(CryptoJS.enc.Utf8));*/

        var bytes = CryptoJS.AES.decrypt(toDecrypt, chestPassword, {
            mode: CryptoJS.mode.CFB,
        });
        c("bytes:", bytes);
        var decryptedData = CryptoJS.enc.Utf8.stringify(bytes);
        //var decry = decryptedData.toString(CryptoJS.enc.Utf8);//.stringify(bytes);
        c("decryptedData: ",decryptedData);
    
        requestGeneric("etage1", "http://141.95.153.155/36", "get", localStorage.getItem("tokenStage1"));
    })

})