var date = "2021-OCT-21";
var apiKey = "1e7382eee81a4fd19631d38f764c1449";




function fetchPlayerStats1() {
    var getPlayerStatsApi = `https://api.sportsdata.io/v3/nfl/stats/json/DailyFantasyPlayers/${date}?key=${apiKey}`;
    fetch(getPlayerStatsApi, {
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