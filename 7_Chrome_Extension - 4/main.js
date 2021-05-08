$(document).ready(function(){
    $("#confirm").on("click", function(){
        chrome.tabs.create({
            "url": "https://github.com/Fluster69/"
        });
    });
});