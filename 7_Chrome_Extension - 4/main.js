$(document).ready(function(){
    $("#1-2").on("click", function(){
        chrome.tabs.create({
            "url": "https://fluster69.github.io/AX303/Snake%20-%201/index.html"
        });
    });
    $("#5-6").on("click", function(){
        chrome.tabs.create({
            "url": "https://fluster69.github.io/AX303/Pong%20-%203/index.html"
        });
    });
    $("#7-8").on("click", function(){
        chrome.tabs.create({
            "url": "https://fluster69.github.io/AX303/7_Chrome_Extension%20-%204/index.html"
        });
    });
});