
const puppeteer = require('puppeteer');

// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('http://www.bongda.com.vn/tham-bai-truoc-liverpool-cuoc-cach-mang-o-arsenal-gio-moi-bat-dau-d518274.html');

//     // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
//     const articlesOnPage = await page.evaluate(() => {
//         let titleLinks = document.querySelectorAll('#content_detail p');
//         titleLinks = [...titleLinks];
//         let articlesOnPage = titleLinks.map(link => (link.textContent));
//         return articlesOnPage.join('');
//     });
//     console.log(articlesOnPage);

//     // console.log(articlesOnPage);
//     await browser.close();
// })();

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
        console.log(articlesOnPage);

        // console.log(articlesOnPage);
        await browser.close();
    } catch (error) {
        console.log(error);
    }
}

getContent('http://www.bongda.com.vn/cau-ta-bi-bo-lai-toi-hon-9m-mot-su-luoi-bieng-dac-trung-d518266.html');