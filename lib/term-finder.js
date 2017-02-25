const R = require('ramda');

const findTermInFields = (subject, fields, term) => {
    const fieldWithMatch = fields.find(f => {
        return findTermInField(subject, f, term);
    });

    return !!fieldWithMatch;
}

const findTermInField = (subject, field, term) => {
    const fieldValue = subject[field];

    if (R.isNil(fieldValue)) {
        return false;
    } else if (typeof fieldValue === 'string') {
        return fieldValue.includes(term);
    } else {
        // TODO Add support for additional field types
        return false;
    }
}

const termFinder = (fields, term) => {
    return (subject) => {
        return findTermInFields(subject, fields, term);
    }
}

module.exports = {
    findTermInFields,
    findTermInField,
    termFinder
};
