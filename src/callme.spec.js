const xlsx2json = require('xlsx2json');

xdescribe('registration', () => {
    xl_data = [];

    beforeAll(() => {
        xlsx2json('E:/diTech-New/src/excel/callback.xlsx', {
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
        let callbackLink = element.all(by.buttonText(`Call Me`)).get(0);
        callbackLink.click();
    });

    it('fill callback successfully', () => {
        let callbackSubmitBtn = element(by.buttonText('Reach Me'));
        xl_data.forEach(e => {
            helpMe(e);
        })
        browser.sleep(4000);
        callbackSubmitBtn.getAttribute('disabled').then(isDisabled => {
            if (!isDisabled) {
                callbackSubmitBtn.click();
            }
        });
        browser.sleep(10000);
    })
});

function helpMe(_object) {
    switch (_object.type.toUpperCase()) {
        case 'TEXT':
        case 'PASSWORD':
        case 'EMAIL':
            {
                element(by.id(_object.fieldId)).isPresent().then(present => {
                    if (present) {
                        element(by.id(_object.fieldId)).sendKeys(_object.value);
                    }
                })
            }
            break;
        case 'CHECKBOX':
            {
                element(by.id(_object.fieldId)).click();
            }
        case 'SINGLESELECT':
            {
                element(by.id(_object.fieldId)).element(by.buttonText(_object.value)).isDisplayed().then(present => {
                    if (present) {
                        element(by.id(_object.fieldId)).element(by.buttonText(_object.value)).click();
                    }
                })
            }
            break;
        case 'MULTISELECT':
            {
                _object.type = 'SINGLESELECT';
                if (Array.isArray(_object.value)) {
                    _object.value.forEach(e => {
                        helpme(_object);
                    })
                } else {
                    _object.type = 'SINGLESELECT';;
                    helpMe(_object);
                }

            }
            break;
        case 'RADIOBTN':
            {}
    }
}