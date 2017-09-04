// load map
function loadMap () {

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat:28.0206, lng:-97.0544}
  });

  loadMarkers(map);

}

// load map markers
function loadMarkers (map) {

  afffectedAreas.map( area => {

    let marker = new google.maps.Marker({
      position: area.center,
      map: map,
      title:area.location
    });

  });

}
