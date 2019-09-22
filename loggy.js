/*
* Logger is an attempt to standardize logging in your JS applications.
* It is in the very early stages of development, and not ready for large scale productions yet.
* The point of logger is to make sure that whenever an error occurs, you would be able to easily identify
* where the error is propagated from. Also, there will be different log levels.
*
* */

const LOG_LEVELS = {
    log: "log",
    warn: "warn",
    error: "error",
    info: "info"
};

class Loggy {
    constructor() {
        this.outStream = process.stdout;
        this.errorStream = process.stdout;
    }

    setOutStream(cb) {
        this.outStream = cb;
    }

    setErrorStream(cb) {
        this.errorStream = cb;
    }

    log(message, module) {
        const l = {message, module};
        this.write(LOG_LEVELS.log, l);
        return l;
    }

    warn(message, module) {
        const l = {message, module};
        this.write(LOG_LEVELS.warn, l);
        return l;
    }

    error(message, stacktrace, module) {
        const l = {message, stacktrace , module};
        this.writeError(LOG_LEVELS.error, l);
        return l;
    }

    info(message, module) {
        const l = {message, module};
        this.write(LOG_LEVELS.info, l);
        return l;
    }

    write(logLevel, logData) {
        let ll = LOG_LEVELS[logLevel];
        if (this.outStream === process.stdout && ll) {
            let stdout = console[ll];
            stdout(this.format(logLevel,logData));
            return;
        }
        this.outStream(this.format(logLevel, logData));
    }

    writeError(logLevel, logData) {
        let ll = LOG_LEVELS[logLevel];
        // handle other type of logs
        if ( (this.errorStream === process.stdout || this.errorStream === process.stderr) && ll) {
            let stdout = console[ll];
            stdout(this.format(logLevel,logData));
            return;
        }
        this.outStream(this.format(logLevel,logData));
    }

    format(logLevel, data) {
        let ll = LOG_LEVELS[logLevel];
        const date = new Date();

        let dataStr = "\n{";
        for (let prop in data) {
            dataStr += `\n\t${prop}: ${data[prop]}`;
        }
        dataStr += "\n}";

        return `[${ll}] - [${date.toUTCString()}] ${dataStr}`;
    }
}

module.exports = new Loggy();