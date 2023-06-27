#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/index.js';

program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format', 'stylish')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2, { format }) => {
        console.log(gendiff(filepath1, filepath2, format));
    });

program.parse();
