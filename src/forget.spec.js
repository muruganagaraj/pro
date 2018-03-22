const xlsx2json = require('xlsx2json');

xdescribe('forgot password', () => {
    xl_data = [];

    beforeAll(() => {
        xlsx2json('E:/diTech-New/src/excel/forgotPassword.xlsx', {
            mapping: {
                'fieldId': 'A',
                'id': 'B',
                'type': 'C',
                'value': 'D'
            }
        }).then(res => {
            let data = res[0].filter((e, i) => i > 0);
            xl_data = data.map(e => {
                return {
                    fieldId: e.fieldId,
                    value: e.value,
                    type: e.type
                }
            });
        });
    });

    beforeEach(() => {
        let LoginModalBtn = element.all(by.buttonText(`Login`)).get(0);
        let forgotPwdLink = element(by.linkText('Forgot Password?'));
        LoginModalBtn.click();
        forgotPwdLink.click();
    });

    it('request for password reset link successfully', () => {
        xl_data.forEach(e => {
            if (e.type === 'text' || e.type === 'password')
                element(by.id(e.fieldId)).sendKeys(e.value);
            if (e.type === 'checkbox')
                element(by.id(e.fieldId)).click();
        });
        let forgotPwd_submitBtn = element(by.buttonText('Reset My Password'));
        forgotPwd_submitBtn.getAttribute('disabled').then(isDisabled => {
            if (!isDisabled) {
                forgotPwd_submitBtn.click();
            }
        });
        browser.sleep(5000);
    })
})