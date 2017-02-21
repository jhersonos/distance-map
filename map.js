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
          alert("ta bueno");
        }
        console.log(result)
      });
}
function openInfoWindow(marker) {
    var markerLatLng = marker.getPosition();
    var destino = markerLatLng.lat() +"," + markerLatLng.lng();
    document.getElementById('origin').value = destino; 
    infoWindow.setContent([
        'La posicion del marcador es: ',
        markerLatLng.lat(),
        ', ',
        markerLatLng.lng(),
        'Arrastrame y haz click para actualizar la posicion '
    ].join(''));
    infoWindow.open(map, marker);
}
function openInfoWindow2(marker) {
    var markerLatLng = marker.getPosition();
    var destino = markerLatLng.lat() +"," + markerLatLng.lng();
    document.getElementById('destiny').value = destino; 
    infoWindow.setContent([
        'La posicion del marcador es: ',
        markerLatLng.lat(),
        ', ',
        markerLatLng.lng(),
        'Arrastrame y haz click para actualizar la posicion '
    ].join(''));
    infoWindow.open(map, marker);
}
/************************************************/
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: -12.114194, lng: -77.044559}
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