#!/usr/bin/env node

'use strict';

console.log(process.argv.slice(2));

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
const tmpFile = writeTmpFileSync(tmpdir(), names.join('\n'));

const editor = EDITOR || 'vim';
execSync(`${editor} ${tmpFile}`, {
    stdio: [0, 1, 2, 'pipe'],
});

const newNames = readFileSync(tmpFile, 'utf8')
    .replace(/\n$/, '')
    .split('\n')

renamify(dir, names, newNames, logIfError);

function logIfError(e) {
    if (e)
        error(e.message)
}

