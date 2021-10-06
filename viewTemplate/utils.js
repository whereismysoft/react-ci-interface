export const makeHtmlAttributes = (attributes) => {
    if (!attributes) {
        return '';
    }

    const keys = Object.keys(attributes);
    return keys.reduce((result, key) => (result += ` ${key}="${attributes[key]}"`), '');
};