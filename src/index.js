#!/usr/bin/env node

import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import parsers from './parsers.js';
import generateDiff from './gendiff.js';
import getFormatted from './formatters/index.js';

const getAbsoluteFilePath = (filepath) => path.resolve(cwd(), '__fixtures__', filepath);

export default (filepath1, filepath2, format = 'stylish') => {
  const absoluteFilepath1 = getAbsoluteFilePath(filepath1);
  const absoluteFilepath2 = getAbsoluteFilePath(filepath2);
  const formatOfFile = path.extname(filepath1);
  const parse = parsers(formatOfFile);
  const data1 = parse(readFileSync(absoluteFilepath1, 'utf-8'));
  const data2 = parse(readFileSync(absoluteFilepath2, 'utf-8'));
  return getFormatted(generateDiff(data1, data2), format);
};
