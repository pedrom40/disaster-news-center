'use strict';

// main theme
const disaster = 'Hurricane Harvey';

// local news video sources (ch. 3, ch. 6, ch. 10)
const localNewsYouTubeChannelIds = ['UCPjgzQgWuPsrYDSuP_CENOw', 'UCvM_k1scQ1YU50HiQc-4xyg', 'UCPXLf8gz8WzzdgidGmXWBtg'];

// national new sources (abc, nbc, cbs)
const nationalNewsYouTubeChannelIds = ['UCBi2mrWuNuyYy4gbM6fU18Q', 'UCeY0bbntWzzVIaj2z3QigXg', 'UC8p1vwvWtl6T73JiExfWs1g'];

// get area reports
const areaReports = [
  /*{
    dateReported: '09/01/2017',
    report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu mi sit amet tellus tempus sagittis. Donec eget turpis aliquam, tincidunt tellus imperdiet, auctor quam.',
    reportedBy: 'Jane Doe'
  },
  {
    dateReported: '09/01/2017',
    report: 'Suspendisse maximus risus ut rhoncus ultricies. Duis placerat accumsan lobortis. Vestibulum imperdiet consectetur venenatis.',
    reportedBy: 'John Roe'
  },
  {
    dateReported: '08/31/2017',
    report: 'Curabitur posuere nunc molestie magna fermentum venenatis. Sed pulvinar arcu nec neque tristique dictum.',
    reportedBy: 'Joe Bloe'
  }*/
];

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
  },
  {
    type:'center',
    name:'Ronald McDonald House',
    address:'1234 Main st.',
    city:'Corpus Christi',
    state:'TX',
    zip:'88888',
    phone:'888.888.8888',
    email:'person@contactme.com',
    message:'We will donate any clothes you bring to Hurricane Harvey survivors'
  },
  {
    type:'person',
    name:'Marky Mark',
    address:'1234 Main st.',
    city:'Aransas Pass',
    state:'TX',
    zip:'88888',
    phone:'888.888.8888',
    email:'person@contactme.com',
    message:'I can help with clearing debris from your home.'
  }
];

// national organizations
const nationalOrganizations = [
  {
    name:'American Red Cross',
    logo:'./img/national-organization-logo-redcross.png',
    link:'https://www.redcross.org/donate/donation'
  },
  {
    name:'The Salvation Army',
    logo:'./img/national-organization-logo-salvation-army.png',
    link:'https://give.salvationarmyusa.org/site/Donation2?df_id=27651&amp;mfc_pref=T&amp;27651.donation=form1'
  },
  {
    name:'Catholic Charities USA',
    logo:'./img/national-organization-logo-catholic-charities-usa.png',
    link:'https://app.mobilecause.com/public/peer_fundraisers/375237/peer_fundraiser_donations/new'
  },
  {
    name:'The Humane Society',
    logo:'./img/national-organization-logo-humane-society.svg',
    link:'https://secure.humanesociety.org/site/Donation2?df_id=23944&amp;23944.donation=form1&amp;s_src=ad_bing_search_brand_hurricaneharvey_082917%7Cweb_hpbb_083017_d_id93480558'
  },
  {
    name:'Donors Choose',
    logo:'./img/national-organization-logo-donors-choose.png',
    link:'https://www.donorschoose.org/hurricane-harvey'
  }
];


// call all function
function initApp () {

  // set banner
  setTitles();

  // menu listener
  listenForMenuToggle();

  // get local videos
  localNewsYouTubeChannelIds.map( (source, index) => {

    // take the first local video for featured video
    if (index === 0) {
      getMainVideo(source, disaster);
    }

    // load the local results
    getLocalNewsVideoFromSource(source, disaster);

  });

  // get National videos
  nationalNewsYouTubeChannelIds.map( source => {
    getNationalNewsVideoFromSource(source, disaster);
  });

  // listen for preview clicks
  listenForPreviewClicks();

  // get area reports
  getAreaReports();

  // get social media feed

  // load map
  loadMap();

  // get local help info
  getLocalHelpInfo();

  // get national organizations
  getNationalOrganizations();

}

// set disaster name in banner
function setTitles () {

  const completeTitle = `${disaster} News Center`;

  $('title').html(completeTitle);
  $('h1 header').html(completeTitle);

}

