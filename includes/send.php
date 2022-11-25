<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_POST) {
    $recipient = "info@hiralshahh.com";
    $subject = 'Need information About';
    $visitor_name = "";
    $visitor_email= "";
    $message = "";
    $fail = array();
// This will clear and will store the first name
    if (isset($_POST['firstname']) && !empty($_POST['firstname'])) {
        $visitor_name = filter_var($_POST['firstname'], FILTER_SANITIZE_STRING);
    }else{
        array_push($fail, "firstname");
    }
// This will clean last name and will store the last name
    if (isset($_POST['lastname']) && !empty($_POST['lastname'])) {
        $visitor_name .= filter_var($_POST['lastname'], FILTER_SANITIZE_STRING);
    }else{
        array_push($fail, "lastname");
    }
// this will clean the email and will store visitor email id
    if (isset($_POST['email']) && !empty($_POST['email'])) {
        $email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['email']);
        $visitor_email = filter_var($email, FILTER_VALIDATE_EMAIL);
    }else{
        array_push($fail, "email");
    }
// this will clean will message and will store it
    if (isset($_POST['message']) && !empty($_POST['message'])) {
        $clean = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
        $message = htmlspecialchars($clean);
    }else{
        array_push($fail, "message");
    }
//my email id will go here
    $headers  = 'MIME-Version: 1.0' . "\r\n"
    .'Content-type: text/html; charset=utf-8' . "\r\n"
    .'From: ' . $visitor_email . "\r\n";
    if (count($fail)==0) {
        mail($recipient, $subject, $message, $headers);
        $results['message'] = sprintf('Thank you for contacting us, %s. You will get a reply within 24 hours', $visitor_name);
    } else {
        header('HTTP/1.1 488 You Did NOT fill out the form correctly');
        die(json_encode(["message" => $fail]));
    }
} else {
    $results['message'] = 'Please check every reuqired fileds and try again.';
}

echo json_encode($results);

?>