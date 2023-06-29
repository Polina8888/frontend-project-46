import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

const getFormatted = (diff, format) => {
  switch (format) {
    case 'plain':
      return getPlain(diff);
    case 'json':
      return getJSON(diff);
    case 'stylish':
      return getStylish(diff);
    default:
      throw new Error(`Invalid format - ${format}`);
  }
};
export default getFormatted;
