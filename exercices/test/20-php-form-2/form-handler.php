<?php

// Messages
$errorMessages = [];
$successMessages = [];

// Default
$login = '';
$password = '';
$age = '';
$gender = '';

// Form sent
if(!empty($_POST))
{
    // // Debug
    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';

    // Sanatize data
    $login = strip_tags(trim($_POST['login']));
    $password = $_POST['password'];
    $age = (int)$_POST['age'];
    $gender = !isset($_POST['gender']) ? '' : strip_tags(trim($_POST['gender']));

    // Handle errors
    if(empty($login))
    {
        $errorMessages[] = 'Missing login';
    }

    if(empty($password))
    {
        $errorMessages[] = 'Missing password';
    }
    elseif(strlen($password) < 5)
    {
        $errorMessages[] = 'Password too short';
    }
    elseif(!preg_match('/[0-9]/', $password) || !preg_match('/[a-z]/', $password) || !preg_match('/[A-Z]/', $password))
    {
        $errorMessages[] = 'Password must contain numbers, lowercase and uppercase';
    }

    if($age < 1 || $age > 127)
    {
        $errorMessages[] = 'Wrong age';
    }

    if(empty($gender))
    {
        $errorMessages[] = 'Missing gender';
    }
    else if(!in_array($gender, $genders))
    {
        $errorMessages[] = 'Wrong gender';
    }

    // Success
    if(count($errorMessages) === 0)
    {
        // Reset
        $login = '';
        $password = '';
        $age = '';
        $gender = '';

        // Message
        $successMessages[] = 'You are now registered';
    }
}