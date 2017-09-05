'use strict';

// init disaster vars
let disasterInfo = [];
let disasterID = 0;
let disasterName = '';

let map;

// local help information
const localHelpInformation = [
  {
    type:'person',
    name:'Jack Dawson',
    address:'1234 Main st.',
    city:'Rockport',
    state:'TX',
    zip:'88888',
    phone:'888.888.8888',
    email:'person@contactme.com',
    message:'Contact for food donations'
  }
];

// national organizations
const nationalOrganizations = [
  {
    name:'',
    logo:'./img/',
    link:''
  },
  {
    name:'',
    logo:'./img/',
    link:''
  },
  {
    name:'',
    logo:'./img/',
    link:''
  },
  {
    name:'',
    logo:'./img/',
    link:''
  },
  {
    name:'',
    logo:'./img/',
    link:''
  }
];


// call all function
function initApp () {

  listenForMenuToggle();
  listenForPreviewClicks();

  getDisaster('Hurricane Harvey');

  loadFacebookData();

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

  // start fresh
  $('.js-area-reports').empty();

  // if no reports
  if (data.length === 0) {

    // enter message asking for reports
    $('.js-area-reports').html(`
      <p>
        If you are within the area of this event and are able to safely do so,
        please <a href="#" class="js-submit-report-btn"><strong>submit a report</strong></a> to let us
        know what is going on and/or how we can help.
      </p>
    `);

  }

  else {

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

  $('.area-list').empty();

  data.map( area => {

    $('.area-list').append(`<li>${area[0]} &gt; <em>${area[1]}</em></li>`);

  });

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

function showAjaxError (data) {

  console.log(data);

}

$(initApp)
