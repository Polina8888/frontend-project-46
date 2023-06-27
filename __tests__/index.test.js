import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import { dirname } from 'node:path';
import path from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json check stylish', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.json');
    const resultPath = getFixturePath('result.stylish.txt');
    const result = readFileSync(resultPath, 'utf8');
    const diff = gendiff(file1Path, file2Path);
    expect(diff).toBe(result);
});

test('yml check stylish', () => {
    const file1Path = getFixturePath('file1.yml');
    const file2Path = getFixturePath('file2.yml');
    const resultPath = getFixturePath('result.stylish.txt');
    const result = readFileSync(resultPath, 'utf8');
    const diff = gendiff(file1Path, file2Path);
    expect(diff).toBe(result);
});

test('json check plain', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.json');
    const resultPath = getFixturePath('result.plain.txt');
    const result = readFileSync(resultPath, 'utf8');
    const diff = gendiff(file1Path, file2Path, 'plain');
    expect(diff).toBe(result);
});

test('yml check stylish', () => {
    const file1Path = getFixturePath('file1.yml');
    const file2Path = getFixturePath('file2.yml');
    const resultPath = getFixturePath('result.plain.txt');
    const result = readFileSync(resultPath, 'utf8');
    const diff = gendiff(file1Path, file2Path, 'plain');
    expect(diff).toBe(result);
});

test('json check JSON', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.json');
    const resultPath = getFixturePath('result.json');
    const result = readFileSync(resultPath, 'utf8');
    const diff = gendiff(file1Path, file2Path, 'json');
    expect(diff).toBe(result);
});

test('yml check JSON', () => {
    const file1Path = getFixturePath('file1.yml');
    const file2Path = getFixturePath('file2.yml');
    const resultPath = getFixturePath('result.json');
    const result = readFileSync(resultPath, 'utf8');
    const diff = gendiff(file1Path, file2Path, 'json');
    expect(diff).toBe(result);
});
