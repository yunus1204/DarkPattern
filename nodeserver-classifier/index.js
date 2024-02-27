const {Builder, By, Key, until} = require('selenium-webdriver');

async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the price tracker website
        await driver.get('https://pricehistory.app/');

        // Find the search input box by its ID and send the Flipkart product link to it
        const searchInput = await driver.findElement(By.id('search'));
        const flipkartProductLink = 'https://www.flipkart.com/sony-alpha-ilce-6400l-aps-c-mirrorless-camera-16-50-mm-power-zoom-lens-featuring-eye-af-4k-movie-recording/p/itm960219ec4660b?pid=DLLFDJ9DFXVAZDTS&lid=LSTDLLFDJ9DFXVAZDTSLQCXKP&marketplace=FLIPKART&store=jek%2Fp31%2Ftrv&srno=b_1_1&otracker=browse&fm=organic&iid=174f90be-9686-45cb-a230-231a25ce7bdb.DLLFDJ9DFXVAZDTS.SEARCH&ppt=hp&ppn=homepage&ssid=fr4ukjuozk0000001708100254266';
        await searchInput.sendKeys(flipkartProductLink, Key.RETURN);

        // Wait for the search results to load
        await driver.wait(until.elementLocated(By.className('all-time-price-overview')), 15000); // Increase timeout to 15 seconds

        // Find all elements within the container
        const elements = await driver.findElements(By.className('all-time-price-overview'));

        // Print text content of all elements
        for (let i = 0; i < elements.length; i++) {
            const text = await elements[i].getText();
            console.log(text);
        }
    } finally {
        // Close the browser session
        await driver.quit();
    }
}

example();