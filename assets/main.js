//<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
// Initialize Firebase

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
    
var txtEmail = document.getElementById('textemail');
var txtPassword = document.getElementById('passwordtext');
var signUpBtn = document.getElementById('signup');
var signInBTn = document.getElementById('signin');
var logOutBtn = document.getElementById('logout');

//add sign In event
signInBTn.addEventListener("click", function() {
    var email = txtEmail.val();
    var pass = txtPassword.val();
    console.log(email);
});

