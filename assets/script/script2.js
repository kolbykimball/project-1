var searchForm2 = document.getElementById('search-form2');
var bkBtn = document.getElementById('back-btn');
var playernameinput2El = document.getElementById("player-name-input2");
var searchBtn2El = document.getElementById("search-btn2");

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
    } else {
        alert("Please enter a valid player name.")
        return;
    }

});