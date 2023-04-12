$(function() {
  // sends message to background script
  /* chrome.runtime.sendMessage({opened: true}, function(response) {
    console.log(response.example);
  }); */

  // Add listener for web requests
  /* if ($('a:contains("Log In")').length) {
    // The login button exists, do something
    $('#status').text('Please log in first');
  } else {
    $('#status').text('Logged In');
    // The login button does not exist, do something else
    const browser = window.browser || window.chrome;
    browser.webRequest.onBeforeSendHeaders.addListener(
      function(details) {
        if(details.url.includes("gql.reddit.com"))
        {
          $('#status').text(details.url);

          console.log(details);
          if(details.requestHeaders)
          {
            for (let header of details.requestHeaders) {
              // const hstr = header.name + ' ' + header.value;
              // $('#token').text($('#token').text() + hstr);
              if (header.name.toLowerCase() === 'authorization') {
                // Get the value of the Authorization header
                const authorizationValue = header.value;
                $('#token').text(authorizationValue);
                break;
              }
            }
          }
        }
      },
      { urls: ['<all_urls>'] },
      ["blocking", "requestHeaders", "extraHeaders"]
    );
  } */
});
