<?php 

    $users = [
        [
            'first_name' => 'Lucia',
            'last_name' => 'Atkins',
            'date_of_birth' => 730553019,
            'gender' => 'f',
            'married' => true,
            'type' => 0,
        ],
        [
            'first_name' => 'Kush',
            'last_name' => 'Bassett',
            'date_of_birth' => 934457019,
            'gender' => 'm',
            'married' => true,
            'type' => 0,
        ],
        [
            'first_name' => 'Arandeep',
            'last_name' => 'Drummond',
            'date_of_birth' => 894412800,
            'gender' => 'm',
            'married' => false,
            'type' => 1,
        ],
        [
            'first_name' => 'Emma-Louise',
            'last_name' => 'Blackwell',
            'date_of_birth' => 1161993600,
            'gender' => 'f',
            'married' => true,
            'type' => 1,
        ],
        [
            'first_name' => 'Faheem',
            'last_name' => 'Matthews',
            'date_of_birth' => 1325808000,
            'gender' => 'm',
            'married' => true,
            'type' => 0,
        ],
        [
            'first_name' => 'Victoria',
            'last_name' => 'Gregory',
            'date_of_birth' => 1103846400,
            'gender' => 'f',
            'married' => false,
            'type' => 2,
        ]
    ];

    $user_types = [
        'visitor',
        'writer',
        'administrator',
    ];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Utilisateurs</title>
    <style>
        th, td
        {
            padding: 10px;
        }
    </style>
</head>
<body>
    <h1>Utilisateurs</h1>
    <table>
        <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Date de naissance</th>
            <th>Type</th>
        </tr>
        <?php foreach($users as $_key => $_user): ?>
            <tr>
                <td><?= $_key ?></td>
                <td><?php
                    $label = 'M.';
                    if($_user['gender'] === 'f')
                    {
                        $label = $_user['married'] ? 'Mme.' : 'Mlle.';
                    }
                    echo $label.' '.$_user['first_name'].' '.$_user['last_name'][0].'.';
                ?></td>
                <td><?php echo date('d/m/Y', $_user['date_of_birth']) ?></td>
                <td><?php echo $user_types[$_user['type']] ?></td>
            </tr>
        <?php endforeach ?>
    </table>
</body>
</html>