var exec = require('child_process').exec;

var cmdStr = 'scp -P 22021 -C -r ' + __dirname + '\\dist\\* app2@app2.hostlink.com.hk:public_html/www'; // Launch to Development Site
exec(cmdStr, function (err, stdout, stderr) {
    console.log("done... dist to www");

    cmdStr = 'scp -P 22021 -C -r ' + __dirname + '\\dist\\index.html app2@app2.hostlink.com.hk:public_html'; // Launch to Development Site
    exec(cmdStr, function (err, stdout, stderr) {
        console.log("done... copy index.html");
    });


    cmdStr = 'scp -P 22021 -C -r ' + __dirname + '\\config.json app2@app2.hostlink.com.hk:public_html/www'; // Launch to Development Site
    exec(cmdStr, function (err, stdout, stderr) {
        console.log("done... copy config.json");
    });

});


