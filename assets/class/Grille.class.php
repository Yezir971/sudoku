<?php

class Grille{
    public $maVariable;
    public $difficulty;
    public function maFonction(){
        echo "toto est dans la fonction";
    }

    /**
     * méthode utile pour du debug qui permet de créer a la main une grille de sudoku
     *
     * @return void
     */
    public function setGrille(string $difficultyChoice){

        $url = "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results}}";
        // data va coontenir les donner récupérer dasn l'api 
        $data = file_get_contents($url);
        $result = json_decode($data, true);
        // var_dump($result['newboard']['grids'][0]['difficulty']);
        if($result['newboard']['grids'][0]['difficulty'] == $difficultyChoice){
            $this->difficulty = $result['newboard']['grids'][0]['difficulty'];
            $this->maVariable = $result['newboard']['grids'][0]['value'];
        }else{
            $this->setGrille($difficultyChoice);
        }





        // $this->maVariable = [ [0,1,7,4,6,5,5,9,2],[0,1,3,4,6,4,5,9,2],[0,1,7,4,6,6,5,9,2],[0,1,4,4,6,3,5,9,2],[0,1,1,4,6,0,5,9,2],[0,1,7,4,6,6,5,9,2],[0,1,7,4,6,7,5,9,2],[0,1,6,4,6,3,5,9,2],[0,1,4,4,6,3,5,9,2] ];
    //     $this->maVariable = [
    //     [6, 9, '', 2, 5, 4, 1, 7, 8],
    //     [1, 7, 8, 6, 9, 3, 2, 5, 4],
    //     [2, 5, 4, 1, 7, 8, 6,'', 3],
    //     [6, 9, 3, 2, 5, '', 1, 7, 8],
    //     [1, 7, '', 6, 9, 3, 2, 5, 4],
    //     [2, 5, 4, 1, 7, 8, 6, '', 3],
    //     [6, 9, 3, 2, 5, 4, 1, 7, 8],
    //     [1, '', 8, 6, 9, 3, 2, 5, 4],
    //     [2, 5, 4, 1, 7, 8, '', 9, 3]
    // ];
    }


    /**
     * méthode qui prend en paramètre un tableau, et affiche la grille du sudoku avec du html
     *
     * @return void
     */
    public function getGrille(){
        $this->setGrille("Hard");
        // $this->setGrille("Medium");
        // $this->setGrille("Medium");

        echo "<p class='diff'>Difficulté :". $this->difficulty . "</p>";
        echo "<div class='containerGrilleSudoku'>";
        for($i = 0 ; $i<=8 ; $i++){
            echo "<table>";
            for($j = 0 ; $j<=6; $j+=3){
                echo $j == 3 || $j == 6 ? "<tr>" : null;
                for($k=0; $k<3; $k++){
                    if($this->maVariable[$i][$j+$k] == 0){
                        echo "<td class='empty'><p class='case contentEmptyText'></p></td>";
                    }else{
                        echo "<td class='notEmpty'><p class='case'>" . $this->maVariable[$i][$j+$k] . "</p></td>";
                    }
                }
                echo $j == 3 || $j == 6 ? "</tr>" : null;
            }
            echo "</table>";
        }
        echo "</div>";

    }
}