<?php
// Assuming content-type is set to application/json
$data = json_decode(file_get_contents("php://input"), true);

// You can then access your data like this
$name = $data['name'];
$mobile = $data['mobile'];
$email = $data['email'];
$message = $data['message'];

// Process the data, store it in a database, send email, etc.

// Return a response
echo json_encode(["status" => "success", "message" => "Form submitted successfully!"]);
?>
