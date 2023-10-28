import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
  pid: false,
});

export default logger;
