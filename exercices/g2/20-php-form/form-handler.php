<?php

// Messages
$errorMessages = [];
$successMessages = [];

// Base values
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

    // Sanatize
    $login = trim(strip_tags($_POST['login']));
    $password = $_POST['password'];
    $age = (int)$_POST['age'];
    $gender = isset($_POST['gender']) ? $_POST['gender'] : '';

    // Errors
    if(empty($login))
    {
        $errorMessages[] = 'Missing login';
    }

    if(empty($password))
    {
        $errorMessages[] = 'Missing password';
    }
    else if(strlen($password) < 8)
    {
        $errorMessages[] = 'Password too short';
    }
    else if(!preg_match('/[a-z]/', $password) || !preg_match('/[A-Z]/', $password) || !preg_match('/[0-9]/', $password))
    {
        $errorMessages[] = 'Password should contain lowercase, uppercase and number';
    }

    if($age < 1 || $age > 130)
    {
        $errorMessages[] = 'Wrong age';
    }

    if(!in_array($gender, $genders))
    {
        $errorMessages[] = 'Wrong gender';
    }

    // Success
    if(empty($errorMessages))
    {
        $successMessages[] = 'You are now registered';

        // Reset values
        $login = '';
        $password = '';
        $age = '';
        $gender = '';
    }
}