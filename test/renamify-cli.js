import {test, stub} from 'supertape';
import {writeTmpFileSync} from '../lib/renamify-cli.js';

test('renamify-cli: readdirSync', (t) => {
    const tmpdir = '/tmpdir';
    const writeFileSync = stub();
    const writeFile = writeTmpFileSync({
        writeFileSync,
    });
    
    const data = 'hello';
    
    writeFile(tmpdir, data);
    
    const expected = [
        `${tmpdir}/renamify`,
        data,
    ];
    
    t.calledWith(writeFileSync, expected, 'should call mkdtempSync');
    t.end();
});
