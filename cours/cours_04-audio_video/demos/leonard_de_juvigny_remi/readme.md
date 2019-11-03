# HTML5 Video Player

*par Rémi de Juvigny*

## Inspiration

* **Raccourcis claviers** : pour une meilleure UX, j'ai choisi de m'aligner sur les raccourcis du leader de la vidéo en ligne, YouTube.


* **Design** : la particularité du player est de flouter la vidéo dans la barre des contrôle pour que celle-ci se fonde dans la vidéo et permette une meilleure immersion. Ce procédé peut être trouvé dans le logiciel d'Apple QuickTime Player, et s'inspire des guidelines du [Fluent Design System](https://fluent.microsoft.com/) de Microsoft.

![Screenshot de QuickTime Player](http://cdn.osxdaily.com/wp-content/uploads/2015/12/airplay-video-from-quicktime-player-mac-os-x.jpg)

## Fonctionnalités

* Changer la vitesse de lecture.
* Activer et désactiver la lecture automatique.
* L'icône de volume donne une indication de la valeur de ce réglage.
* Glisser-déposer sur les barres de volume et de temps.
* La barre de contrôles disparaît si la souris est inactive.
* Mode nuit pour réduire la fatigue oculaire. Le fond passe en noir pur (idéal pour les écrans OLED), et un filtre rouge est appliqué pour atténuer la lumière bleue qui nuit au sommeil.
* Paramètres gardés en mémoire : tous les changements faits dans la barre de contrôle sont appliqués lors des futures visites de la page.

## Difficultés

* Obtenir l'effet de l'arrière-plan flouté a posé problème, la propriété `backdrop-filter` n'étant toujours qu'expérimentale.
* Compatibilité : l'usage de la propriété CSS `pointer-events` rend le player incompatible avec les versions d'IE inférieures à 10.
* Débogage : une grande partie du code est dédiée à la prévention de bugs dans des cas d'enchainements d'actions particuliers.

## Techniques utilisées

* `localStorage` pour garder en mémoire les préférences de l'utilisateur.
* `display : flex` pour la disposition des éléments dans la barre de contrôle et pour qu'ils se compactent lorsque la barre de volume apparaît.
* Police d'icônes [Material](https://material.io/icons/) de Google.

## Remerciements

* Bruno Simon pour le fichier `reset.min.css`.
* Adrien Vande Casteele pour ses retours sur l'expérience utilisateur et son aide au débogage.