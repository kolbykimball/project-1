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
var historyItems = [];

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
    historyItems = JSON.parse(localStorage.getItem("historyItems")) || [];
    var searchQuery = window.location.search;
    var urlParams = new URLSearchParams(searchQuery);
    var playerIdInput = urlParams.get("playerid");
    console.log(playerIdInput);
    playernameinput2El.textContent = playerIdInput;
    console.log(searchQuery);
    fetchPlayerStats(playerIdInput);
    fetchNews();
    renderSearchHistory();
    // var url = window.location.href;
    // var modifiedUrl = url.split("?");
    // console.log(modifiedUrl);
    // window.location.replace(modifiedUrl[0]); 
    // clearSearchParams();

};

init();

// function clearSearchParams() {
//     window.location.replace("")
// }

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

var deleteSearch = document.getElementById("clear-search");

deleteSearch.addEventListener("click", clearSearchQuery);

function clearSearchQuery (){
     var url = window.location.href;
    var modifiedUrl = url.split("?");
    console.log(modifiedUrl);
    window.location.replace(modifiedUrl[0]); 
}

function renderSearchHistory() {
    var searchHistory = document.getElementById("search-history");
    searchHistory.innerHTML = "";
    for (let i = 0; i < historyItems.length; i++) {
        var historyItem = historyItems[i];
        var li = document.createElement('li');
        li.setAttribute("style", "display: flex;")
        var button = document.createElement('button');
        var deleteButton = document.createElement('button');
        button.setAttribute("class", "searchHistoryButton button");
        button.setAttribute("style", "margin-right: 0px; border-radius: 8px 0 0 8px");
        button.textContent = historyItem;
        deleteButton.textContent = "X";
        deleteButton.setAttribute("class", "delete-button button is-dark is-small");
        deleteButton.setAttribute("style", "font-size: 16px; margin-left: 0px;  border-radius: 0 8px 8px 0;");
        button.setAttribute("data-index", i);
        li.append(button);
        li.append(deleteButton);
        // When appending list items, make the inner text the name and id and not just the number.
        searchHistory.append(li);

    }

   
    var searchHistoryBtn = document.getElementsByClassName("searchHistoryButton");
    for (let i = 0; i < searchHistoryBtn.length; i++) {
        searchHistoryBtn[i].addEventListener("click", function (event) {
            event.preventDefault();
            playernameinput2El.value = event.target.textContent;
            onFetchPlayerStats();
            console.log("hello");
        })

    }



    var deleteBtns = document.getElementsByClassName("delete-button");
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener("click", function (event) {
            var element = event.target;
            if (element.matches("button")) {
                var index = element.parentElement.getAttribute("data-index");
                historyItems.splice(index, 1);
                playernameinput2El.value = "";
                storeHistory();
                renderSearchHistory();
                // refreshes the page
                // location.reload();
            }
        })

    }

};

searchHistoryBtn.addEventListener("click", function (event) {
});

function storeHistory() {
    localStorage.setItem("historyItems", JSON.stringify(historyItems));
};


// When debugging code, go to the place where things start, look at the Event Listeners.