import _ from 'lodash';

const getPath = (currentPath, pastPath = '') => {
  switch (pastPath) {
    case '':
      return currentPath;
    default:
      return `${pastPath}.${currentPath}`;
  }
};

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } return (typeof value === 'string' ? `'${value}'` : value);
};
const getPlain = (diff) => {
  const toPlain = (data, pastPath = '') => {
    const items = data.filter((item) => item.status !== 'unchanged').flatMap((item) => {
      const currentPath = getPath(item.key, pastPath);
      switch (item.status) {
        case 'nested':
          return toPlain(item.children, currentPath);
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(item.value)}`;
        case 'removed':
          return `Property '${currentPath}' was removed`;
        default:
          return `Property '${currentPath}' was updated. From ${stringify(item.value.oldValue)} to ${stringify(item.value.newValue)}`;
      }
    });
    return items.join('\n');
  };
  return toPlain(diff);
};

export default getPlain;
