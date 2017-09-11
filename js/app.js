'use strict';

// init disaster vars
let disasterInfo = [];
let disasterID = 0;
let disasterName = '';
let map;


// call all function
function initApp () {

  listenForMenuToggle();
  listenForPreviewClicks();
  listenForReportSubmissionClicks();
  listenForCloseReportFormClicks();
  listenForReportSubmissions();
  listenForExpandRowClicks();

  getDisaster('Hurricane Harvey');

  loadFacebookData();
  loadTwitterWidget();

  // set timers to recall these functions every 3 minutes
  const getAreaReportsTimer = setInterval(getAreaReports, 180000);
  const getFacebookPagesTimer = setInterval(getFacebookPages, 180000);

}

// starts everything by returning disaster record data
function getDisaster (name) {

  // call disaster service
  let qData = {
    method: 'getDisaster',
    name: name
  }
  callDisasterService(qData, loadDisaster);

}

function loadDisaster (data) {

  // update disaster info
  disasterInfo = data;
  disasterID = data[0];
  disasterName = data[1];

  setDisasterTitle();
  getLocalNewsYouTubeChannels();
  getNationalVideoChannels();
  getPublicVideos();
  getAreaReports();
  getAffectedAreas();
  loadMap();
  getLocalHelpInfo();
  getNationalOrganizations();

}

function setDisasterTitle () {
  $('h1 header span').html(disasterName);
}

function listenForMenuToggle () {

  $('.js-nav-toggle').click( event => {

    // show nav
    $('.nav').toggle();

    // remove bars
    $('.js-nav-toggle i').toggleClass('fa-bars fa-times');

  });

}

function listenForExpandRowClicks () {

  $('.js-expand-btn').click( event => {

    if (event.target.text.search('Expand') !== -1) {

      $('.social-media-feed').css('height', '2000px');
      $('#twitter-widget-0').css('height', '2000px');

      $(event.target).html('<i class="fa fa-angle-up" aria-hidden="true"></i> Collapse Row <i class="fa fa-angle-up" aria-hidden="true"></i>');

    }
    else {

      $('.social-media-feed').css('height', '625px');
      $('#twitter-widget-0').css('height', '625px');

      $(event.target).html('<i class="fa fa-angle-down" aria-hidden="true"></i> Expand Row <i class="fa fa-angle-down" aria-hidden="true"></i>');

    }

  });

}

$(initApp)
