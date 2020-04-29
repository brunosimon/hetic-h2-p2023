<?php

    require './includes/articles.php';

    $title = 'Blog';
    include './includes/header.php';

?>
    <?php foreach($articles as $key => $article) { ?>
        <article>
            <h2><?php echo $article['title']; ?></h2>
            <p><?php echo $article['description']; ?></p>
            <a href="article.php?id=<?php echo $key; ?>">Lire la suite</a>
        </article>
    <?php } ?>
    
<?php include './includes/footer.php'; ?>