function getAllDisasters () {
  var qData = {
    method: 'getAllDisasters'
  };
  callDisasterService(qData, loadAllDisasters);
}
function getDisaster (disasterID) {

  // call disaster service
  var qData = {
    method: 'getDisaster',
    id: disasterID
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

function loadAllDisasters (data) {

  data.map( disaster => {
    $('.js-disaster-names').append(`<option value="${disaster[0]}">${disaster[1]}</option>`);
  });

  fadeMainSelectMenu();

}
function loadDisaster (data) {

  // update disaster info
  disasterInfo = data;
  disasterID = data[0];
  disasterName = data[1];

  listenForDisasterChange();
  getDisasterImages();
  getLocalNewsYouTubeChannels();
  getNationalVideoChannels();
  getAreaReports();
  getAffectedAreas();
  loadMap();
  getNationalOrganizations();

  getFacebookPages();
  updateTwitterWidget();

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

function fadeMainSelectMenu () {
  $('.js-disaster-names').addClass('bgAnimated');
  $('.js-disaster-names').addClass('darkSelectMenu');
}

function listenForDisasterChange () {

  $('.js-disaster-names').change( event => {
    getDisaster($(event.target).val());
  });

}
