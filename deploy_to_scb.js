var exec = require('child_process').exec;

var cmdStr = 'scp -P 22 -C -r ' + __dirname + '\\dist\\* scb_web@scb.project.hostlink.com.hk:public_html/cms'; // Launch to Development Site
exec(cmdStr, function (err, stdout, stderr) {
    console.log("done... dist to cms");


    cmdStr = 'scp -P 22 -C -r ' + __dirname + '\\config.json scb_web@scb.project.hostlink.com.hk/cms'; // Launch to Development Site
    exec(cmdStr, function (err, stdout, stderr) {
        console.log("done... copy config.json");
    });

});


