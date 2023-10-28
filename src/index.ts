import logger from "../utils/logger";
import server from "../utils/server";
import config from "config";
const app = server();
const PORT = config.get<number>("PORT");

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
