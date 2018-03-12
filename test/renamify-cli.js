'use strict';

const test = require('tape');
const diff = require('sinon-called-with-diff');
const sinon = diff(require('sinon'));

const {
    writeTmpFileSync,
} = require('..');

test('renamify-cli: mkdtempSync', (t) => {
    const writeFileSync = sinon.stub();
    const mkdtempSync = sinon
        .stub()
        .returns('');
    
    const writeFile = writeTmpFileSync({
        writeFileSync,
        mkdtempSync
    });
    
    writeFile('/', 'hello');
    
    t.ok(mkdtempSync.calledWith('/renamify'), 'should call mkdtempSync');
    t.end();
});

test('renamify-cli: readdirSync', (t) => {
    const tmpdir = '/tmpdir';
    const writeFileSync = sinon.stub();
    const mkdtempSync = sinon
        .stub()
        .returns(tmpdir);
    
    const writeFile = writeTmpFileSync({
        writeFileSync,
        mkdtempSync
    });
    
    const data = 'hello';
    writeFile('/', data);
    
    const expected = [
        `${tmpdir}/renamify`,
        data
    ];
    
    t.ok(writeFileSync.calledWith(...expected), 'should call mkdtempSync');
    t.end();
});

