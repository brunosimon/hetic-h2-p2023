<?php

    include './includes/config.php';

    $usersContent = file_get_contents('./includes/users.json');
    $users = json_decode($usersContent);

    include './partials/header.php';
?>

<table>
    <tr>
        <th>#</th>
        <th>Nom</th>
        <th>Date de naissance</th>
        <th>Type</th>
        <th>Actions</th>
    </tr>
    <?php foreach($users as $_key => $_user): ?>
        <tr>
            <td><?= $_key ?></td>
            <td><?php

                $label = 'M.';

                if($_user->gender === 'f')
                {
                    $label = $_user->married ? 'Mme.' : 'Mlle.';
                }

                echo "$label $_user->last_name";
            
            ?></td>
            <td><?= date('d/m/Y', $_user->date_of_birth) ?></td>
            <td><?= $user_types[$_user->typeId] ?></td>
            <td><a href="user.php?id=<?= $_key ?>">Details</a></td>
        </tr>
    <?php endforeach; ?>
</table>
    
<?php
    include './partials/footer.php';
?>