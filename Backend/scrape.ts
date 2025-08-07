//Imports
import axios from 'axios';
import { JSDOM } from 'jsdom';

// Function to scrape the latest news from a given URL
export async function scrapeAmazon(keyword: string) {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://www.amazon.com/s?k=${encodedKeyword}`;

    const response = await axios.get(url, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
        },
    });

    console.log(response.data.slice(0, 1000));

    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    const productDivs = [
        ...document.querySelectorAll('div[data-component-type="s-search-result"]'),
    ];

    // Here i need to get the title, rating, reviews, and image of each product by querying the DOM
    // So i need to find the right selectors for each of these elements
    const products = productDivs
        .map((product) => {
            const title = product.querySelector('h2 a span')?.textContent?.trim() || null;
            const rating = product.querySelector('.a-icon-alt')?.textContent?.trim() || null;
            const reviews = product.querySelector('.a-size-base')?.textContent?.trim() || null;
            const image = product.querySelector('img')?.getAttribute('src') || null;

            return title && image ? { title, rating, reviews, image } : null;
        })
        .filter(Boolean);

    return products;
}
