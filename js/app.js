'use script';

// init disaster vars
var disasterInfo = [];
var disasterID = 0;
var disasterName = '';
var map;


// call all function
function initApp () {

  setupUserSession();
  listenForMenuToggle();
  listenForPreviewClicks();
  listenForReportSubmissions();
  listenForExpandRowClicks();

  getDisaster(1);
  getAllDisasters();

  loadFacebookData();
  loadHarveyTwitterWidget();

  // set timers to recall these functions every 3 minutes
  //var getAreaReportsTimer = setInterval(getAreaReports, 180000);

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
    event.preventDefault();

    if (event.target.text.search('Expand') !== -1) {

      $('.social-media-feed').css('height', '1450px');
      $('#twitter-widget-0').css('height', '1450px');

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
