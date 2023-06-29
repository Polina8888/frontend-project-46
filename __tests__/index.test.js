import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import { dirname } from 'node:path';
import path from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const extension = ['yml', 'json'];

test.each(extension)('gendiff check', (ext) => {
  const file1Path = getFixturePath(`file1.${ext}`);
  const file2Path = getFixturePath(`file2.${ext}`);

  expect(gendiff(file1Path, file2Path, 'stylish')).toBe(readFileSync(getFixturePath('result.stylish.txt'), 'utf8'));
  expect(gendiff(file1Path, file2Path, 'plain')).toBe(readFileSync(getFixturePath('result.plain.txt'), 'utf8'));
  expect(gendiff(file1Path, file2Path, 'json')).toBe(readFileSync(getFixturePath('result.json'), 'utf8'));
  expect(gendiff(file1Path, file2Path)).toBe(readFileSync(getFixturePath('result.stylish.txt'), 'utf8'));
});
