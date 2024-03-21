const { server } = require("./web/web");

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})