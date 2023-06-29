import yaml from 'js-yaml';

const parsers = (format) => {
  if (format === '.yml' || format === '.yaml') {
    return yaml.load;
  }
  return JSON.parse;
};

export default parsers;
