
var config = {
    apiKey: "AIzaSyDarVTsZc6k-a491eF6C8PgcSIwXqf0xNY",
    authDomain: "signup-signin-58064.firebaseapp.com",
    databaseURL: "https://signup-signin-58064.firebaseio.com",
    projectId: "signup-signin-58064",
    storageBucket: "signup-signin-58064.appspot.com",
    messagingSenderId: "175269563861"
};

firebase.initializeApp(config);


var database = firebase.database();

var queryURL = "https://api.predicthq.com/v1/events?limit=1";

var categories = ["conferences", "expos", "concerts", "festivals"];


var search = "";



console.log(queryURL);


// using search button to display results 
$("#random-search").on("click", function () {

    // get random category to display

    var ranNum = Math.floor(Math.random() * (categories.length - 1))

    var search = categories[ranNum];

    queryURL += "&" + $.param({
        'category': search,
        //'q': search

    });




    //headers works as my authentification
    //send ajax
    $.ajax({
        url: queryURL,
        method: 'GET',
        contentType: "application/json",
        headers: {
            Authorization: "Bearer 4SepDTuqqTQQgPSM68gLJpoJJoEpSB",
            Accept: "application/json"

        }
    }).done(function (response) {
        console.log(response);

        var search = response.results;



        // articles.forEach(function(article) {
        // var articleDiv = document.createElement('div');
        // articleDiv.innerHTML = JSON.stringify(article);
        // $("#show").append(articleDiv);
        //})

    }).fail(function (err) {
        // throw err;
    });

});
// });

function isPageShownCurrently(page) {
    return false;
}

function renderPage(page) {
    if (!$(`.${page}-page`).is(':visible')) {
        $('[class*="-page"]').hide(400, function () {
            $(`.${page}-page`).show(400);
        });
    }
}


// hide all pages except ...
renderPage("signup");