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
    $('#login-tracker').show();
    
    renderPage('aftersignin');
    } else {
    // User is signed out.
    // ...
    $('#login-tracker').hide();
    renderPage('beforesignin');

    }});

// API Query URL + Parameters + AJAX CALLS
var queryURL = "https://api.predicthq.com/v1/events?limit=1";
var categories = ["conferences", "expos", "concerts", "festivals"];
var search = "";
var label = "";

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
        var responseDiv = $('<div>');
        responseDiv.html(JSON.stringify(response.results[0]));
        $('#answerContainer').append(responseDiv);
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
        var responseDiv = $('<div>');
        responseDiv.html(JSON.stringify(response.results[0]));
        $('#answerContainer').append(responseDiv);
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
renderPage('signup');
