//imports
import express from 'express';
import { scrapeAmazon } from './scrape'; //

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = 3000;

// API endpoint to scrape Amazon based on a keyword query parameter
app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword as string;

    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    // Call the scrape function and return the results
    try {
        const results = await scrapeAmazon(keyword);
        res.json(results);
    } catch (error) {
        console.error('Scrape error:', error);
        res.status(500).json({ error: 'Failed to scrape Amazon' });
    }
});

//Here, to test the API, I use insomnia passing the keyword as a query parameter

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
