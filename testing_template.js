// the test function must be an async arrow function. The logger and outputDir are available as a global variable.
(async () => {
    // Launch the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const fileUrl = `file://${outputDir}/index.html`;
    
    // Load the local HTML file
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    // Screenshot the page and save it as output.png
    await page.screenshot({ path: `${outputDir}/output.png` });

    // Close the browser
    await browser.close();
})();