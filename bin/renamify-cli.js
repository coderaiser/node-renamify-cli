#!/usr/bin/env node

import {createRequire} from 'node:module';
import process from 'node:process';
import {join} from 'node:path';
import {execSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {rm} from 'node:fs/promises';
import {
    readFileSync,
    writeFileSync,
    mkdtempSync,
    readdirSync,
} from 'node:fs';
import renamify from 'renamify';
import {tryToCatch} from 'try-to-catch';
import {writeTmpFileSync} from '../lib/renamify-cli.js';

const joinOne = (a) => (b) => join(a, b);

const arg = process.argv
    .slice(2)
    .pop();

if (/^(-v|--version)$/.test(arg)) {
    const require = createRequire(import.meta.url);
    console.log(require('../package').version);
    process.exit();
}

const write = writeTmpFileSync({
    writeFileSync,
});

const {EDITOR} = process.env;

const dir = process.cwd();
let names = readdirSync(dir);

if (arg === '--full')
    names = names.map(joinOne(dir));

const tmpDir = mkdtempSync(join(tmpdir(), 'renamify'));
const namesFile = names.join('\n');
const tmpFile = write(tmpDir, namesFile);

const editor = EDITOR || 'vim';
execSync(`${editor} ${tmpFile}`, {
    stdio: [
        0,
        1,
        2,
        'pipe',
    ],
});

const newFile = readFileSync(tmpFile, 'utf8');

await rm(tmpDir, {
    recursive: true,
});

if (newFile === namesFile)
    process.exit();

const newNames = newFile
    .replace(/\n$/, '')
    .split('\n');

const [error] = await tryToCatch(renamify, dir, names, newNames);

if (error)
    logError(error);

function logError(e) {
    console.error(e.message);
}
