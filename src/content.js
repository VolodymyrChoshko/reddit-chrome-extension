// receives message from background script
// chrome.extension.onMessage.addListener(function ({url, token}) {
//   alert(url, token);
// });

$(document).ready(function () {
  // chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //   alert(request)
  // });
  if ($('a:contains("Log In")').length) {
    // The login button exists, do something
    // $('#status').text('Please log in first');
    alert('Please log in first');
  } else {
    var details = {
      'id': 't3_12g8ns5',
      'dir': '1',
      'api_type': 'json'
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    chrome.runtime.sendMessage({ "abc": "def" }, function (response) {
      fetch('https://oauth.reddit.com/api/vote?redditWebClient=desktop2x&app=desktop2x-client-production&raw_json=1&gilding_detail=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': response.token,
        },
        body: formBody
      });
      alert(JSON.stringify(response));
    })
    // $('#status').text('Logged In');
    // The login button does not exist, do something else
    // alert('Logged In');
  }
});