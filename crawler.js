const puppeteer = require('puppeteer');

(async() => {
    async function parseData(url,end) {
        const page = await browser.newPage();
        await page.goto(url);

        // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
        const articlesOnPage = await page.evaluate(() => {
            let titleLinks = document.querySelectorAll('.pkg .time_comment a');
            titleLinks = [...titleLinks];
            let articlesOnPage = titleLinks.map(link => ({
                title: link.getAttribute('title'),
                href: link.getAttribute('href')
            }));
            return articlesOnPage;
        });
        await page.close();

        let currentPage = parseInt(url.match(/p(\d+)$/)[1], 10);

        while(currentPage <= end) {
            const nextPage = currentPage + 1;
            const nextUrl = `http://www.bongda.com.vn/bong-da-anh/p${nextPage}`;
            currentPage++;
            
            return articlesOnPage.concat(await parseData(nextUrl,end));
        }
    }


    const browser = await puppeteer.launch();
    let articles = await parseData('http://www.bongda.com.vn/bong-da-anh/p1',3);
    console.log(articles.length);
    // In ra kết quả và đóng trình duyệt

    await browser.close();
})();