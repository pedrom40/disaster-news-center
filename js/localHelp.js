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

    // setup address
    let addressLine = '';
    if (contact[2] !== '') {
      addressLine = `${contact[2]}<br>`;
    }

    // setup city
    let cityLine = '';
    if (contact[3] !== '') {
      cityLine = `${contact[3]}, ${contact[4]}`;
    }

    // setup email
    let emailInfo = '';
    if (contact[7] !== '') {
      emailInfo = `<div class="email"><a href="mailto:${contact[7]}">${contact[7]}</a></div>`;
    }

    // setup link
    let linkInfo = '';
    if (contact[8] !== '') {
      linkInfo = `<div class="link"><a href="${contact[8]}" target="_blank">Go to Site <i class="fa fa-external-link" aria-hidden="true"></i></a></div>`;
    }

    const template = `
      <div class="name">${contact[1]}</div>
      <div class="address">
        ${addressLine}
        ${cityLine} ${contact[5]}
      </div>
      <div class="phone"><a href="tel:+1${contact[6]}">${contact[6]}</a></div>
      ${emailInfo}
      ${linkInfo}
      <div class="message">${contact[9]}</div>
    `;

    $('.js-local-help').append(template);

  });

}
