// trim the video description for preview lists
function trimString (str, trimAt) {
  return `${str.substring(0, trimAt)}...`;
}

function validateFormData (formKeys) {

  /*[
      [
        {
          field:'reported_by',
          type: 'text',
          maxLength: 45,
          required: true
        }
      ],
      [
        {
          field:'report_location',
          type: 'text',
          maxLength: 45,
          required: true
        }
      ],
      [
        {
          field:'report',
          type: 'text',
          maxLength: 225,
          required: true
        }
      ],
      [
        {
          field:'spam_check',
          type: 'hidden',
          maxLength: 225,
          required: true
        }
      ]
    ]*/

  formKeys.map( key => {

    let response = {
      validated: true,
      msg: ''
    };

    // check max length
    if ($(`#${key[0].field}`).val().length > key[0].maxLength) {

      response.validated = false;
      response.msg = response.msg + `Field ${key[0].field} too long`;

      console.log($(`label[for='${key[0].field}']`).html().toString().replace(':', ''));

    }

    // check if required
    if (key[0].required && $(`#${key[0].field}`).val() === '') {

      response.validated = false;
      response.msg = response.msg + `Field ${key[0].field} is required`;

      console.log($(`label[for='${key[0].field}']`).html().toString().replace(':', ''));

    }

    console.log(response);

  });

}
