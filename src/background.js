

(function () {
  let url = '';
  let token = '';

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    sendResponse({ url, token });

    // sends response to content script
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.tabs.sendMessage(tabs[0].id, {"def": "ghi"} );
    // });
  });
  // setInterval(() => {
  //   chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
  //     var tabId = tabs[0].id;
  //     // Now you can send a message to this tab using tabId
  //     if(tabId)
  //       chrome.tabs.sendMessage(tabId, { url, token }, function (response) { });
  //   });
  // }, 3000);
  // receives message from popup script
  /* chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.opened == true) {
      // sends response back to popup script
      sendResponse({example: "goodbye"});

      // sends response to content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { logUrl: true } );
      });
    }
  }); */


  //  const browser = window.browser || window.chrome;

  chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
     if (details.url.includes("gql.reddit.com")) {
        // $('#status').text(details.url);
        url = details.url;

        console.log(details);
        if (details.requestHeaders) {
          for (let header of details.requestHeaders) {
            // const hstr = header.name + ' ' + header.value;
            // $('#token').text($('#token').text() + hstr);
            if (header.name.toLowerCase() === 'authorization') {
              // Get the value of the Authorization header
              const authorizationValue = header.value;
              // $('#token').text(authorizationValue);
              token = authorizationValue;

              // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
              //   var tabId = tabs[0].id;
              //   // Now you can send a message to this tab using tabId
              //   chrome.tabs.sendMessage(tabId, { url, token }, function (response) { });
              // });
              // chrome.runtime.sendMessage({url, token});
              // alert(url, token);
              break;
            }
          }
        }
     }
    },
    { urls: ['<all_urls>'] },
    ["blocking", "requestHeaders", "extraHeaders"]
  );
})();
