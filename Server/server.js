const http = require('node:http');
const rUUID = require('node:crypto');
const hostname = '127.0.0.1';
const port = '5200';

let urlMap = new Map();
const server = http.createServer((req, res) => {

    if (!req.url.includes("/go/")) {
        let newId = rUUID.randomInt(1000000);
        while (urlMap.has(newId)) {
            newId = rUUID.randomInt(1000000);
        }

        let sentUrl = req.url.replace("/", "");
        urlMap.set(newId.toString(), sentUrl);

        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(`https://yosefabsal.github.io/go/${newId}`));

    }
    else {
        let id = req.url.replace("/go/", "");
        let goToUrl = urlMap.get(id);

        try {
            res.writeHead(301, {
                location: goToUrl
            })
        }
        catch(err) {
            console.error(err);
        }
        
        res.end();
    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
