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
firebase.auth().onAuthStateChanged(function (user) {
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

    }
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


// once signed render suprise me page 
// renderPage('signup');

//video background
var video = $('.background-video');
function runVideo(){
    video.get(0).play();
};
function pauseVideo() {
  video.get(0).pause();  
};

$('#play').on('click', function(e) 
    {
    runVideo();
    console.log('play');
}
);
$('#pause').on('click', function(e) 
    {
    pauseVideo();
    console.log('pause');
}
);

//doing the footer stuff rn
$('footer').on('click',function(e) {
    console.log('waddup');
    document.getElementById('overlay').style.display = "block";
});
$('#overlay').on('click',function(e) {
    console.log('waddup');
    document.getElementById('overlay').style.display = "none";
});

