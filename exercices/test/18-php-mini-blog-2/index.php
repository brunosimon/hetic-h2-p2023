<?php

    require './includes/config.php';
    require './includes/articles.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini Blog</title>
</head>
<body>
    <h1><a href="/">Mini Blog</a></h1>
    <?php foreach($articles as $_key => $_article) { ?>
        <article>
            <h3><?php echo $_article['title'] ?></h3>
            <p><?php echo $_article['description'] ?></p>
            <a href="article.php?id=<?php echo $_key ?>">Read more</a>
        </article>
    <?php } ?>
</body>
</html>