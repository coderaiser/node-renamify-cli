'use strict';

const {join} = require('path');
const currify = require('currify');

module.exports.writeTmpFileSync = currify(({writeFileSync}, dir, data) => {
    const tmpFile = join(dir, 'renamify');
    
    writeFileSync(tmpFile, data);
    
    return tmpFile;
});

