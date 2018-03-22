'use strict';

describe('login', () => {
    beforeEach(() => {
        let LoginModalBtn = element.all(by.buttonText(`Login`)).get(0);
        LoginModalBtn.click();
        browser.sleep(5000);
    });

    it('login successfully', () => {
        let userId = element(by.id('login_userId'));
        let pwd = element(by.id('login_password'));
        let loginBtn = element.all(by.buttonText('Login')).last();

        userId.sendKeys(browser.params.login.userId);
        pwd.sendKeys(browser.params.login.password);
        loginBtn.getAttribute('disabled').then(isDisabled => {
            if (!isDisabled) {
                loginBtn.click();
                expect(browser.getCurrentUrl()).toContain('dashboard-landing');
            } else {
                expect(browser.getCurrentUrl()).toBe('/');
            }
        });
        browser.sleep(6000);
    });
});