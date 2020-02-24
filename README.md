# Loggy
Simple and fast JS JSON logger.

![](https://img.shields.io/npm/v/@elbanby/loggy) ![](https://img.shields.io/github/license/elbanby/loggy)

```javascript
const Loggy = require("@elbanby/loggy");

// Simple log message
Loggy.log(`successfully connected to DB`, __filename);

// logging an error
if (error) {
    Loggy.error("Error occurred while connecting to db", error, __filename);
    process.exit(1);
}

// customizing your stdout
Loggy.setOutStream((data) => { 
    // write to file or do as you please with it
});

Loggy.setErrorStream((data) => {
    // write to file or do as you please with it
});
```

```console
[log] - [Sun, 22 Sep 2019 11:28:09 GMT] 
{
        message: successfully connected to DB
        module: /Users/omarelbanby/development/loggy/test/loggy.test.js
}

[error] - [Sun, 22 Sep 2019 11:28:10 GMT] 
  {
          message: oh shoot an error occured
          stacktrace: Error: shoot
          module: /Users/omarelbanby/development/loggy/test/loggy.test.js
  }
```
## Motivation
The motivation behind Loggy is quite simple in every NodeJS project I work on there are almost the same kind of 
problems:

1- Developers tend to forget random console log messages which pollutes the stdout
 
2- Developers usually need to log error messages. However, later down the line, an unexpected
error occurs, and the console message is too generic to hunt down.

Loggy attempts to solve these issues by standardizing the way developers log messages 
in their codebase. Depending on the log level, different parameters are needed. 
That ensures the log is descriptive and shows the filename where the error occurred + the stack trace,
which makes debugging a lot easier. In addition, Loggy forces the user to write a 
message for the anticipated error, and this leads to a more thoughtful logging mechanism.

# How to use

## Importing 

```js
const Loggy = require("@elbanby/loggy");
```

When you import Loggy you get back a singleton instance which can be shared across your code base.

## Configuration  
To configure Loggy you can use the config function which you can pass any of the following configs:

```js
const Loggy = require("@elbanby/loggy");

Loggy.config({
    outStream: (data) => {
        const file = fs.appendFile("./logs", data, _ => console.log("Finished writing to log file"));
    },
    errorStream: (data) => {
        const file = fs.writeFile("./errors", data, _ => console.log("Finished writing to error file") );
    },
    pretty: true,
    isJson: false
});
```

Please note if you use your custom outStream or/and errorStream the pretty option doesn't take effect. However, if 
you are just logging to the console and/or redirecting the logs you can easily have pretty logging  
``` bash
node app.js 1> logs.log 2> error.log
```

Also please note that if you pass any invalid configuration to the config object, 
Loggy will throw an error, reflecting that the key you used is invalid option 

### Custom formatter
Right now I am using the format function to format the output for json and pretty print. 
Also to add the date the log level. 

If you feel like you want to customize the formatter for your application, 
you can easily do that. However, you will have to handle the entire formatting process yourself.

To do that you overwrite the format function 

```js
Loggy.format = (logLevel, data) => {
    return data;
};
```

Please note that loglevel is an object that includes "type" and "color". Here is an example
```
  log: {
        type: "log",
        color: '\x1b[32m'
    }
```  

---

## Function signatures for all log levels available  

Loglevel    | parameters         | example | 
:---:       | :---:              | :---:    |
info        | (message, module)  | `Loggy.info(message, module)`|
log         | (message, module)  | `Loggy.log("successfully connected to DB", __filename);` |
warn        | (message, module)  | `Loggy.warn("Retrying to establish connection", __filename);` |
error       | (message, stacktrace, module) | ` Loggy.error("Error occurred while connecting to db", error, __filename);` |
