var infowindow, map, markers = [];

$(function() {
  $('#search').on('keyup', function(e) {
    if (e.which === 13) {
      console.log('enter');
      search($('#search')[0].value)
    }
  });
  initialize();
});

function initialize() {
  var waterloo = new google.maps.LatLng(43.4723,-80.5449);

  map = new google.maps.Map($('#map')[0], {
    center: waterloo,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infowindow.setPosition(pos);
      infowindow.setContent('You are here!');
      infowindow.open(map);
      console.log('located');
      map.setCenter(pos);
      var marker = new google.maps.Marker({
        map: map,
        position: pos,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#3577f6',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          scale: 7
        }
      })
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var autocomplete = new google.maps.places.Autocomplete($('#search')[0], {
    bounds: map.getBounds()
  });

  autocomplete.bindTo('bounds', map);

  autocomplete.addListener('place_changed', function() {
    console.log('places changed!');
    search($('#search')[0].value);
  })

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function search(query) {
  console.log(query);
  var waterloo = new google.maps.LatLng(43.4723,-80.5449);
  var request = {
    //location: waterloo,
    //radius: '500',
    bounds: map.getBounds(),
    query: query
  };

  // Clear out the old markers.
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(results[i]);
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
