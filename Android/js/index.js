/*
 AVF 1305
 Joanthan Wade
 */
var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
onDeviceReady: function() {
    app.receivedEvent('deviceready');
},
    // Update DOM on a Received Event
receivedEvent: function(id) {
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
 
 
 $("#twitSearch").on( "change", function() {
 
 $("#twitData").empty();
  
  var searchTerm =  $("#twitSearch").val();
  
  
		  $.getJSON("http://search.twitter.com/search.json?q='" + searchTerm + "'&rpp=8&include_entities=true&callback=?", function(data) {
		  			
		            console.log(data);
		            //alert("Call is working");
		            for (i=0, j=data.results.length; i<j; i++) {
		            var gridAlpha = ['ui-block-a','ui-block-b','ui-block-c', 'ui-block-d','ui-block-a','ui-block-b','ui-block-c', 'ui-block-d'];
		            
		            
		            $("<div class='" + gridAlpha[i] + "'>" +
		              "<div class='ui-bar ui-bar-c' style='height:200px'>" +
		              "<img src='" + data.results[i].profile_image_url + "'id='twitPic'class='textWrap' />" +
		              "<p>"  + data.results[i].text + "<i>" + data.results[i].created_at + "</i>" + "</p>" +
		              "<h3>@" + data.results[i].from_user + "</h3>" +
		              "</div>").appendTo( $("#twitData"));
		            
		            }
		            
		            $("#twitData").listview("refresh");
            });
});



//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************


// Bandsintown API


$("#localShows").on( "change", function() {
 
 $("#eventData").empty();

  
  var bandSearch =  $("#localShows").val();
  
  			console.log(bandSearch);
		  $.getJSON("http://api.bandsintown.com/artists/" + bandSearch + "/events.json?api_version=2.0&app_id=AVF_1305_assignment&callback=?", function(data) {
		  			
		            console.log(data);
		            console.log(data);
		            for (i=0, j=data.length; i<j; i++) {
		           
		            
		            
		            $("<div class='eventStyle'>" +
		              "<div class='ui-bar ui-bar-c' style='height:220px'>" +
		              "<img src='" + data[i].artists[0].image_url + "'id='bandPic' />" +
		              "<h1>" + data[i].title + "</h1>" +
		              "<p>"  + data[i].formatted_datetime + " :: " + data[i].formatted_location + "</p>" +
		              "<p>Ticket Status: " + data[i].ticket_status + "</p>" +
		              "<a href='" + data[i].ticket_url + "'data-role='button' data-inline='true' data-theme='b'>Get Tickets</a>" +
		              "</div>").appendTo( $("#eventData"));
		            
		            }
		            
		            $("#eventData").listview("refresh");
            });
});



// Geolocation 

$("#geoComp").on("pageinit", function(){

var options = { enableHighAccuracy: true };


$("#findMe").on("click", function(){
     
     $("#mapView").empty();
                                         	
 	var onSuccess = function(position) {
 	
 		var latitude = position.coords.latitude,
 			longitude = position.coords.longitude;
 			
 		
 		$('<img src="http://maps.googleapis.com/maps/api/staticmap?size=400x400&markers=color:blue%7Clabel:!%7C' + latitude + ',' + longitude +'&maptype=hybrid&sensor=true" />').appendTo($("#mapView"));
 			
 	
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}



navigator.geolocation.getCurrentPosition(onSuccess, onError, options);



});

       
});


//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************

// Camera


$("#camComp").on("pageinit", function(){


 	var pictureSource;   
    var destinationType; 


   
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
   

  
    function onPhotoURISuccess(imageURI) {
      

      // Set image element id
     
      var largeImage = document.getElementById('largeImage');

      // Dislay image html elements
      
      largeImage.style.display = 'block';

      // Show photo
 
      largeImage.src = imageURI;
      
      
      
    }

    
    function capturePhoto() {

      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

 
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.FILE_URI });
    }


    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }


    function onFail(message) {
      // No Fail message by design
    }




$("#snapEdit").on("click", function(){
     capturePhotoEdit();
});

$("#fromLibrary").on("click", function(){
    getPhoto(pictureSource.PHOTOLIBRARY);   
});

$("#fromAlbum").on("click", function(){
    getPhoto(pictureSource.SAVEDPHOTOALBUM);  
});



//End of camComp page
});


//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************


//In App Browser


$("#inAppBrowser").on("pageinit", function(){
	
	$("#inAppGo").on("click", function(){
		var urlLocal = $("#urlBar").val();
		var ref = window.open( urlLocal, '_blank', 'location=yes');
		ref.addEventListener('loadstart', function() { alert(event.url); });
        
});

//End of inAppBrowser       
});


//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************

//Notifications

$("#notiComp").on("pageinit", function(){
       
   
 $("#notifyNow").on("click", function(){
       
	           navigator.notification.alert('You pushed that button like a champ!');
	           
    }); 
    
       
// End of Notification Page       
});