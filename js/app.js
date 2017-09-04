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

// affected areas
const afffectedAreas = [
  {
    location:'Corpus Christi, TX',
    estPopulation:300000,
    center:{lat:27.8003, lng:-97.3956}
  },
  {
    location:'Rockport, TX',
    estPopulation:150000,
    center:{lat:28.0206, lng:-97.0544}
  },
  {
    location:'Aransas Pass, TX',
    estPopulation:80000,
    center:{lat:27.9095, lng:-97.15}
  },
  {
    location:'Port Aransas, TX',
    estPopulation:80000,
    center:{lat:27.8332, lng:-97.0618}
  },
  {
    location:'Houston, TX',
    estPopulation:1000000,
    center:{lat:29.7589, lng:-95.3677}
  }
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

  // get public uploads
  getPublicVideos();

  // listen for preview clicks
  listenForPreviewClicks();

  // get area reports
  getAreaReports();

  // load affected areas list
  loadAffectedAreasList();

  // get social media feed
  loadFacebookData();

  // get local help info
  getLocalHelpInfo();

  // get national organizations
  getNationalOrganizations();

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
      </p>
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


// load affected areas list
function loadAffectedAreasList () {

  $('.area-list').empty();

  afffectedAreas.map( area => {

    $('.area-list').append(`<li>${area.location} &gt; <em>${area.estPopulation}</em></li>`);

  });

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

// show ajax error
function showAjaxError (data) {

  console.log(data);

}

$(initApp)
