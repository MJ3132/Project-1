
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

var queryURL = "https://api.predicthq.com/v1/events?limit=3";


var search = "coldplay";
// $("#search").on('click', function () {



//     // var searchQ = document.querySelector('.searchQ').value;

queryURL += "&" + $.param({
    'q': search,
    //'q': searchQ

});

console.log(queryURL)

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

    var articles = response.results;

    console.log(articles);  

    // articles.forEach(function(article) {
    //     var articleDiv = document.createElement('div');
    //     articleDiv.innerHTML = JSON.stringify(article);
    //     $("#show").append(articleDiv);
    //})

}).fail(function (err) {
    // throw err;
});

// });

