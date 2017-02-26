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
        // If the field has a null value, it can't be matched
        return false;
    } else if (R.isEmpty(fieldValue)) {
        // If the field is empty, check if the user searched for empty
        return R.isNil(term);
    } else if (typeof fieldValue === 'string') {
        // Perform a basic string search
        return fieldValue.includes(term);
    } else if (typeof fieldValue === 'boolean') {
        // Check if the user supplied the boolean value as a string
        return fieldValue.toString() === term;
    } else if (typeof fieldValue === 'number') {
        // Check if the user supplied the number value as a string
        return fieldValue.toString() === term;
    } else if (fieldValue.length > 0 && fieldValue.some) {
        // Try string matching through the array items
        return fieldValue.some(a => {
            return a.includes && a.includes(term);
        });
    } else {
        // This is an unknown field type
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
