import {join} from 'node:path';
import currify from 'currify';

export const writeTmpFileSync = currify(({writeFileSync}, dir, data) => {
    const tmpFile = join(dir, 'renamify');
    
    writeFileSync(tmpFile, data);
    
    return tmpFile;
});
