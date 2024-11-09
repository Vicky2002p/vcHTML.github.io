<?php
header('Content-Type: application/json');

// Read JSON input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

$name = $input['name'] ?? '';
$mobile = $input['mobile'] ?? '';
$email = $input['email'] ?? '';
$message = $input['message'] ?? '';

// Validate input
if (empty($name) || empty($mobile) || empty($email) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all fields.']);
    exit;
}

$to = 'makingalotmoney6@gmail.com'; // Your email address
$subject = 'New Contact Form Submission';
$body = "Name: $name\nMobile: $mobile\nEmail: $email\nMessage: $message";
$headers = "From: noreply@yourdomain.com\r\n"; // Suggested to use a domain-specific email address
$headers .= "Reply-To: $email\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'Email sent successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Email sending failed.']);
}
?>
