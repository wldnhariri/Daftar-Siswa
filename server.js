const jsonServer = require('json-server');
const axios = require('axios');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);

axios.get('https://gist.githubusercontent.com/wldnhariri/gist_id/raw/db.json')
    .then(response => {
        const router = jsonServer.router(response.data);
        server.use(router);

        server.listen(port, () => {
            console.log('JSON Server is running on port', port);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });
