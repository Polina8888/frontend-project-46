import { fileURLToPath } from 'url';
import { dirname, path } from 'path';
import { readFileSync } from 'fs';
import test from 'node:test';
import { expect } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json check', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.json');
    const resultPath = getFixturePath('result.file.txt');
    const result = readFileSync(resultPath, 'utf8');
    const diff = gendiff(file1Path, file2Path);
    expect(diff).toBe(result);
});

test('yml check', () => {
    const file1Path = getFixturePath('file1.yml');
    const file2Path = getFixturePath('file2.yml');
    const resultPath = getFixturePath('result.file.txt');
    const result = readFileSync(resultPath, 'utf8');
    const diff = gendiff(file1Path, file2Path);
    expect(diff).toBe(result);
});
