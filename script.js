console.log("loaded script");

chrome.storage.sync.get('listItems', async function (data) {
    async function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function regenerateManually()
    {
        await wait(5000);
        console.log(data.listItems);
        const regenerateButton = document.querySelector(`button[aria-label="Generate invoice"]`);
        if (!regenerateButton)
            return;
        regenerateButton.click();
        await wait(1000);
        let dialogButtons = document.querySelectorAll(`[aria-label="dialog"] button`);
        [...dialogButtons].find(button => button.innerText === 'Generate invoice').click();
        await wait(1000);
        dialogButtons = document.querySelectorAll(`[aria-label="dialog"] button`);
        [...dialogButtons].find(button => button.innerText === 'Continue').click();
        await wait(1000);
        dialogButtons = document.querySelectorAll(`[aria-label="dialog"] button`);
        [...dialogButtons].find(button => button.innerText === 'Continue').click();
        await wait(1000);
    }


    const results = data.listItems
    if (results?.length > 1)
    {
        await regenerateManually();
        const pender = results.pop();
        console.log(pender);
     chrome.storage.sync.set({ listItems: results }, function () {
         window.location.replace(`https://invoices.uberinternal.com/explorer/${pender}?tenancy=PRODUCTION&referenceType=TRIP`, '_blank');   
    })
    }
  });