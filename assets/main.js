



// API Query URL + Parameters + AJAX CALLS

var queryURL = "https://api.predicthq.com/v1/events?limit=1";

var categories = ["conferences", "expos", "concerts", "festivals"];
var search = "";
var label = "";
var timezone ='toronto'; 


$("#submmit-event").on("click", function () {
    // get random category to display
    label = $('#event-input').val().trim();
    queryURL += "&" + $.param({
        'labels': label,
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

    }).fail(function (err) {
        // throw err;
    });
});

// End Call Label Response AJAX


// Location parameter


$("#location").on("click", function () {

    // get random category to display

    var ranNum = Math.floor(Math.random() * (categories.length - 1))

    search = categories[ranNum];

    queryURL += "&" + $.param({
        'location': search,
        'timezone': toronto


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

        var answer = response.results[0];

        var responseDiv = $('<div>');
        responseDiv.html(JSON.stringify(response.results[0]));

        $('#answerContainer').append(responseDiv);

    }).fail(function (err) {
        // throw err;
    });
});

// End Location parameter



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

        var answer = response.results[0];

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
}
// [class*] all classes that have or end with]

function renderPage(page) {
    if (!$(`.${page}-page`).is(':visible')) {
        $('[class*="-page"]').hide(400, function () {
            $(`.${page}-page`).show(400);
        });
    }
}
// End page rendering function


// hide all pages except ...


//delete button

$(document).on("click", "#delete", removeTask);

// Function to remove a task.
function removeTask() {

    // Grab the closest div to the element that was clicked and remove it.
    // (In this case, the closest element is the one that's encapsulating it.)

    $(this).closest("div").remove();
}
// once signed render suprise me page 
renderPage('signup');

// End Delete Button