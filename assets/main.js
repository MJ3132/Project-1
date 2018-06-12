let userLocation;
// 
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
};
function showPosition(position) {
    userLocation = position.coords;
    console.log(userLocation);
    var latlng = String(userLocation.latitude + ',' + userLocation.longitude);
    console.log(" about to reverse Geo Code", latlng)
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
    // sign in 
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function() {
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
signUpBtn.on("click", function (event){
    event.preventDefault();
    const email = txtEmail.val();
    const pass = txtPassword.val();
    // sign up a user
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(function() {
        console.log('you signed up');  
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
    }); 
});
logOutBtn.on('click', function(event){
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
    getLocation();
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


// Suprise Me button aka Gives Random Results
$("#suprise-me").on("click", function () {
    // get random category to display
    var ranNum = Math.floor(Math.random() * (categories.length - 1))
    search = categories[ranNum];
    queryURL += "&" + $.param({
        'category': search,
    });
    $.ajax({
        url: `https://api.predicthq.com/v1/events/?limit=1&within=10km@${userLocation.latitude}%2C${userLocation.longitude}`,
        method: 'GET',
        contentType: "application/json",
        headers: {
            Authorization: "Bearer 4SepDTuqqTQQgPSM68gLJpoJJoEpSB",
            Accept: "application/json"
        }
    }).done(function (response) {
        console.log(response);
        console.log(userLocation.latitude);
        console.log("hello world");
        var answer = response.results;
        console.log(answer);
        var content = answer.map(function (eachEvent) {
            console.log(eachEvent);

            return {
                title: eachEvent.title,
                duration: eachEvent.duration
            };

        });

        console.log(content);
        var html = "";
        for (var i = 0; i < content.length; i++) {
            var postHTML = ` 
                <div class="post">
                    <h1 class="post-title">${content[i].title}</h1>
                    <h1 class="post-title">${content[i].duration}</h1>

                </div>
            `;
            console.log(postHTML);
            html += postHTML;
        }
        $('#answer-div').html(html);
    }).fail(function (err) {
        // throw errs
    });
});



// Page Rendering Function ( shows specific page, while hiding the other containers with the class of -page)
function isPageShownCurrently(page) {
    return false;
};
// [class*] all classes that have or end with]
function renderPage(page) {
    if (!$(`.${page}-page`).is(':visible')) {
        $('[class*="-page"]').hide(400, function () {
            $(`.${page}-page`).show(400);
        });
    }
};
// End page rendering function
// hide all pages except ...

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