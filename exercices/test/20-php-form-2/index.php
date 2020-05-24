<?php

    include './config.php';
    include './form-handler.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Form</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Form</h1>

    <?php foreach($errorMessages as $_message): ?>
        <div class="message error"><?= $_message ?></div>
    <?php endforeach; ?>

    <?php foreach($successMessages as $_message): ?>
        <div class="message success"><?= $_message ?></div>
    <?php endforeach; ?>

    <form action="#" method="post">

        <fieldset>
            <label for="login">Login</label>
            <br>
            <input id="login" type="text" name="login" placeholder="totodu93" value="<?= $login ?>">
        </fieldset>

        <fieldset>
            <label for="password">Password</label>
            <br>
            <input id="password" type="password" name="password" placeholder="*******" value="<?= $password ?>">
        </fieldset>

        <fieldset>
            <label for="age">Age</label>
            <br>
            <input id="age" type="text" name="age" placeholder="25" value="<?= $age ?>">
        </fieldset>

        <fieldset>
            <label>Gender</label>
            <?php foreach($genders as $_gender): ?>
                <br>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="<?= $_gender ?>"
                        <?= $_gender === $gender ? 'checked' : '' ?>
                    >
                    <?= ucfirst($_gender) ?>
                </label>
            <?php endforeach; ?>
        </fieldset>

        <fieldset>
            <input type="submit">
        </fieldset>

    </form>

</body>
</html>