/*
* Logger is an attempt to standardize logging in your JS applications.
* It is in the very early stages of development, and not ready for large scale productions yet.
* The point of logger is to make sure that whenever an error occurs, you would be able to easily identify
* where the error is propagated from. Also, there will be different log levels.
*
* Since Loggy returns a singleton, there will be no way to configure it during require time. Hence I had
* to come up with config(cfg) function. which takes an object with the customized configs and overwrite the default ones
*  I consider this approach a LAZY one, since I should be doing some more validation to the options passed. I added it
* to Todos
*
*
* configs = {
*       outStream: process.stdout,
*       errorStream: process.stdin,
*       isJson: false,
*       pretty: true
*  }
*
* TODO: I don't like the format function as of now since it handles:
*  1- Determining when to use colors
*  2- Determines if to display output as pure json or a string with json
*
* */

const LOG_LEVELS = {
    log: {
        type: "log",
        color: '\x1b[32m'
    },
    warn: {
        type: "warn",
        color: '\x1b[33m'
    },
    error: {
        type: "error",
        color: '\x1b[31m'
    },
    info: {
        type: "info",
        color: '\x1b[37m'
    }
};

// This is the default configuration
const default_config = {
    outStream: process.stdout,
    errorStream: process.stderr,
    isJson: false,
    pretty: true
};

class Loggy {
    constructor() {
        this.outStream = default_config.outStream;
        this.errorStream = default_config.errorStream;
        this.isJson = default_config.isJson;
        this.pretty = default_config.pretty;
    }

    // TODO: improve config validation and customization mechanism
    config(cfgs) {
        let cfgsKeys = Object.keys(cfgs);
        for (let i = 0; i < cfgsKeys.length; i++) {
            let key = cfgsKeys[i];
            if (default_config[key] === undefined)
                throw new Error(`This configuration "${key}" is invalid for @elbanby/Loggy configuration`);
            this[key] = cfgs[key];
        }
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
        const l = {message, stacktrace, module};
        this.writeError(LOG_LEVELS.error, l);
        return l;
    }

    info(message, module) {
        const l = {message, module};
        this.write(LOG_LEVELS.info, l);
        return l;
    }

    write(logLevel, logData) {
        if (this.outStream === process.stdout && logLevel) {
            let stdout = console[logLevel.type];
            stdout(this.format(logLevel, logData));
            // Reset terminal color
            console.log("\x1b[0m");
            return;
        }
        this.outStream(this.format(logLevel, logData));
    }

    writeError(logLevel, logData) {
        if ((this.errorStream === process.stdout || this.errorStream === process.stderr) && logLevel) {
            let stdout = console[logLevel.type];
            stdout(this.format(logLevel, logData));
            // Reset terminal color
            console.log("\x1b[0m");
            return;
        }
        this.errorStream(this.format(logLevel, logData));
    }

    format(logLevel, data) {
        let formattedStr = "";
        const date = new Date().toUTCString();

        if (this.isJson) {
            formattedStr = this.pretty && this.outStream === process.stdout && this.errorStream === process.stderr ?
                `${logLevel.color}` + JSON.stringify({logLevel: logLevel.type, date: date, ...data}) :
                JSON.stringify({logLevel: logLevel.type, date: date, ...data});

            return formattedStr;
        }

        let dataStr = "\n{";
        for (let prop in data) {
            dataStr += `\n\t${prop}: ${data[prop]}`;
        }
        dataStr += "\n}\n";

        /*
        * If you are using stdout adn stderr, we can simply add colors. However,
        * if you are using a custom callback function it will be hard to produce colored output
        *
        * TODO: Separate stdout and stderr formatting so we can allow granular customization
        */
        formattedStr = this.pretty && this.outStream === process.stdout && this.errorStream === process.stderr ?
            `${logLevel.color} [${logLevel.type}] - [${date}] ${dataStr}\n` :
            `[${logLevel.type}] - [${date}] ${dataStr}\n`;

        return formattedStr
    }
}

module.exports = new Loggy();