import getStylish from './stylish.js';

const getFormatted = (diff, format = 'stylish') => {
    if (format === 'stylish') {
        return getStylish(diff);
    }
    return diff;
};
export default getFormatted;
