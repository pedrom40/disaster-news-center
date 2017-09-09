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
  listenForInstagramClick();

  getDisaster('Hurricane Harvey');

  loadFacebookData();
  loadTwitterWidget();
  loadInstagramContent();

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

    const result = validatAreaReportData();

    if (result.length === 0) {
      submitAreaReportData();
    }

  });
}
function validatAreaReportData () {

  let error = false;
  let errorMsg = [];

  // empty error msg ul
  $('.areaReportErrorMsg').empty();

  // validate name
  if ($('#reported_by').val() === '') {
    error = true;
    errorMsg.push('Enter Your Name');
    $('#reported_by').addClass('error-field');
  }
  else if ($('#reported_by').val().toString().length > 45) {
    error = true;
    errorMsg.push('Your Name is too long.');
    $('#reported_by').addClass('error-field');
  }
  else {
    $('#reported_by').removeClass('error-field');
  }

  // validate location
  if ($('#report_location').val() === '') {
    error = true;
    errorMsg.push('Enter Your Location');
    $('#report_location').addClass('error-field');
  }
  else if ($('#report_location').val().toString().length > 45) {
    error = true;
    errorMsg.push('Location is too long.');
    $('#report_location').addClass('error-field');
  }
  else {
    $('#report_location').removeClass('error-field');
  }

  // validate report
  if ($('#report').val() === '') {
    error = true;
    errorMsg.push('Enter the Report Details');
    $('#report').addClass('error-field');
  }
  else if ($('#report').val().toString().length > 225) {
    error = true;
    errorMsg.push('Report Details is too long.');
    $('#report').addClass('error-field');
  }
  else {
    $('#report').removeClass('error-field');
  }

  // validate spam
  if ($('#spam_check').val() !== '') {
    error = true;
    errorMsg.push('Stop spamming us!');
  }

  // see errors
  if (error) {

    errorMsg.map( msg => {
      const template = `<li>${msg}</li>`;
      $('.areaReportErrorMsg').append(template);
    });

    $('.areaReportErrorMsg').show();

  }
  else {
    $('.areaReportErrorMsg').hide();
  }

  return errorMsg;
}
function submitAreaReportData () {

  const qData = {
    method: 'saveAreaReport',
    disasterId: disasterID,
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
  }
  callDisasterService(qData, areaReportResponse);

}
function areaReportResponse (data) {

  if (data[0] === 'success') {

    // close form
    $('.js-form-close-btn').click();

    // clear form values
    $('#reported_by').val('');
    $('#report_location').val('');
    $('#report').val('');

    // show under review msg
    $('.js-area-report-form-response')
      .removeClass('error')
      .addClass('success')
      .html('Your report has been submitted and is under review. It will appear on the site immediately upon approval.')
      .show();

  }
  else {

    // show error msg
    $('.js-area-report-form-response')
      .removeClass('success')
      .addClass('error')
      .html(`An error occurred during your report submission: ${data[1]}<p>The tech guys have been notified and will address is immediately. Do not resubmit your report, your data has been saved.</p>`)
      .show();

  }

  // fade out the msg
  $('.js-area-report-form-response').delay(10000).fadeOut(3000);

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
