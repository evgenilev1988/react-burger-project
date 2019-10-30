

const inputType = {
    input: 'input',
    select: 'select'
}

const contactDataHelper = {

    basicElementObject(elementType, value, validation, elementLabel,valid,touched) {
        return {
            elementLabel: elementLabel,
            elementType: elementType,
            value: value,
            validation: validation,
            valid: valid == null ?  true : valid,
            touched:touched
        }
    },

    orderFormElementTextCreator(elementType, type, placeholder, value, elementLabel, validation,valid,touched) {
        return {
            ...this.basicElementObject(elementType, value, validation, elementLabel,valid,touched),
            elementConfig: {
                type: type,
                placeholder: placeholder
            }
        };
    },

    orderFormElementDDLCreator(elementType, options, value, elementLabel, validation,touched) {
        return {
            ...this.basicElementObject(elementType,value,validation,elementLabel,touched),
            elementConfig: {
                options: options
            }
        }
    }
}

export { contactDataHelper, inputType };