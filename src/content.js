// receives message from background script
// chrome.extension.onMessage.addListener(function ({url, token}) {
//   alert(url, token);
// });

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  /* If the received message has the expected format... */
  alert(msg)
});

$(document).ready(function () {
  if ($('a:contains("Log In")').length) {
    // The login button exists, do something
    // $('#status').text('Please log in first');
    alert('Please log in first');
  } else {
    // $('#status').text('Logged In');
    // The login button does not exist, do something else
    // alert('Logged In');
  }
});