chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "start_invoice_bg") {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        // if (tab.id !== activeTab)
        //     return;
        if (changeInfo.status === 'complete' && tab.url) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['script.js'],
            });
        }
    })
  } 
})
