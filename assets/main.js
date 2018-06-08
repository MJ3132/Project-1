///user location retrieval
//working on the test button to get geo-relevant results
$('#test').on('click',function(){
    console.log('hi');
    getLocation();
});
/////
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
};
function showPosition(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
    console.log(position.coords.latitude, position.coords.longitude);
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log(lat, long);
    var latlng = String(lat + ',' + long);
    console.log(latlng)
    //run call in here
    var settingsGoogle = {
        "async": true,
        "crossDomain": true,
        "url": "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&key=AIzaSyCjU4tP9cgPggLk_lGUSzkwW75GgrsyLCY",
        "method": "GET",
    };
    $.ajax(settingsGoogle).done(function (response) {
        //extracted the info we need 
        var country = response.results[0].address_components[6].long_name;
        var stateProvince = response.results[0].address_components[5].long_name;
        var city = response.results[0].address_components[3].long_name;
        console.log(city,stateProvince, country);
        $("#city").text("You are located in"+" "+city+", "+stateProvince+", "+country)
    });
    ///run an ajax call to predictHQ api and get a result
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.predicthq.com/v1/events?category=conferences%2Cexpos%2Cconcerts%2Cfestivals%2Cperforming-arts%2Csports%2Ccommunity&within=10km@${lat}%2C${long}`,
        "method": "GET",
        "headers": {
          "authorization": "Bearer 4SepDTuqqTQQgPSM68gLJpoJJoEpSB",
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });

};

//deals with error for geolocation
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
};

///user authentication stuff 
var config = {
    apiKey: "AIzaSyDarVTsZc6k-a491eF6C8PgcSIwXqf0xNY",
    authDomain: "signup-signin-58064.firebaseapp.com",
    databaseURL: "https://signup-signin-58064.firebaseio.com",
    projectId: "signup-signin-58064",
    storageBucket: "signup-signin-58064.appspot.com",
    messagingSenderId: "175269563861"
};
firebase.initializeApp(config);
const txtEmail = $('#emailtext');
const txtPassword = $('#passwordtext');
const signUpBtn = $('#signup');
const signInBTn = $('#signin');
const logOutBtn = $('#logout');

//add sign In event
signInBTn.on("click", function () {
    const email = txtEmail.val();
    const pass = txtPassword.val();

    // sign in process authentification
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function () {
            console.log('you logged in');
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode, errorMessage);
        });
});
//sign up event
signUpBtn.on("click", function (event) {
    event.preventDefault();
    const email = txtEmail.val();
    const pass = txtPassword.val();
    // sign up a user
    firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(function () {
            console.log('you signed up');
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ...
        });
});
logOutBtn.on('click', function (event) {
    event.preventDefault();
    firebase.auth().signOut();
    console.log('you logged out');
});
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    renderPage('aftersignin');
    } else {
    // User is signed out.
    // ...
    renderPage('beforesignin');

    }});

// API Query URL + Parameters + AJAX CALLS
var queryURL = "https://api.predicthq.com/v1/events?limit=1";
var categories = ["conferences", "expos", "concerts", "festivals"];
var search = "";
var label = "";
var queryURL = queryURL + 
$("#submit-event").on("click", function () {
    label = $('#event-input').val().trim();
    queryURL += "&" + $.param({
        'labels': label
    });
    console.log("query URL" + queryURL);
    // Call Label Response AJAX
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

        var answer = response.results
        var posts = results.map(function (eachElement) {

            return {

            };
        });

        // posts(posts);

        function renderPosts(posts) {

            var html = "";
            for (var i = 0; i < posts.length; i++) {
                var postHTML = ` 
                    < div class= "post" >
                        <h1 class="post-title"> ${posts[i].title}  </h1>

            </div >
            `;
                console.log(postHMTL);
                html += postHMTL;
            }
            $('#answer').html(html);
        }


    }).fail(function (err) {
        // throw err;
    });
});
// End Call Label Response AJAX



// Suprise Me button aka Gives Random Results
$("#supriseMe").on("click", function () {
    // get random category to display
    var ranNum = Math.floor(Math.random() * (categories.length - 1))
    search = categories[ranNum];
    queryURL += "&" + $.param({
        'category': search,
    });
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
        var answer = response.results;
        console.log(answer);
        var content = answer.map(function (eachEvent) {
            console.log(eachEvent);

            return { title: eachEvent.title 
            
                    };


        });

        console.log(content);
        var html = "";
        for (var i = 0; i < content.length; i++) {
            var postHTML = ` 
                <div class="post">
                    <h1 class="post-title">${content[i].title}</h1>
                </div>
            `;
            console.log(postHTML);
            html += postHTML;
        }
        $('#answerContainer').html(html);
    }).fail(function (err) {
        // throw err;
    });
});



// Page Rendering Function ( shows specific page, while hiding the other containers with the class of -page)
function isPageShownCurrently(page) {
    return false;
};
// [class*] all classes that have or end with]
function renderPage(page) {
    if (!$(`.${page} -page`).is(':visible')) {
        $('[class*="-page"]').hide(400, function () {
            $(`.${page} -page`).show(400);
        });
    }
};
// End page rendering function

//delete button
$(document).on("click", "#delete", removeTask);
// Function to remove a task.
function removeTask() {
    // Grab the closest div to the element that was clicked and remove it.
    // (In this case, the closest element is the one that's encapsulating it.)
    $(this).closest("div").remove();
};
// once signed render suprise me page 
// renderPage('signup');
