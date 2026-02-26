const fs = require('fs');
const https = require('https');

const products = require('./src/data/products.json');

async function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            }
        }, (res) => {
            let data = '';
            if (res.statusCode === 301 || res.statusCode === 302 && res.headers.location) {
                fetchHtml(res.headers.location.startsWith('http') ? res.headers.location : 'https://www.amazon.in' + res.headers.location).then(resolve).catch(reject);
                return;
            }
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

function extractImages(html) {
    const images = [];

    // Method 1: Try finding the hiRes matches globally
    const hiResRegex = /"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g;
    let match;
    while ((match = hiResRegex.exec(html)) !== null) {
        if (!images.includes(match[1])) images.push(match[1]);
    }

    // Method 2: Try finding large matches globally if hiRes is missing
    if (images.length === 0) {
        const largeRegex = /"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g;
        while ((match = largeRegex.exec(html)) !== null) {
            if (!images.includes(match[1])) images.push(match[1]);
        }
    }

    // Deduplicate and filter variations that are too small or irrelevant if needed.
    return images;
}

(async () => {
    let updatedCount = 0;
    for (let p of products) {
        console.log('Fetching image for', p.amazonUrl);
        try {
            const html = await fetchHtml(p.amazonUrl);
            const gallery = extractImages(html);

            if (gallery && gallery.length > 0) {
                // Update preview image
                p.image = gallery[0];
                // Add gallery array mapping
                p.gallery = gallery;
                console.log(`\tFound ${gallery.length} images.`);
                updatedCount++;
            } else {
                console.log(`\tCould not find image for ${p.amazonUrl}`);
                if (!p.gallery) p.gallery = [p.image]; // Fallback if no new image found but previous image exists
            }
        } catch (e) {
            console.error(`\tError:`, e.message);
            if (!p.gallery) p.gallery = [p.image];
        }

        // Slight delay to prevent rate limit blocking by Amazon
        await new Promise(r => setTimeout(r, 1200));
    }

    fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, 2));
    console.log(`Done! Updated images for ${updatedCount} out of ${products.length} products.`);
})();
