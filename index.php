<?php
require('./assets/class/Autoloader.php');
Autoloader::register();
$objet = new Grille;








// $url = "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results}}";
// // data va coontenir les donner récupérer dasn l'api 
// $data = file_get_contents($url);
// $result = json_decode($data, true);
// var_dump( $result['newboard']['grids'][0]['value']);

// $data = json_decode(file_get_contents('php://input'), true);

// // Accéder aux données envoyées
// $tableauDeTableaux = $data['data'];

// // Affichage des données reçues
// var_dump($tableauDeTableaux);





?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sudoku</title>
        <link rel="stylesheet" href="./assets/css/style.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </head>
    <body>
        <noscript>Veuillez activer le JavaScript de votre navigateur car cette application utilise du JavaScript.</noscript>
        <h1>Grille de Sudoku</h1>
        <img class="imgPanda" src="./assets/img/petit-panda.png" alt="petit panda qui médite" width="200px">
        <div id="timer">
            <p>Timer &nbsp; </p> <p id="minutesTimer"> 00</p><p>:</p> <p id="secondesTimer">00</p> <p>.</p> <p id="milliSecondesTimer">00</p>
            <div>
                <button id="pause" class="buttonPlayPause">
                <i class="fa-solid fa-circle-pause"></i>
                </button>
                <button id="play" class="buttonPlayPause select">
                    <i class="fa-solid fa-circle-play"></i>
                </button>
            </div>
        </div>
        <?php
        $objet->getGrille();
        ?>
        <div class="containerButton">
            <div class="number">
                <button class="numb">1</button>
                <button class="numb">2</button>
                <button class="numb">3</button>
                <button class="numb">4</button>
                <button class="numb">5</button>
            </div>
            <div class="number">
                <button class="numb">6</button>
                <button class="numb">7</button>
                <button class="numb">8</button>
                <button class="numb">9</button>
            </div>
            <div class="containerBrouillionEffecer">
                <div>
                    <button class="brouillion">Effacer</button>
                </div>
                <div>
                    <button class="brouillion">Brouillion</button>
                </div>
            </div>
        </div>
        <!-- <form action="#" method="post">
            <input id="grille" name="grille" type="text">
            <input id="save" value="save" type="submit">
        </form> -->

    <script src="./assets/js/app.js"></script>
</body>
</html>