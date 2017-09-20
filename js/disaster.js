// starts everything by returning disaster record data
function getDisaster (name) {

  // call disaster service
  var qData = {
    method: 'getDisaster',
    name: name
  };
  callDisasterService(qData, loadDisaster);

}
function getDisasterImages () {
  var qData = {
    method: 'getDisasterImages',
    disasterID: disasterID
  }
  callDisasterService(qData, loadDisasterImages);
}

function loadDisaster (data) {

  // update disaster info
  disasterInfo = data;
  disasterID = data[0];
  disasterName = data[1];

  setDisasterTitle();
  getDisasterImages();
  getLocalNewsYouTubeChannels();
  getNationalVideoChannels();
  getAreaReports();
  getAffectedAreas();
  loadMap();
  getNationalOrganizations();

}
function loadDisasterImages (data) {

  $('.js-disaster-images').empty();

  var template = '';

  data.map( (img, index) => {

    if (index === 0) {
      template = `
        <div style="background-image:url(/img/${img}); display:inline-block;"></div>
      `;
    }
    else {
      template = `
        <div style="background-image:url(/img/${img});"></div>
      `;
    }

    $('.js-disaster-images').append(template);

  });

  startImageSlider();

}

function setDisasterTitle () {
  $('h1 header span').html(disasterName);
}
