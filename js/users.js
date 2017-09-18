function setupUserSession () {
  const qData = {
    method:'setupUserSession'
  }
  callUserService(qData, isUserValidated);
}
function isUserValidated (data) {
  const qData = {
    method:'isUserValidated'
  }
  callUserService(qData, loadUserOptions);
}

function loadUserOptions (user) {

  if (user === 0) {
    $('.js-login-btn').show();
    listenForLoginSubmit();
  }
  else {
    $('.js-manage-btn').show();
  }

}

function listenForLoginSubmit () {

  $('#loginSubmitBtn').click( event => {
    event.preventDefault();

    const result = validatLoginData();

    if (result.length === 0) {
      submitLoginData();
    }

    /*const qData = {
      method: 'loginUser',
      email: $('#login_email').val(),
      password: $('#login_password').val()
    }
    callUserService(qData, handleLogin);*/

  });

}
function validatAreaReportData () {

    var error = false;
    var errorMsg = [];

    // empty error msg ul
    $('.loginErrorMsg').empty();

    // validate email
    const emailResult = validateEmail($('#login_email').val());

    if ($('#login_email').val() === '') {
      error = true;
      errorMsg.push('Enter Your Email');
      $('#login_email').addClass('error-field');
    }
    else if ($('#login_email').val().toString().length > 45) {
      error = true;
      errorMsg.push('Your Email is too long.');
      $('#login_email').addClass('error-field');
    }
    else {
      $('#login_email').removeClass('error-field');
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
/*function handleLogin (user) {
  const userValidated = isUserValidated(user);

  if (userValidated === 1) {
    console.log('manage website');
  }
  else {
    $('.loginErrorMsg').append('Login failed, please try again.');
  }

}*/
