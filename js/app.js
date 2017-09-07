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

function getAreaReports () {

  // call getAreaReports service
  let qData = {
    method:'getAreaReports',
    disasterID: disasterID
  };
  callDisasterService(qData, listAreaReports);

}
function listAreaReports (data) {

  // if no reports
  if (data.length !== 0) {

    // start fresh
    $('.js-area-reports').empty();

    // loop thru reports
    data.map( report => {

      const template = `
        <div class="date">${report[0]}</div>
        <div class="report">${report[1]}</div>
        <div class="reporter">- ${report[2]}</div>
      `;

      $('.js-area-reports').append(template);

    });

  }

}

function getAffectedAreas () {

  // call getAreaReports service
  let qData = {
    method:'getAffectedAreas',
    disasterID: disasterID
  };
  callDisasterService(qData, listAffectedAreasList);

}
function listAffectedAreasList (data) {

  // start with empty list
  $('.area-list').empty();

  // var to calculate total population
  let totalPop = 0;

  data.map( area => {

    $('.area-list').append(`<li>${area[0]}</li>`);

    totalPop += area[1];

  });

  // update populate count
  $('.js-potential-population-impacted').html(`<em>Potential Population Impact:</em> ${totalPop}`);

}

function getLocalHelpInfo () {

  let qData = {
    method:'getLocalHelpInfo',
    disasterID: disasterID
  }
  callDisasterService(qData, listLocalHelpInfo);

}
function listLocalHelpInfo (data) {

  // start fresh
  $('.js-local-help').empty();

  // loop thru reports
  data.map( contact => {

    const template = `
      <div class="name">${contact[1]}</div>
      <div class="address">
        ${contact[2]}<br>
        ${contact[3]}, ${contact[4]} ${contact[5]}
      </div>
      <div class="phone"><a href="tel:${contact[6]}">${contact[6]}</a></div>
      <div class="email"><a href="mailto:${contact[7]}">${contact[7]}</a></div>
      <div class="message"><em>Message:</em> ${contact[8]}</div>
    `;

    $('.js-local-help').append(template);

  });

}

function getNationalOrganizations () {

  let qData = {
    method:'getNationalOrganizations',
    disasterID: disasterID
  }
  callDisasterService(qData, listNationalOrganizations)

}
function listNationalOrganizations (data) {

  // start fresh
  $('.js-national-help').empty();

  // loop thru reports
  data.map( org => {

    const template = `
      <a href="${org[2]}" target="_blank">
        <div class="logo"><img src="/img/${org[1]}" alt="${org[0]} Logo"></div>
      </a>
    `;

    $('.js-national-help').append(template);

  });

}

function listenForMenuToggle () {

  $('.js-nav-toggle').click( event => {

    // show nav
    $('.nav').toggle();

    // remove bars
    $('.js-nav-toggle i').toggleClass('fa-bars fa-times');

  });

}
function listenForReportSubmissionClicks () {

  $('.js-submit-report-btn').click( event => {

    // show form
    $('.area-report-form').toggle();

    // get user info
    callUserInfoService(fillUserData);

  });

}
function fillUserData (data) {

  $('#user_ip_address').val(data.ip_address);
  $('#user_city').val(data.city);
  $('#user_state').val(data.region);
  $('#user_county').val(data.county);
  $('#user_country').val(data.country);
  $('#user_lat').val(data.latitude);
  $('#user_lon').val(data.longitude);
  $('#user_timezone').val(data.timezone);

}
function listenForCloseReportFormClicks () {
  $('.js-form-close-btn').click( event => {
    $('.area-report-form').toggle();
  });
}
function listenForReportSubmissions () {
  $('#areaReportSubmitBtn').click( event => {

    submitAreaReportData();

  });
}
function submitAreaReportData () {

  const formKeys = [
    [
      {
        field:'reported_by',
        type: 'text',
        maxLength: 45,
        required: true
      }
    ],
    [
      {
        field:'report_location',
        type: 'text',
        maxLength: 45,
        required: true
      }
    ],
    [
      {
        field:'report',
        type: 'text',
        maxLength: 225,
        required: true
      }
    ],
    [
      {
        field:'spam_check',
        type: 'hidden',
        maxLength: 225,
        required: true
      }
    ]
  ];

  validateFormData(formKeys);


  /*if ($('#spam_check').val() === '') {

    const qData = {
      method: 'saveAreaReport',
      disasterID: disasterID,
      reportedBy: $('#reported_by').val(),
      reportLocation: $('#report_location').val(),
      report: $('#report').val(),
      userIpAddress: $('#user_ip_address').val(),
      userCity: $('#user_city').val(),
      userState: $('#user_state').val(),
      userCounty: $('#user_county').val(),
      userCountry: $('#user_country').val(),
      userLat: $('#user_lat').val(),
      userLon: $('#user_lon').val(),
      userTimezone: $('#user_timezone').val()
    };

    callDisasterService(qData, areaReportResponse);

  }
  else {

    $('.js-area-report-form-response').html(`
      <p class="error">You're spamming us, stop it!</p>
    `);

  }*/

}
function areaReportResponse (data) {
  console.log(data);
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

function callDisasterService (data, callback) {

  const settings = {
    url: '/cfcs/disaster.cfc',
    data: data,
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  }

  $.ajax(settings);

}
function callUserInfoService (callback) {

  const settings = {
    url:'//ipfind.co/me',
    data:{
      auth:'24b87b97-a038-4552-90ad-a6f02489b5a2'
    },
    dataType:'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  }
  $.ajax(settings);

}

function showAjaxError (data) {

  console.log(data);

}

$(initApp)
