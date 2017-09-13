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
function loadUserOptions (data) {
  console.log(data);
}
