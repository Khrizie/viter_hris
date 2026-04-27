<?php

$conn = null;
$conn = checkDBConnection();
$val = new Notification($conn);

if (array_key_exists("id", $_GET)) {

    $val->notification_aid = $_GET['id'];
    $val->notification_first_name = $data['notification_first_name'];
    $val->notification_last_name = $data['notification_last_name'];
    $val->notification_email = $data['notification_email'];
    $val->notification_purpose = $data['notification_purpose'];
    $notification_first_name_old = $data['notification_first_name_old'];
    $notification_last_name_old = $data['notification_last_name_old'];
    $notification_email_old = $data['notification_email_old'];


    // validations
    checkId($val->notification_aid);
    compareName(
        $val,
        "{$notification_first_name_old} {$notification_last_name_old}",
        "{$val->notification_first_name} {$val->notification_last_name}"
    );
    compareEmail(
        $val,
        $notification_email_old,
        $val->notification_email
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "notification Update", $query);
}


checkEndpoint();
