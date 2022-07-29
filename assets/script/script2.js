var searchForm2 = document.getElementById('search-form2');
var bkBtn = document.getElementById('back-btn');
var playernameinput2El = document.getElementById("player-name-input2");
var searchBtn2El = document.getElementById("search-btn2");
var pName = document.getElementById("player-nameEl");
var pImg = document.getElementById("player-imgEl");
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
        storeHistory();
        renderSearchHistory();

    } else {
        alert("Please enter a valid player name.")
        return;
    }
});

function onFetchPlayerStats() {
    playerID = playernameinput2El.value;
    fetchPlayerStats(playerID);
};

function fetchPlayerStats(playerId) {
    var getPlayerStatsApi2 = `https://api.sportsdata.io/v3/nfl/scores/json/Player/${playerId}?key=1e7382eee81a4fd19631d38f764c1449`
    fetch(getPlayerStatsApi2, {
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
};

function init() {
    var storedHistory = JSON.parse(localStorage.getItem("historyItems"));
    if (storedHistory !== null) {
        historyItems = storedHistory;
    }
    var searchQuery = window.location.search;
    var urlParams = new URLSearchParams(searchQuery);
    var playerIdInput = urlParams.get("playerid");
    console.log(playerIdInput);
    playernameinput2El.textContent = playerIdInput;
    fetchPlayerStats(playerIdInput);
    fetchNews();
    renderSearchHistory();

};

init();

title1 = document.getElementById("art-title-1");
title2 = document.getElementById("art-title-2");
title3 = document.getElementById("art-title-3");
author1 = document.getElementById("authors-1");
author2 = document.getElementById("authors-2");
author3 = document.getElementById("authors-3");
artBody1 = document.getElementById("article-body-1");
artBody2 = document.getElementById("article-body-2");
artBody3 = document.getElementById("article-body-3");
readMore1 = document.getElementById("read-more-1");
readMore2 = document.getElementById("read-more-2");
readMore3 = document.getElementById("read-more-3");

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
        title1.textContent = data.articles[0].headline;
        title2.textContent = data.articles[1].headline;
        title3.textContent = data.articles[2].headline;
        author1.textContent = data.articles[0].byline;
        author2.textContent = data.articles[1].byline;
        author3.textContent = data.articles[2].byline;
        artBody1.textContent = data.articles[0].description;
        artBody2.textContent = data.articles[1].description;
        artBody3.textContent = data.articles[2].description;
        readMore1.setAttribute("href", data.articles[0].links.web.href);
        readMore2.setAttribute("href", data.articles[1].links.web.href);
        readMore3.setAttribute("href", data.articles[2].links.web.href);
    })
};

function renderSearchHistory() {
    var searchHistory = document.getElementById("search-history");
    searchHistory.innerHTML = "";
    for (let i = 0; i < historyItems.length; i++) {
        var historyItem = historyItems[i];
        var li = document.createElement('li');
        var button = document.createElement('button');
        var deleteButton =document.createElement('button');
        button.setAttribute("class", "searchHistoryButton button");
        button.textContent = historyItem;
        deleteButton.textContent="X";
        deleteButton.setAttribute("class", "button is-dark is-small");
        deleteButton.setAttribute("style", "font-size: 16px; transform:translate(50px); border-radius: 8px;");
        li.setAttribute("data-index", i);
        li.append(button);
        button.append(deleteButton);
        // When appending list items, make the inner text the name and id and not just the number.
        searchHistory.append(li);

    }

    var searchHistoryBtn = document.getElementsByClassName("searchHistoryButton");
    console.log(searchHistoryBtn.length);
    for (let i = 0; i < searchHistoryBtn.length; i++) {
        searchHistoryBtn[i].addEventListener("click", function (event) {
            playernameinput2El.value = event.target.innerHTML;
            searchForm2.submit(event);
            

        console.log("hello");
        })
       
    }

};

searchHistoryBtn.addEventListener("click", function(event){
    var element = event.target;
    if(element.matches("button") === true) {
        var index = element.parentElement.getAttribute("data-index");
        historyItems.splice(index, 1);
     
        storeHistory();   
        renderSearchHistory();
    }
});

function storeHistory() {
    localStorage.setItem("historyItems", JSON.stringify(historyItems));
};
