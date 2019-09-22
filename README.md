# loggy
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

 