// handle menu toggle
function listenForMenuToggle () {

  $('.js-nav-toggle').click( event => {

    // show nav
    $('.nav').toggle();

    // remove bars
    $('.js-nav-toggle i').toggleClass('fa-bars fa-times');

  });

}

// process thumbnail clicks, set as main video
function listenForPreviewClicks () {

  $('.video-list').click( event => {
    event.preventDefault();

    // get a tag info
    const anchorClicked = $(event.target).closest('a');

    // call video api
    callYouTubeVideoAPI(anchorClicked[0].attributes.videoID.value, updateMainVideoFromAnchorClick);

  });

}

// reset main video content from anchor link
function updateMainVideoFromAnchorClick (videoObj) {

  // reset html to start fresh
  $('.js-main-video').empty();

  // set template
  const template = `
    <div class="iframe-container">
      <iframe width="320" height="180" title="Featured Video" src="https://www.youtube.com/embed/${videoObj.items[0].id}" frameborder="0" class="js-main-video-iframe" allowfullscreen></iframe>
    </div>
    <h3>${videoObj.items[0].snippet.title}</h3>
    <p>${videoObj.items[0].snippet.description}</p>
  `;

  $('.js-main-video').append(template);

  // scroll to top of page
  $(window).scrollTop(0);

}

// set main video
function getMainVideo (source, q) {
  callYouTubeSearchAPI(source, q, setMainVideo);
}

// get local news source most recent video
function getLocalNewsVideoFromSource (source, q) {
  callYouTubeSearchAPI(source, q, listLocalVideos);
}

// get national news source most recent video
function getNationalNewsVideoFromSource (source, q) {
  callYouTubeSearchAPI(source, q, listNationalVideos);
}

// get area reports
function getAreaReports () {

  // call getAreaReports service

  // start fresh
  $('.js-area-reports').empty();

  // if no reports
  if (areaReports.length === 0) {

    // enter message asking for reports
    $('.js-area-reports').html(`
      <p>
        If you are within the area of ${disaster} and are able to safely do so,
        please <a href="#" class="js-submit-report-btn"><strong>submit a report</strong></a> to let us
        know what is going on and/or how we can help.
      </p><br>
    `);

  }

  else {

    // loop thru reports
    areaReports.map( report => {

      const template = `
        <div class="date">${report.dateReported}</div>
        <div class="report">${report.report}</div>
        <div class="reporter">- ${report.reportedBy}</div>
      `;

      $('.js-area-reports').append(template);

    });

  }

}

// get local help info
function getLocalHelpInfo () {

  // call to service

  // start fresh
  $('.js-local-help').empty();

  // loop thru reports
  localHelpInformation.map( contact => {

    const template = `
      <div class="name">${contact.name}</div>
      <div class="address">
        ${contact.address}<br>
        ${contact.city}, ${contact.state} ${contact.zip}
      </div>
      <div class="phone"><a href="tel:${contact.phone}">${contact.phone}</a></div>
      <div class="email"><a href="mailto:${contact.email}">${contact.email}</a></div>
      <div class="message"><em>Message:</em> ${contact.message}</div>
    `;

    $('.js-local-help').append(template);

  });

}

// get national organization info
function getNationalOrganizations () {

  // call to service

  // start fresh
  $('.js-national-help').empty();

  // loop thru reports
  nationalOrganizations.map( org => {

    const template = `
      <a href="${org.link}" target="_blank">
        <div class="logo"><img src="${org.logo}" alt="${org.name} Logo"></div>
      </a>
    `;

    $('.js-national-help').append(template);

  });

}

// set main video
function setMainVideo (data) {

  // reset html
  $('.js-main-video').empty();

  // set template
  const template = `
    <div class="iframe-container">
      <iframe width="320" height="180" title="Featured Video" src="https://www.youtube.com/embed/${data.items[0].id.videoId}" frameborder="0" class="js-main-video-iframe" allowfullscreen></iframe>
    </div>
    <h3>${data.items[0].snippet.title}</h3>
    <p>${data.items[0].snippet.description}</p>
  `;

  $('.js-main-video').append(template);

}

