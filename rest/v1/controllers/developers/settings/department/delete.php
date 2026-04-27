<?php
//set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use models
require '../../../../models/developers/settings/department/department.php';

$conn = null;
$conn = checkDBConnection();

$val = new Department($conn);

if (array_key_exists("id", $_GET)) {
    $val->department_aid = $_GET['id'];

    checkId($val->department_aid);

    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Roles Delete", $query);
}


checkEndpoint();
