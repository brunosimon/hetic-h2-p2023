<?php

    // Set up
    $path = dirname(__FILE__).'/../cours/';
    $ignore  = array('.','..','src');
    $files   = array();
    $entries = array();

    // Read dir
    if($handle = opendir($path))
    {
        while (false !== ($entry = readdir($handle)))
            if(!in_array($entry,$ignore) && is_dir($path.$entry))
                $entries[] = $entry;

        closedir($handle);
    }

    // Sort
    sort($entries);

    // Each entry
    foreach($entries as $_entry)
    {
        // Parse folder name
        $matches = array();
        preg_match_all("/(?:cours\_)?(.*)-(.*)/",$_entry,$matches);
        $file            = new stdClass();
        $file->url       = '../cours/'.$_entry.'/';
        $file->num       = $matches[1][0];
        $file->title     = $matches[2][0];
        $file->resources = array();

        // Resources
        $glob = glob($path.$_entry.'/*.zip');
        foreach($glob as $_glob)
        {
            $resource          = new stdClass();
            $basename          = basename($_glob);
            $resource->url     = '../cours/'.$_entry.'/'.$basename;
            $resource->name    = $basename;
            $file->resources[] = $resource;
        }

        $files[] = $file;
    }

?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Développement Web - H2 P2023 - Bruno Simon</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>

    <!-- Nav -->
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">H2 P2023 - Dév<span class="hidden-xs">eloppement</span> Web</a>
            <ul class="nav navbar-nav navbar-right">
                <li><a class="btn btn-light" href="https://github.com/brunosimon/hetic-h2-p2023" target="_blank">GitHub</a></li>
            </ul>
        </div>
    </nav>

    <!-- Index -->
    <div class="container pt-4 pr-0 pl-0">
        <table class="table table-striped">
            <tr>
                <th class="number">#</th>
                <th class="title">Title</th>
                <th class="action text-right">Actions</th>
            </tr>
            <?php foreach($files as $_file): ?>
                    <tr>
                        <td class="num"><?php echo $_file->num; ?></td>
                        <td class="title"><?php echo $_file->title; ?></td>
                        <td class="action text-right">

                            <?php foreach($_file->resources as $_resource): ?>
                                <a class="btn btn-default" href="<?php echo $_resource->url ?>" target="_blank"><i class="glyphicon glyphicon-download glyphicon-white hidden-xs"></i> <?= $_resource->name ?></a>
                            <?php endforeach; ?>

                            <a class="btn btn-primary" href="<?php echo $_file->url ?>" target="_blank">Open</a>
                        </td>
                    </tr>
            <?php endforeach; ?>
        </table>
    </div>
</body>
</html>
