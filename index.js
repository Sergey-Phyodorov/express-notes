const http = require('http');
const fs = require('fs/promises');
const chalk = require('chalk');

const port = 3000;

const server = http.createServer((req, res) => {
    console.log(chalk.bgBlue('Mетод запроса:', req.method));
    console.log(chalk.blueBright('URL-адрес запроса:', req.url));

    res.end('Hello from the server');
});

server.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port} ...`));
});
