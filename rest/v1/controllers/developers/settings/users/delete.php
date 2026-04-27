<?php
//set http header
require '../../../../core/header.php';
// use needed funcions
require '../../../../core/functions.php';
// use models
require '../../../../models/developers/settings/users/Users.php';

$conn = null;
$conn = checkDBConnection();

$val = new Users($conn);

if (array_key_exists("id", $_GET)) {
    $val->users_aid = $_GET['id'];

    checkId($val->users_aid);

    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Roles Delete", $query);
}


checkEndpoint();
