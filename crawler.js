const puppeteer = require('puppeteer');


(async() => {
        async function getContent(url) {
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url);

                // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
                const articlesOnPage = await page.evaluate(() => {
                    let titleLinks = document.querySelectorAll('#content_detail p');
                    titleLinks = [...titleLinks];
                    let articlesOnPage = titleLinks.map(link => (link.textContent));
                    return articlesOnPage.join('');
                });
                // console.log(articlesOnPage);

                // console.log(articlesOnPage);
                await browser.close();
            } catch (error) {
                console.log(error);
            }
        }

        async function parseData(url,end) {
            try {
                const page = await browser.newPage();
                await page.goto(url);
        
                // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
                const articlesOnPage = await page.evaluate(() => {
                    let titleLinks = document.querySelectorAll('.pkg .time_comment a');
                    titleLinks = [...titleLinks];
                    let articlesOnPage = titleLinks.map(link => ({
                        title: link.getAttribute('title'),
                        href : link.getAttribute('href'),
                        content : link.getAttribute('href')
                        
                    }
                    ));
                    return articlesOnPage;
                });
        
                let currentPage = parseInt(url.match(/p(\d+)$/)[1], 10);
        
                while(currentPage <= end) {
                    const nextPage = currentPage + 1;
                    const nextUrl = `http://www.bongda.com.vn/bong-da-anh/p${nextPage}`;
                    currentPage++;
                    
                    return articlesOnPage.concat(await parseData(nextUrl,end));
                }
        
                await page.close();
            } catch (error) {
                console.log(error);
            }
        }

    const browser = await puppeteer.launch();
    let articles = await parseData('http://www.bongda.com.vn/bong-da-anh/p1',1);
    // In ra kết quả và đóng trình duyệt
    console.log(articles);
    await browser.close();
})();

