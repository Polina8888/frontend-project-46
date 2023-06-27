import getStylish from './stylish.js';
import getPlain from './plain.js';

const getFormatted = (diff, format) => {
    if (format === 'stylish') {
        return getStylish(diff);
    }
    return getPlain(diff);
};
export default getFormatted;
