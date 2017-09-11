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
  if (data.length !== 0) {

    // loop thru reports
    data.map( (report, index) => {

      // set containter class
      let containterClassName = 'area-report-container';
      if (data.length === 1) {
        containterClassName = 'area-report-container-1';
      }
      else if (data.length === 2) {
        containterClassName = 'area-report-container-2';
      }

      else if (data.length === 3) {
        containterClassName = 'area-report-container-3';
      }

      // setup date and time display
      const reportDate = new Date(report[0]);
      const dateString = setupDateString(reportDate);
      const timeString = setupTimeString(reportDate);

      const template = `
        <div class="${containterClassName}">
          <div class="date">${dateString} @ ${timeString}</div>
          <div class="report">${report[1]}</div>
          <div class="reporter">${report[2]}</div>
          <div class="location">${report[3]}</div>
        </div>
      `;

      $('.js-area-reports').append(template);

    });

  }

  else {

    $('.js-area-reports').html(`
      <p>
        If you are within the area of this event and are able to safely do so,
        please <a href="#" class="js-submit-report-btn"><strong>submit a report</strong></a> to let us
        know what is going on and/or how we can help.
      </p>
    `);

  }

}

function listenForReportSubmissionClicks () {

  $('.js-submit-report-btn').click( event => {

    // show and scroll to form
    $('.area-report-form').toggle(function () {
      $('html, body').animate({
        scrollTop: $('.area-report-form').offset().top
      }, 2000);
    });

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

  $('.js-area-reports').click( event => {

    if ($(event.target).html() === 'submit a report'); {
      $('.area-report-form').toggle();
    }

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
