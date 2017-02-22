var marker;
var marker2;
/*****info -***************/
function getdistance(){
  var start=document.getElementById('origin').value;
  var end=document.getElementById('destiny').value;
  var directionsService = new google.maps.DirectionsService();
      var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
      };
    
      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          console.log("ta bueno");
        }
        console.log(result)
        document.getElementById('distancia').value=result.routes[0].legs[0].distance.text;
      });
}
function openInfoWindow(marker) {
    var markerLatLng = marker.getPosition();
    var destino = markerLatLng.lat() +"," + markerLatLng.lng();
    document.getElementById('origin').value = destino; 
    infoWindow.setContent([
        'Arrastrame y haz click para actualizar la posicion '
    ].join(''));
    infoWindow.open(map, marker);
}
function openInfoWindow2(marker) {
    var markerLatLng = marker.getPosition();
    var destino = markerLatLng.lat() +"," + markerLatLng.lng();
    document.getElementById('destiny').value = destino; 
    infoWindow.setContent([
        'Arrastrame y haz click para actualizar la posicion '
    ].join(''));
    infoWindow.open(map, marker);
}
/************************************************/
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: -12.114194, lng: -77.044559}
  });

/****/
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  var markers = [];
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });

     var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
/***calculate distance ***/

var directionsService = new google.maps.DirectionsService();
      var start=new google.maps.LatLng(-12.114194,-77.044559);
      var end=new google.maps.LatLng(-12.200890,-76.986314);
    
      var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
      };
    
      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          //alert("todo bien");
        }
        console.log(result)
      });
/*****/
  infoWindow = new google.maps.InfoWindow();
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {lat: -12.114194, lng: -77.044559}
  });

  marker2 = new google.maps.Marker({
   position: {lat: -12.114173, lng:  -77.044653}, 
   animation:google.maps.Animation.DROP,
   draggable: true
   });
  marker2.setMap(map);
  marker.addListener('click',function(){
    openInfoWindow(marker);
  })
  marker2.addListener('click',function(){
    openInfoWindow2(marker2);
  })
  marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
  marker2.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
}
  // marker.addListener('click', toggleBounce);
////
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
   // setTimeout(marker.setAnimation(google.maps.Animation.DROP),500);
  }

}



// var p1 = new google.maps.LatLng(45.463688, 9.18814);
// var p2 = new google.maps.LatLng(46.0438317, 9.75936230000002);


// //calculates distance between two points in km's
// function calcDistance(p1, p2) {
// return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
// }
// alert(calcDistance(p1, p2));