<?php
//set http header
require '../../../../core/header.php';
// use needed funcions
require '../../../../core/functions.php';
// use models
require '../../../../models/developers/settings/notification/Notification.php';
// store models into variables

$conn = null;
$conn = checkDBConnection();

$val = new Notification($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    // check data if exist and data is reuired
    checkPayload($data);
    $val->notification_aid = $_GET['id'];
    $val->notification_is_active = trim($data['isActive']);

    //validate is id
    checkId($val->notification_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'notification active', $query);
}
// return 404 if endpoint not available
checkEndpoint();
