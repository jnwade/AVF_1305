/*
 AVF 1305
 Joanthan Wade
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        console.log("This is a test");
    }
};



//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************

//Twitter API

//Do something when the focus changes from the input field
$("#twitSearch").on("change", function () {
        //Empty the Data Container to make room for new content
        $("#twitData").empty();
        //Assign text input value to variable
        var searchTerm = $("#twitSearch").val();

        //Retrieve Twitter data based on the text input
        $.getJSON("http://search.twitter.com/search.json?q='" + searchTerm + "'&rpp=8&include_entities=true&callback=?", function (data) {

                console.log(data);
                //alert("Call is working");
                //Loop through results
                for (i = 0, j = data.results.length; i < j; i++) {
                    //UI Array for styling results with JQM
                    var gridAlpha = ['ui-block-a', 'ui-block-b', 'ui-block-c', 'ui-block-d', 'ui-block-a', 'ui-block-b', 'ui-block-c', 'ui-block-d'];

                    //Code to create dynamic content
                    $("<div class='" + gridAlpha[i] + "'>" +
                        "<div class='ui-bar ui-bar-c' style='height:200px'>" +
                        "<img src='" + data.results[i].profile_image_url + "'id='twitPic'class='textWrap' />" +
                        "<p>" + data.results[i].text + "<i>" + data.results[i].created_at + "</i>" + "</p>" +
                        "<h3>@" + data.results[i].from_user + "</h3>" +
                        "</div>").appendTo($("#twitData"));

                }
                //Refresh the listview to apply JQM Styles
                $("#twitData").listview("refresh");
            });
    });



//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************


// Bandsintown API

//Initialize Bandsintown API Page
$("#bandsinAPI").on("pageinit", function () {
		//Do something when the focus changes from the input field
        $("#localShows").on("change", function () {
	        	//Empty the Data Container to make room for new content
                $("#eventData").empty();
                 //Assign text input value to variable
                var bandSearch = $("#localShows").val();
                 //Retrieve Bandsintown data based on the text input
                $.getJSON("http://api.bandsintown.com/artists/" + bandSearch + "/events.json?api_version=2.0&app_id=AVF_1305_assignment&callback=?", function (data) {

                        console.log(data);
                        //Loop through results
                        for (i = 0, j = data.length; i < j; i++) {
                        	
                            var ticketURL = data[i].ticket_url;
                            //If the URL data from the Bandsintown API returns null, endow it with the URL to Ticketmaster
                            if (ticketURL === null) {
                                ticketURL = "http://www.ticketmaster.com";
                            } else {
                            	//Otherwise keep on keepin' on
                                ticketURL = data[i].ticket_url;
                            }
                             //Code to create dynamic content
                            $("<div class='eventStyle'>" +
                                "<div class='ui-bar ui-bar-c' style='height:240px'>" +
                                "<img src='" + data[i].artists[0].image_url + "'id='bandPic' />" +
                                "<section id='deets'>" +
                                "<h1 class='bitHeader'>" + data[i].title + "</h1>" +
                                "<p>" + data[i].formatted_datetime + " :: " + data[i].formatted_location + "</p>" +
                                "<p>Ticket Status: " + data[i].ticket_status + "</p>" +
                                "</section>" +
                                "</div>" +
                                //This button was a pain. Finally figured out that it's default functionality was interfering with my functionc call below. 
                                //Fixed it by not using the HREF field and assigning the URL to the value instead.
                                "<a type='button' class='gotoSite' href='#' value='" + ticketURL + "' data-theme='b'>Get Tickets</a>" +
                                "</div>").appendTo($("#eventData"));

                        }
                        //When the "Get Tickets" button is clicked the value of 'this' instance of the link is store into a variable and injected into the iab.
                        $(".gotoSite").on("click", function () {
                                var goTix = $(this).attr("value");
                                var ref = window.open(goTix, '_blank', 'location=yes');
                                //alert($(this).attr("value"));
                            });
                        //This ensures that the proper JQM styling is applied to the "Get Tickets" button
                        $('#eventData').trigger('create');
                        //Refreshed the list view so that the JQM styles are properly applied
                        $('eventData').listview('refresh');

                    });

            });

    });



//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************


// Geolocation 

//Initialize Geolocation Test Page
$("#geoComp").on("pageinit", function () {
		//onClick handler that will trigger the following function when the findMe button is clicked
        $("#findMe").on("click", function () {
	        	//Emptys data container to make room for new information
                $("#mapView").empty();
                //On the successful retrieval of the API information cary out the onSuccess function.
                var onSuccess = function (position) {
	                //Assign lattitude and longitude to variabels that will be injected into the API AJAX call. 
                    var latitude = position.coords.latitude,
                        longitude = position.coords.longitude;

                    $('<img src="http://maps.googleapis.com/maps/api/staticmap?size=400x400&markers=color:blue%7Clabel:!%7C' + latitude + ',' + longitude + '&maptype=hybrid&sensor=true" />').appendTo($("#mapView"));

                };

                // onError Callback receives a PositionError object
                var onError = function(error) {
                    alert('code: ' + error.code + '\n' +
                        'message: ' + error.message + '\n');
                }


                
                navigator.geolocation.getCurrentPosition(onSuccess, onError);



            });


    });


//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************

// Camera

//Initialize Camera testing Page
$("#camComp").on("pageinit", function () {

		//Global Variables
        var pictureSource;
        var destinationType;


        
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;



        var onPhotoURISuccess = function(imageURI) {


            // Set image element id

            var largeImage = document.getElementById('largeImage');

            // Dislay image html elements

            largeImage.style.display = 'block';

            // Show photo

            largeImage.src = imageURI;



        }


        var capturePhoto = function() {

            navigator.camera.getPicture(onPhotoURISuccess, onFail, {
                    quality: 50,
                    destinationType: destinationType.DATA_URL
                });
        }


        var capturePhotoEdit = function() {
            // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
            navigator.camera.getPicture(onPhotoURISuccess, onFail, {
                    quality: 20,
                    allowEdit: true,
                    destinationType: destinationType.FILE_URI
                });
        }


        var getPhoto = function(source) {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(onPhotoURISuccess, onFail, {
                    quality: 50,
                    destinationType: destinationType.FILE_URI,
                    sourceType: source
                });
        }


        var onFail = function(message) {
            alert("Well fine then! I didn't want to take a picture of you anyway!");
        }



        //onClick event handlers to trigger corresponding functions
        $("#snapEdit").on("click", function () {
                capturePhotoEdit();
            });

        $("#fromLibrary").on("click", function () {
                getPhoto(pictureSource.PHOTOLIBRARY);
            });

        $("#fromAlbum").on("click", function () {
                getPhoto(pictureSource.SAVEDPHOTOALBUM);
            });



        //End of camComp page
    });


//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************


//In App Browser


$("#inAppBrowser").on("pageinit", function () {

        $("#inAppGo").on("click", function () {
                var urlLocal = $("#urlBar").val();
                var ref = window.open(urlLocal, '_blank', 'location=yes');
                ref.addEventListener('loadstart', function () {
                        alert(event.url);
                    });

            });

        //End of inAppBrowser       
    });


//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************

//Notifications

$("#notiComp").on("pageinit", function () {


        $("#notifyNow").on("click", function () {

                navigator.notification.alert('You pushed that button like a champ!');

            });


        // End of Notification Page       
    });