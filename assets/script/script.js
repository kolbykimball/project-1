var searchForm1 = document.getElementById('search-form1');
var searchForm2 = document.getElementById('search-form2');
var searchForms = searchForm1, searchForm2;
var playernameinputEl = document.getElementById("player-name-input");
var playerNameDisplay = document.getElementById('player-nameEl');
var searchBtn1El = document.getElementById("search-btn1");
var date = "2022-JAN-09";
var currDT = moment().format("YYYY" + "-" + "MMM" + "-" + "DD").toUpperCase()
var apiKey = "1e7382eee81a4fd19631d38f764c1449";
var bkBtn = document.getElementById('back-btn');
var playerID = ""
var historyItems = [];

function updatePlayerName(){
    playerID = playernameinputEl.value;
    playerNameDisplay.innerText(playernameinputEl.value);
}

function fetchPlayerStats1() {
    // playerID = playernameinputEl.value;
    // var getPlayerStatsApi = `https://api.sportsdata.io/v3/nfl/stats/json/DailyFantasyPlayers/${date}?key=${apiKey}`;
    var getPlayerStatsApi2 = `https://api.sportsdata.io/v3/nfl/scores/json/Player/${playerID}?key=1e7382eee81a4fd19631d38f764c1449`
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
        console.log(currDT);
    })
}

fetchPlayerStats1();


// function getPlayerStats2() {
//     var api2 = 'https://api.sportradar.us/nfl/official/{access_level}/{version}/{language_code}/league/{year}/{month}/{day}/changes.{format}?api_key=${apiKey}'
//     fetch(api2).then(function (response) {
//         return response.json()
//     }).then(function (data) {
//         console.log(data);
//     })
// }

// getPlayerStats2();

searchForm1.addEventListener("submit", function () {
    var searchText = playernameinputEl.value;
    console.log(searchText);

    if (searchText.length > 0) {
        historyItems.push(searchText);
        window.open('./resultsPage.html'); 

    } else {
        alert("Please enter a valid player name.")
        return;
    }

});


// Goes back to the search page 
bkBtn.addEventListener("click", function () {
           window.open('./index.html'); 
           console.log("check");
});