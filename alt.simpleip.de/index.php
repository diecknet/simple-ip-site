<?php
if (isset($_SERVER['HTTP_ORIGIN'])){
    switch($_SERVER['HTTP_ORIGIN']){    
        case 'https://www.simpleip.de':
            header('Access-Control-Allow-Origin: https://www.simpleip.de');
        break;
        case 'http://www.simpleip.de':
            header('Access-Control-Allow-Origin: http://www.simpleip.de');
        break;
        case 'http://simpleip.de':
            header('Access-Control-Allow-Origin: http://simpleip.de');
        break;
        default:
            header('Access-Control-Allow-Origin: https://simpleip.de');
        break;
    }
} else {
    header('Access-Control-Allow-Origin: https://simpleip.de');
}
header('Access-Control-Allow-Methods: GET');
header('Content-Type: text/plain; charset=utf-8');
header("Cache-Control: no-cache, no-store, must-revalidate");

// print ip address
print $_SERVER['REMOTE_ADDR'];
?>