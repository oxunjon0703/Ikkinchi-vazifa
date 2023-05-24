const http = require('http');
const fs = require('fs').promises;
const Io = require("./utils/Io");
const Maxsulotlar = new Io ("./database/maxsulot.json");

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const maxsulot = await Maxsulotlar.read();
    
    if (req.url === '/' && req.method === 'GET') {
        
        res.end(JSON.stringify(maxsulot));
        
    } else if (req.url === '/' && req.method === 'POST') {
        req.on('data', async (data) => {
            console.log(JSON.parse(data));
            const { name } = JSON.parse(data);
            let a = true
            for (let i = 0; i < maxsulot.length; i++) {
                if (maxsulot[i].name === name) {
                    
                    a = false
                    if(a === false) {
                        const { miqdori } = JSON.parse(data);
                        const element = maxsulot[i]
                        element.miqdori = element.miqdori + miqdori  
                        res.write(JSON.stringify(element))
                        res.end("\nMaxshulot miqdori ortdi")
                    }
                }
            }
            if(a) {
                maxsulot.push(JSON.parse(data))
                await Maxsulotlar.write(maxsulot);
                res.end("Yangi maxsulot qo'shildi")
            }
            res.end();
        });
    };
});

server.listen(8080, () => {
    console.log(8080);
});