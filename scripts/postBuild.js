var fs = require('fs');

fs.writeFile('build/processAction.php', "<?php include_once $_SERVER['DOCUMENT_ROOT'] . '/api/processAction.php'; ?>", function (err) {
    if (err) throw err;
    console.log('processAction redirect file created.');
});