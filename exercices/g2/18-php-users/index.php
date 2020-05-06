<?php

    // Config
    include './includes/config.php';

    // Fetch users
    $usersContents = file_get_contents('./includes/users.json');
    $users = json_decode($usersContents);

    // Header
    include './includes/header.php';

?>

<table>
    <tr>
        <th>#</th>
        <th>Nom</th>
        <th>Date de naissance</th>
        <th>Type</th>
        <th>Actions</th>
    </tr>
    
    <?php foreach($users as $key => $user): ?>

        <tr>
            <td><?= $key ?></td>
            <td><?php
                $civility = $user->gender === 'm' ? 'M.' : ($user->married ? 'Mme.' : 'Mlle.');
                echo "$civility $user->last_name";
            ?></td>
            <td><?= date('d/m/Y', $user->date_of_birth) ?></td>
            <td><?= $userTypes[$user->typeId] ?></td>
            <td>
                <a href="user.php?id=<?= $key ?>">Details</a>
            </td>
        </tr>

    <?php endforeach ?>

</table>

<?php

    include './includes/footer.php';

?>
