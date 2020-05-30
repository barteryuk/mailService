const app = require("../app");
const http = require("http");
const PORT = process.env.PORT || 4003;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server mailService is running on: ", PORT);
});
