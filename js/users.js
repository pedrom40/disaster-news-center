function setupUserSession () {
  var qData = {
    method:'setupUserSession'
  }
  callUserService(qData, isUserValidated);
}
function isUserValidated (data) {
  var qData = {
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

    var result = validatLoginData();

    if (result.length === 0) {
      submitLoginData();
    }

    /*var qData = {
      method: 'loginUser',
      email: $('#login_email').val(),
      password: $('#login_password').val()
    }
    callUserService(qData, handleLogin);*/

  });

}
/*function handleLogin (user) {
  var userValidated = isUserValidated(user);

  if (userValidated === 1) {
    console.log('manage website');
  }
  else {
    $('.loginErrorMsg').append('Login failed, please try again.');
  }

}*/
