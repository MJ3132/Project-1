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
    logOutBtn.show();
    signInBTn.hide();
    signUpBtn.hide();
    $("#initialstuff").hide();
      // ...
    } else {
    // User is signed out.
    // ...
    $('#login-tracker').hide();
    logOutBtn.hide();
    signInBTn.show();
    signUpBtn.show();
    $("#initialstuff").show();

    }
});