const http = require('node:http');
const crypto = require('node:crypto');

const port = process.env.PORT || 5200;

let urlMap = new Map();
const server = http.createServer((req, res) => {

    if (!req.url.includes("/go/")) {
        let newId = crypto.randomInt(1000000);
        while (urlMap.has(newId)) {
            newId = crypto.randomInt(1000000);
        }

        let sentUrl = req.url.replace("/", "");
        urlMap.set(newId.toString(), sentUrl);

        res.setHeader('Access-Control-Allow-Origin', 'https://yosefabsal.github.io');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(`https://masurlshort.onrender/go/${newId}`));

    }
    else {
        let id = req.url.replace("/go/", "");
        let goToUrl = urlMap.get(id);

        if (!goToUrl) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("Invalid short URL");
        }
        
        res.writeHead(301, { location: goToUrl });
        res.end();
    }

});

server.listen(port, () => {
    console.log(`Server running at ${port}/`);
})
