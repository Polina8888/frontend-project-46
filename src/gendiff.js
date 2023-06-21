import _ from 'lodash';

const generateDiff = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const keys = _.sortBy(_.union(keys1, keys2));
    const diff = keys.map((key) => {
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
            return { key, children: generateDiff(obj1[key], obj2[key]), status: 'nested' };
        } if (!Object.hasOwn(obj1, key)) {
            return { key, value: obj2[key], status: 'added' };
        } if (!Object.hasOwn(obj2, key)) {
            return { key, value: obj1[key], status: 'removed' };
        } if (obj1[key] !== obj2[key]) {
            return { key, value: { oldValue: obj1[key], newValue: obj2[key] }, status: 'updated' };
        }
        return { key, value: obj1[key], status: 'unchanged' };
    });
    return diff;
};

export default generateDiff;
