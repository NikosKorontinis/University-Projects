

<?php
// users.php

// Sample user data (you can replace this with data from your database)
$users = array(
    array('id' => 1, 'name' => 'John'),
    array('id' => 2, 'name' => 'Jane'),
    // More users...
);

// Handle GET request to /myapi/users
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Set the appropriate headers
    header('Content-Type: application/json');
    // Return the users as JSON
    echo json_encode($users);
} else {
    // Method not allowed
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('message' => 'Method not allowed'));
}
?>
