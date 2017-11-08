import fs from 'fs';
export default function deleteFiles(files, callback){
    let i = files.length;
    files.forEach((filepath)=>{

        fs.unlink(__dirname + filepath, function(err) {
            i--;
            if (err) {
                callback(err);
                return;
            } else if (i <= 0) {
                callback(null);
            }
        });
    });
}