'use strict';

const test = require('tape');
const diff = require('sinon-called-with-diff');
const sinon = diff(require('sinon'));

const {
    writeTmpFileSync,
} = require('..');

test('renamify-cli: readdirSync', (t) => {
    const tmpdir = '/tmpdir';
    const writeFileSync = sinon.stub();
    const writeFile = writeTmpFileSync({
        writeFileSync,
    });
    
    const data = 'hello';
    writeFile(tmpdir, data);
    
    const expected = [
        `${tmpdir}/renamify`,
        data,
    ];
    
    t.ok(writeFileSync.calledWith(...expected), 'should call mkdtempSync');
    t.end();
});

