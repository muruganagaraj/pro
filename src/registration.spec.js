const xlsx2json = require('xlsx2json');

xdescribe('registration', () => {
    xl_data = [];

    beforeAll(() => {
        xlsx2json('E:/diTech-New/src/excel/registration.xlsx', {
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
        let creatAccountLink = element(by.linkText('Create account'));
        LoginModalBtn.click();
        creatAccountLink.click();
    });

    it('registration successfully', () => {
        xl_data.forEach(e => {
            if (e.type === 'text' || e.type === 'password')
                element(by.id(e.fieldId)).sendKeys(e.value);
            if (e.type === 'checkbox' && e.value.toUpperCase() === 'TRUE') {
                element(by.id(e.fieldId)).click();
            }
        });
        let createAccBtn = element(by.buttonText('Create Account'));

        createAccBtn.getAttribute('disabled').then(isDisabled => {
            if (!isDisabled) {
                createAccBtn.click();
            }
        });
        browser.sleep(8000);
    })
})