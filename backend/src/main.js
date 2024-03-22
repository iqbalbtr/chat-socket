const server = require("./web/web");

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})