# Devoir 02 - video player: 

#### Je suis :
- Félix Guérin
- H2 P2022 G1

#### Configuration :

#### Navigateur recommandé :
- Google Chrome
Le player marche sur Opera, firefox et safari (Safari ne remet pas la vidéo au temps d'arrêt lorsque l'on chnage la qualité)

#### Tech :

- 3 ou 4 animations CSS
- JS animations
- Algorithme JS

#### Fonctionnalités JS :

- Play/Pause :
. bouton au centre qui gère play/pause
. barre d'espace qui gère play/pause également

- Gestion du temps :
. drag en drop sur le petit dixième de cercle qui tourne autour du centre
. flèche gauche/droite pour respectivement reculer/avancer de 5 secondes dans la video
. timer en temps réel 

- Gestion du son
. click sur un endroit de la barre pour augmenter/baisser
. drag and drop sur la barre de son en cliquant du le cercle
. click sur l'icone pour muted la video et reclick pour remettre au son d'avant
. icone modifiée en fonction du son
. gestion du volume avec les flèches haut et bas

- Gestion de la vitesse
. click sur les différentes vitesses dans le menu settings pour changer la vitesse de la vidéo

- Gestion du fullScreen
. Click sur le bouton en bas à droite pour lancer le mode plein écran
. bouton Echap ou reclick pour en sortir

- Gestion de la Qualité
. passage de haute qualité à basse qualité en haut à droite de l'écran (720p to 270p)
. Temps, état de la vidéo et son identiques lors du passage à une autre qualité

- Gestion des controls
. Les controles disparaissent si on quitte la zone de vidéo ou si l'ont attend 5 secondes sans bouger (surtout utile pour full screen)

#### Problèmes rencontrés :

- Image de départ (centrer après un letter-spacing)
- Utilisation des hover dans le CSS qui m'ont bloqué par la suite
- Fullscreen avec firefox (Je trouvais pas le S majuscule à changer haha)
- Changer le JS pour mettre plus sous formes de fonctions et appel de fonctions (le change speed, volume ... étant utilisés plusieurs fois)

#### Notes :

- Veuillez m'excuser si les vidéos sont un peu trop lourdes, je voulais pas vous infliger seulement le 270p lors de la correction sachant que les images sont magnifiques. Je les ai donc coupées un peu.

#### Futures améliorations :

- Utiliser des vidéos de meilleures qualités en les mettant sur une url
- Faire une timeline circulaire mais en augmentant la border au fur et à mesure (plutot qu'un bout de cerlce qui tourne pour une meilleure compréhension de l'utilisateur). Mais il me semble que c'est pas possible sans utiliser des canvas.
- Ajout de sous-titres
