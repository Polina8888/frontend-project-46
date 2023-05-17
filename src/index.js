#!/usr/bin/env node

import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import _ from 'lodash';
import parsers from './parsers.js';

const getAbsoluteFilePath = (filepath) => path.resolve(cwd(), filepath);

const generateDiff = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const keys = _.sortBy(_.union(keys1, keys2));
    const result = {};
    keys.map((key) => {
        if (!Object.hasOwn(obj1, key)) {
            result[`+ ${key}`] = obj2[key];
        } else if (!Object.hasOwn(obj2, key)) {
            result[`- ${key}`] = obj1[key];
        } else if (obj1[key] !== obj2[key]) {
            result[`- ${key}`] = obj1[key];
            result[`+ ${key}`] = obj2[key];
        } else {
            result[`  ${key}`] = obj1[key];
        }
        return result;
    });
    const arr = _.toPairs(result);
    const newArr = arr.map((item) => item.join(' : ')).join('\n  ');
    return `{\n  ${newArr}\n}`;
};
export default (filepath1, filepath2) => {
    const absoluteFilepath1 = getAbsoluteFilePath(filepath1);
    const absoluteFilepath2 = getAbsoluteFilePath(filepath2);
    const format = path.extname(filepath1);
    const parse = parsers(format);
    const data1 = parse(readFileSync(absoluteFilepath1, 'utf-8'));
    const data2 = parse(readFileSync(absoluteFilepath2, 'utf-8'));
    return generateDiff(data1, data2);
};
