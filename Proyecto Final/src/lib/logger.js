import pino from "pino";
import pinoMS from "pino-multi-stream";

const consoleStream = pino.destination({ sync: false });

const warnStream = pino.destination({
    dest: "./logs/warn.log",
    sync: true,
});

const errorStream = pino.destination({
    dest: "./logs/error.log",
    sync: true,
});

const streams = pinoMS.multistream([
    { level: "info", stream: consoleStream },
    { level: "warn", stream: warnStream },
    { level: "error", stream: errorStream },
]);

const logger = pino(
    {
        level: "info",
    },
    pino.multistream(streams)
);

export default logger;