const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');
const { addNote } = require('./notes.controller.js');

const port = 3000;

const basePath = path.join(__dirname, 'pages');

const server = http.createServer(async (req, res) => {
    console.log(chalk.bgBlue('Метод запроса:', req.method));
    console.log(chalk.blueBright('URL-адрес запроса:', req.url));

    if (req.method === 'GET') {
        const content = await fs.readFile(path.join(basePath, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
    } else if (req.method === 'POST') {
        const body = [];
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

        req.on('data', chunk => {
            body.push(Buffer.from(chunk));
        });

        req.on('end', () => {
            const titleNote = body
                .toString()
                .split('=')[1]
                .replaceAll('+', ' ');
            addNote(titleNote);
            res.end(`Title note: ${titleNote}`);
        });
    }
});

server.listen(port, () => {
    console.log(chalk.green(`Server работает на порту ${port}`));
});
