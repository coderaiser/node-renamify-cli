#!/usr/bin/env node

import {createRequire} from 'node:module';
import process from 'node:process';
import {join} from 'node:path';
import {execSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {
    readFileSync,
    writeFileSync,
    mkdtempSync,
    readdirSync,
} from 'node:fs';
import {rimraf} from 'rimraf';
import renamify from 'renamify';

const require = createRequire(import.meta.url);
const arg = process
    .argv
    .slice(2)
    .pop();

if (/^(-v|--version)$/.test(arg)) {
    const require = createRequire(import.meta.url);
    console.log(require('../package').version);
    process.exit();
}

const writeTmpFileSync = require('..').writeTmpFileSync({
    readFileSync,
    writeFileSync,
    mkdtempSync,
});

const {error} = console;

const {EDITOR} = process.env;

const dir = process.cwd();
const names = readdirSync(dir);

const tmpDir = mkdtempSync(join(tmpdir(), 'renamify'));
const tmpFile = writeTmpFileSync(tmpDir, names.join('\n'));

const editor = EDITOR || 'vim';
execSync(`${editor} ${tmpFile}`, {
    stdio: [
        0,
        1,
        2,
        'pipe',
    ],
});

const newNames = readFileSync(tmpFile, 'utf8')
    .replace(/\n$/, '')
    .split('\n');

const rmTmp = () => rimraf.sync(tmpDir);

renamify(dir, names, newNames)
    .then(rmTmp)
    .catch(logError);

function logError(e) {
    error(e.message);
}
