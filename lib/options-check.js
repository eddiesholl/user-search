module.exports = (options) => {
    if (!options.entity) {
        console.warn('You must supply a valid entity to search');
        return false;
    }
    if (!options.field || options.field.length === 0) {
        console.warn('You must supply at least one field to search');
        return false;
    }
    if (!options.term) {
        console.warn('You must supply a term to search for');
        return false;
    }

    return true;
}
