// trim the video description for preview lists
function trimString (str, trimAt) {
  return `${str.substring(0, trimAt)}...`;
}

function getCookieValue(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

function setupDateString (dateObj) {
  return `${dateObj.getMonth()+1}.${dateObj.getDate()}.${dateObj.getFullYear()}`;
}

function setupTimeString (timeObj) {

  let hr = timeObj.getHours();
  let minutes = timeObj.getMinutes();
  let dayPart = 'am';

  if (hr > 12) {
    hr = hr - 12;
    dayPart = 'pm';
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hr}:${minutes} ${dayPart}`;
}

function addCommas (nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
