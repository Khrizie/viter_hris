<?php

//set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use models
require '../../../models/developers/memo/Memo.php';

$conn = null;
$conn = checkDBConnection();

$val = new Memo($conn);

if (array_key_exists("id", $_GET)) {
    $val->memo_aid = $_GET['id'];

    checkId($val->memo_aid);

    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Memo Delete", $query);
}

checkEndpoint();
