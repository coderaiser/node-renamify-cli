#!/usr/bin/env node

'use strict';

const arg = process.argv
    .slice(2)
    .pop();

if (/^(-v|--version)$/.test(arg)) {
    console.log(require('../package').version);
    return;
}

const {join} = require('path');
const rimraf = require('rimraf');

const {error} = console;
const {execSync} = require('child_process');
const {
    readFileSync,
    writeFileSync,
    mkdtempSync,
    readdirSync,
} = require('fs');

const writeTmpFileSync = require('..').writeTmpFileSync({
    readFileSync,
    writeFileSync,
    mkdtempSync,
});

const {tmpdir} = require('os');
const renamify = require('renamify');

const {
    EDITOR,
} = process.env;

const dir = process.cwd();
const names = readdirSync(dir)

const tmpDir = mkdtempSync(join(tmpdir(), 'renamify'));
const tmpFile = writeTmpFileSync(tmpDir, names.join('\n'));

const editor = EDITOR || 'vim';
execSync(`${editor} ${tmpFile}`, {
    stdio: [0, 1, 2, 'pipe'],
});

const newNames = readFileSync(tmpFile, 'utf8')
    .replace(/\n$/, '')
    .split('\n')

const rmTmp = () => rimraf.sync(tmpDir);

renamify(dir, names, newNames)
    .then(rmTmp)
    .catch(logError);

function logError(e) {
    error(e.message)
}
