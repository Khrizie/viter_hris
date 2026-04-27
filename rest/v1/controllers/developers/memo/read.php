<?php

$conn = null;
$conn = checkDBConnection();

$val = new Memo($conn);
$val->memo_is_active = '';
$val->search = '';

$query = checkReadAll($val);
http_response_code(200);
$result = getResultData($query);
return $result;
