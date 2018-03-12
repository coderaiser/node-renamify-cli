'use strict';

const {join} = require('path');
const currify = require('currify');

module.exports.writeTmpFileSync = currify(({writeFileSync, mkdtempSync}, dir, data) => {
    const tmpDir = mkdtempSync(join(dir, 'renamify'));
    const tmpFile = join(tmpDir, 'renamify');
    
    writeFileSync(tmpFile, data);
    
    return tmpFile;
});

