(function() {
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
  let url = '';
  let token = '';
  let activeTabId;

  chrome.tabs.onActivated.addListener(function(activeInfo) {
    activeTabId = activeInfo.tabId
    chrome.tabs.sendMessage(activeTabId, "AAAAAA");
  });

  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      if(details.url.includes("gql.reddit.com"))
      {
        // $('#status').text(details.url);
        url = details.url;

        console.log(details);
        if(details.requestHeaders)
        {
          for (let header of details.requestHeaders) {
            // const hstr = header.name + ' ' + header.value;
            // $('#token').text($('#token').text() + hstr);
            if (header.name.toLowerCase() === 'authorization') {
              // Get the value of the Authorization header
              const authorizationValue = header.value;
              // $('#token').text(authorizationValue);
              token = authorizationValue;

              // chrome.runtime.sendMessage({url, token});
             chrome.tabs.sendMessage(activeTabId, {url, token}, function(response) {});
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
