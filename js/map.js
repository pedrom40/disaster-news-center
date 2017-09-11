function loadMap () {
  getMapCenter();
}

function getMapCenter () {

  var qData = {
    method:'getMapCenter',
    disasterID: disasterID
  };
  callDisasterService(qData, setMapCenter);

}

function setMapCenter (data) {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat:data[0], lng:data[1]}
  });

  getAffectedAreaCoordinates();

}

function getAffectedAreaCoordinates () {

  var qData = {
    method:'getAffectedAreaCoordinates',
    disasterID: disasterID
  };
  callDisasterService(qData, loadMarkers);

}

function loadMarkers (data) {

  data.map( area => {

    var marker = new google.maps.Marker({
      position: {lat: area[0], lng: area[1]},
      map: map,
      title:area[2]
    });

  });

}
