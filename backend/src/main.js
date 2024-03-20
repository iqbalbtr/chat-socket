const web = require("./web/web");

const port = process.env.PORT;

web.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})