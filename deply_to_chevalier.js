var exec = require('child_process').exec;

var cmdStr = 'scp -P 22 -C -r ' + __dirname + '\\dist\\* chevalier_web@erp-chevalier.hlhk.net:public_html/www'; // Launch to Development Site
exec(cmdStr, function (err, stdout, stderr) {
    console.log(err);
});