// list video from source
function listLocalVideos (data) {

  // start fresh
  //$('.js-local-news-video-list').empty();

  // if an error occurred
  if (typeof textStatus !== 'undefined') {

    // let user know
    showAjaxError('.js-local-news-video-list', textStatus);

  }

  // if no results returned
  else if (data.items.length === 0) {

    // let user know
    $('.js-local-news-video-list').append('Sorry, no results found for your search. Please try again.');

  }

  // if results found
  else {

    // loop thru data to create most viewed ul li's
    data.items.map( (item, index) => {

      // setup li html with data
      const template = `
        <li>
          <a href="#" videoID="${item.id.videoId}" class="js-preview-btn">
            <div class="thumb left-side">
              <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title} image">
            </div>
            <div class="description right-side">
              ${trimString(item.snippet.title.toString(), 49)}
            </div>
            <div class="source">
              <a href="#">More from ${item.snippet.channelTitle}</a>
            </div>
          </a>
        </li>
      `;

      // append li to ul
      $('.js-local-news-video-list').append(template);

    });

  }

}

// list video from source
function listNationalVideos (data) {

  // start fresh
  //$('.js-national-news-video-list').empty();

  // if an error occurred
  if (typeof textStatus !== 'undefined') {

    // let user know
    showAjaxError('.js-national-news-video-list', textStatus);

  }

  // if no results returned
  else if (data.items.length === 0) {

    // let user know
    $('.js-national-news-video-list').append('Sorry, no results found for your search. Please try again.');

  }

  // if results found
  else {

    // loop thru data to create most viewed ul li's
    data.items.map( (item, index) => {

      // setup li html with data
      const template = `
        <li>
          <a href="#" videoID="${item.id.videoId}" class="js-preview-btn">
            <div class="thumb left-side">
              <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title} image">
            </div>
            <div class="description right-side">
              ${trimString(item.snippet.title.toString(), 49)}
            </div>
            <div class="source">
              <a href="#">More from ${item.snippet.channelTitle}</a>
            </div>
          </a>
        </li>
      `;

      // append li to ul
      $('.js-national-news-video-list').append(template);

    });

  }

}

// load map
function loadMap () {

  // init map
  mapboxgl.accessToken = 'pk.eyJ1IjoicGVkcm9tNDAiLCJhIjoiY2o3M3dzMnJlMGs0eDJxcXhydWt4dHp1biJ9.FqOCLgRnuK09MLB9GECjSA';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-97.0510329439435, 28.0462271591852], // starting position
    zoom: 9
  });

  // load zones
  loadMapZones(map);

}

// load map zones
function loadMapZones (map) {

  // call service to get zones
  const dangerZones = [
    {

    }
  ];

  // draw zones
  map.on('load', function () {

    map.addLayer({
      'id': 'maine',
      'type': 'fill',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [-97.36348, 27.647911],
                [-97.37962, 27.666773],
                [-97.35618, 27.65458],
                [-97.338646, 27.666817]
              ]
            ]
          }
        }
      },
      'layout': {},
      'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
      }
    });

  });

}

// calls youtube search API with search term and credentials
function callYouTubeSearchAPI (channelID, q, callback) {

  // set API call parameters
  const settings = {
    url: 'https://www.googleapis.com/youtube/v3/search/',
    data: {
      part: 'snippet',
      key: 'AIzaSyBAPx_IKzkO0KLZ9TOGGcLTUixNZmFRiX4',
      channelId: channelID,
      q: q,
      type: 'video',
      order: 'date',
      maxResults: 1
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  };

  $.ajax(settings);

}

// calls youtube video search by video ID
function callYouTubeVideoAPI (videoID, callback) {

  // set API call parameters
  const settings = {
    url: 'https://www.googleapis.com/youtube/v3/videos',
    data: {
      part: 'snippet,contentDetails,statistics',
      key: 'AIzaSyBAPx_IKzkO0KLZ9TOGGcLTUixNZmFRiX4',
      id: videoID
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    fail: showAjaxError
  };

  $.ajax(settings);

}

// show ajax error
function showAjaxError (data) {

  console.log(data);

}

// trim the video description for preview lists
function trimString (str, trimAt) {
  return `${str.substring(0, trimAt)}...`;
}

$(initApp)
