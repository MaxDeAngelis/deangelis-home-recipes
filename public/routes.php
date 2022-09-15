<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/../include/modules/Router/router.php';


get('/', 'index.html');
get('/processAction.php', '../include/processAction.php');
get('/search', 'index.html');
get('/recipe/$id', 'index.html');


// // For GET or POST
// // The 404.php which is inside the views folder will be called
// // The 404.php has access to $_GET and $_POST
// any('/404','views/404.php');