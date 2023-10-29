import dbConnection from "../utils/dbConnection";
import logger from "../utils/logger";
import server from "../utils/server";
import config from "config";
const app = server();
const PORT = config.get<number>("PORT");
const DB_URL = config.get<string>("DB_URL");

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  dbConnection(DB_URL);
});
