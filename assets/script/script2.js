var searchForm2 = document.getElementById('search-form2');
var bkBtn = document.getElementById('back-btn');
var playernameinput2El = document.getElementById("player-name-input2");
var searchBtn2El = document.getElementById("search-btn2");
var pName = document.getElementById("player-nameEl");
var pImg = document.getElementById("player-imgEl");
var pID = document.getElementById("idEl");
var pTeam = document.getElementById("teamEl");
var pNumber = document.getElementById("numEl");
var pHeight = document.getElementById("hgtEl");
var pWeight = document.getElementById("wgtEl");
var pPosition = document.getElementById("posEl");
var pInjuries = document.getElementById("injEl");
var part = "";
var searchHistory = [];

bkBtn.addEventListener("click", function () {
    window.open('./index.html');
    console.log("check");
});

searchForm2.addEventListener("submit", function (event) {
    event.preventDefault();
    var searchText = playernameinput2El.value;
    console.log(searchText);

    if (searchText.length > 0) {
        historyItems.push(searchText);
        onFetchPlayerStats();
        updatePlayerID();
        storeHistory();
        renderSearchHistory();
        
    } else {
        alert("Please enter a valid player name.")
        return;
    }
});

function updatePlayerID() {
    var idText = Number(playernameinput2El.value);
    pID.textContent = idText;
};

function onFetchPlayerStats() {
    playerID = playernameinput2El.value;
    fetchPlayerStats(playerID);
};

function fetchPlayerStats(playerId) {

    // var getPlayerStatsApi = `https://api.sportsdata.io/v3/nfl/stats/json/DailyFantasyPlayers/${date}?key=${apiKey}`;
    var getPlayerStatsApi2 = `https://api.sportsdata.io/v3/nfl/scores/json/Player/${playerId}?key=1e7382eee81a4fd19631d38f764c1449`
    fetch(getPlayerStatsApi2, {
        // "method": "GET",
        // "headers": {
        //     "Ocp-Apim-Subscription-Key": "1e7382eee81a4fd19631d38f764c1449",
        //     // "Content-Type": "application/json"
        // },
        // "mode": "no-cors"
    }).then(function (response) {
        console.log(response);
        return response.json()
    }).then(function (data) {
        console.log(data);
        pName.textContent = data.Name
        var playerImage = data.PhotoUrl
        pImg.setAttribute("src", playerImage)
        pImg.setAttribute("style", "padding: 23px 36px; transform: scale(150%);")
        pTeam.textContent = data.Team
        pNumber.textContent = data.Number
        pHeight.textContent = data.Height
        pWeight.textContent = data.Weight
        pPosition.textContent = data.Position
        pInjuries.textContent = data.InjuryStatus

    })
}

function init() {
    var searchQuery = window.location.search;
    var urlParams = new URLSearchParams(searchQuery);
    var playerIdInput = urlParams.get("playerid");
    console.log(playerIdInput);
    playernameinput2El.textContent = playerIdInput;
    fetchPlayerStats(playerIdInput);
    fetchNews();
    renderSearchHistory();

}

init();

// CORY: Declare variables that reference the parts of the HTML code that you will modify with javascript here ⇩

// Examples: 
title2 = document.getElementById("art-title-2");
title3 = document.getElementById("art-title-3");
author2 = document.getElementById("authors-2");
author3 = document.getElementById("authors-3");
artBody2 = document.getElementById("article-body-2");
artBody3 = document.getElementById("article-body-3");
readMore2 = document.getElementById("read-more-2");
readMore3 = document.getElementById("read-more-3");
// End message

function fetchNews() {
    var getNews = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news";
    fetch(getNews, {
        method: 'GET',
    }).then(function (response) {
        console.log("test for news api")
        console.log(response);
        return response.json()
    }).then(function (data) {
        console.log(data);
// CORY:Change the text in the news article area 1 here⇩

// Examples: 
        title2.textContent=data.articles[1].headline;
        title3.textContent=data.articles[2].headline;
        author2.textContent=data.articles[1].byline; 
        author3.textContent=data.articles[2].byline;
        artBody2.textContent=data.articles[1].description; 
        artBody3.textContent=data.articles[2].description;
        readMore2.setAttribute("href", data.articles[1].links.web.href);
        readMore3.setAttribute("href", data.articles[2].links.web.href);
    })
};

function renderSearchHistory(){
    
}