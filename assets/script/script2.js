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
        updatePlayerID();
        fetchPlayerStats();
    } else {
        alert("Please enter a valid player name.")
        return;
    }
});

function updatePlayerID(){
    var idText = Number(playernameinput2El.value);
    pID.textContent= idText;
};

function fetchPlayerStats() {
    playerID = playernameinput2El.value;
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
        pName.textContent = data.FantasyDraftName
        var playerImage = data.PhotoUrl
        console.log(data.PhotoUrl)
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