const server = require("./api/server.js");
const cookieParser = require("cookie-parser");
server.use(cookieParser);
require("dotenv").config();

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
