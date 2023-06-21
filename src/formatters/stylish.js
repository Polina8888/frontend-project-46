import _ from 'lodash';

const getIndent = (depth, shiftLeft = 0, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - shiftLeft);

const stringify = (value, depth) => {
    if (!_.isObject(value)) {
        return value;
    }
    const entries = Object.entries(value);
    const body = entries.flatMap((element) => `${getIndent(depth + 1)}${element[0]}: ${stringify(element[1], depth + 1)}`);
    return ['{', ...body, `${getIndent(depth)}}`].join('\n');
};

const getStylish = (diff) => {
    const buildArchitecture = (data, depth) => {
        const items = data.map((item) => {
            switch (item.status) {
            case 'nested':
                return `${getIndent(depth + 1)}${item.key}: {\n${buildArchitecture(item.children, depth + 1)}\n${getIndent(depth + 1)}}`;
            case 'added':
                return `${getIndent(depth + 1, 2)}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
            case 'removed':
                return `${getIndent(depth + 1, 2)}- ${item.key}: ${stringify(item.value, depth + 1)}`;
            case 'updated':
                return `${getIndent(depth + 1, 2)}- ${item.key}: ${stringify(item.value.oldValue, depth + 1)}\n${getIndent(depth + 1, 2)}+ ${item.key}: ${stringify(item.value.newValue, depth + 1)}`;
            default:
                return `${getIndent(depth + 1, 2)}  ${item.key}: ${stringify(item.value, depth + 1)}`;
            }
        });
        const body = items.join('\n');
        return body;
    };
    return `{\n${buildArchitecture(diff, 0)}\n}`;
};

export default getStylish;
