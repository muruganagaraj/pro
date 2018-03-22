let fs = require('fs');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    useAllAngular2AppRoots: true,

    directConnect: true,

    specs: ['src/**/*.spec.js'],

    baseUrl: 'http://10.210.96.71:9090/#/',

    framework: 'jasmine2',

    capabilites: {
        'browserName': 'chrome'
    },

    allScriptsTimeout: 540000,

    resultJsonOutputFile: 'testReport.json',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 540000,
    },

    params: {
        login: {
            userId: "Sumeet.kumar@tavant.com",
            password: "Test$123",
            defaultLogin: "false"
        }
    },

    onPrepare: function() {
        browser.driver.manage().window().maximize();
        browser.get('/');
        if (browser.params.login.defaultLogin.toUpperCase() === 'TRUE') {
            let loginModalBtn = element(by.className('btn btn-default head-login-btn'));
            let userId = element(by.id('login_userId'));
            let pwd = element(by.id('login_password'));
            let loginBtn = element.all(by.buttonText('Login')).last();

            loginModalBtn.click();
            userId.sendKeys(browser.params.login.userId);
            pwd.sendKeys(browser.params.login.password);
            loginBtn.getAttribute('disabled').then(isDisabled => {
                if (!isDisabled) {
                    loginBtn.click();
                }
            });
        }
    },

    onComplete: function() {
        //console.log("process ended!!!!\n");
    },

    onCleanUp: function(exitCode) {
        // browser.close();
        //console.log("protractor exited with error code = " + exitCode + '\n');
        // fs.unlink(__filename, () => { });
    }

};