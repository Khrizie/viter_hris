<?php

$conn = null;
$conn = checkDBConnection();
$val = new Users($conn);

if (array_key_exists("id", $_GET)) {

    $val->users_aid = $_GET['id'];
    $val->users_first_name = $data['users_first_name'];
    $val->users_last_name = $data['users_last_name'];
    $val->users_email = $data['users_email'];
    $val->users_role_id = $data['users_role_id'];
    $val->users_updated = date("Y-m-d H:m:s");

    $users_first_name_old = $data['users_first_name_old'];
    $users_last_name_old = $data['users_last_name_old'];
    $users_email_old = $data['users_email_old'];

    // validations
    checkId($val->users_aid);
    compareName(
        $val,
        "{$users_first_name_old} {$users_last_name_old}",
        "{$val->users_first_name} {$val->users_last_name}"
    );
    compareEmail(
        $val,
        $users_email_old,
        $val->users_email
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Users Update", $query);
}


checkEndpoint();
