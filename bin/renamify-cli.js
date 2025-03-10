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
import tryToCatch from 'try-to-catch';
import {writeTmpFileSync} from '../lib/renamify-cli.js';

const arg = process
    .argv
    .slice(2)
    .pop();

if (/^(-v|--version)$/.test(arg)) {
    const require = createRequire(import.meta.url);
    console.log(require('../package').version);
    process.exit();
}

const write = writeTmpFileSync({
    readFileSync,
    writeFileSync,
    mkdtempSync,
});

const {EDITOR} = process.env;

const dir = process.cwd();
const names = readdirSync(dir);

const tmpDir = mkdtempSync(join(tmpdir(), 'renamify'));
const tmpFile = write(tmpDir, names.join('\n'));

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

const [error] = await tryToCatch(renamify, dir, names, newNames);

if (error)
    logError(error);

await rm(tmpDir, {
    recursive: true,
});

function logError(e) {
    console.error(e.message);
}
