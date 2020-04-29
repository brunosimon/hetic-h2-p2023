<?php

// Error and success messages
$errorMessages = [];
$successMessages = [];

// Form sent
if(!empty($_POST))
{
    // Clean data
    if(!isset($_POST['gender']))
    {
        $_POST['gender'] = '';
    }

    // Debug
    echo '<pre>';
    print_r($_POST);
    echo '</pre>';

    // Set data
    $login = $_POST['login'];
    $password = $_POST['password'];
    $age = (int)$_POST['age'];
    $gender = $_POST['gender'];

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
        $errorMessages[] = 'Password too simple';
    }

    if(empty($age))
    {
        $errorMessages[] = 'Missing age';
    }
    elseif($age < 1 || $age > 127)
    {
        $errorMessages[] = 'Wrong age';
    }

    if(empty($gender))
    {
        $errorMessages[] = 'Missing gender';
    }
    elseif(!in_array($gender, $genders))
    {
        $errorMessages[] = 'Wrong gender';
    }
}