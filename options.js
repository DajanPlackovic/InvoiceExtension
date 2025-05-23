document.addEventListener('DOMContentLoaded', async function () {
  // Load saved items
  chrome.storage.sync.get('listItems', function (data) {
    if (data.listItems) {
      document.getElementById('listItems').value = data.listItems;
    }
  });

  // Save button functionality
  document
    .getElementById('saveBtn')
    .addEventListener('click', async function () {
      const listItems = document.getElementById('listItems').value;
      const parsed = JSON.parse(listItems).aggregationPending.map(
        pender => pender.uuid
      );
      parsed.unshift('END');
      chrome.storage.sync.set({ listItems: parsed }, function () {
        const status = document.getElementById('status');
        status.textContent = 'Team list saved!';
        setTimeout(function () {
          status.textContent = '';
        }, 1500);
      });
      chrome.tabs.sendMessage(
        { msg: 'start_invoice_bg', time: time },
        function (response) {
          console.log('response from the bg', response);
        }
      );
    });
});
