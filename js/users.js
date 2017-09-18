function listenForAdminClicks () {

  $('.js-admin-btn').click( event => {
    event.preventDefault();

    if (event.target.html === 'Login') {
      $('#adminModal .header h2').html('User Login');
    }
    else {
      $('#adminModal .header h2').html('Manage Website');
    }

  });

}
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
    $('.js-admin-btn').html(`Login`);
  }
  else {
    $('.js-admin-btn').html(`Manage Site`);
  }

}
