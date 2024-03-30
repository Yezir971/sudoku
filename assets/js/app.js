"use strict";

document.addEventListener('DOMContentLoaded', ()=>{
    let playPause = document.querySelectorAll('.buttonPlayPause');
    let caseEmpty = document.querySelectorAll('.empty');
    let sizeCaseEmpty = caseEmpty.length;
    let sec = document.getElementById('secondesTimer');
    let min = document.getElementById('minutesTimer');
    let milli = document.getElementById('milliSecondesTimer');
    let play = document.getElementById('play');
    let pause = document.getElementById('pause');
    let number = document.querySelectorAll('.numb');
    let contentEmptyText = document.querySelectorAll('.contentEmptyText');
    let containerGrilleSudoku = document.querySelectorAll('.case');
    let save = document.getElementById('save');
    let inputGrille = document.getElementById('grille');
    let tableau = document.getElementsByTagName('table');
    let tr = document.getElementsByTagName('tr');
    let interval;



    // a convertir en php 
    // async function generateurDeGrille(difficult) {
    //     const reponse = await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results}}");
    //     const grille = await reponse.json();
    //     let choixDifficult = difficult;
    //     if(grille.newboard.grids[0].difficulty != choixDifficult ){
    //         generateurDeGrille(choixDifficult); 
    //     }else{
    //         // si les info son les bonnes on envoie en post les informations pour les récupérer en php 
    //         let data = grille;
    //         fetch('index.php', {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             body:new URLSearchParams(data)
    //             // body: JSON.stringify(data)
    //         }).then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`ERREUR : ${response.status}`);
    //             }
    //             return response.json();
    //         }).then(data=>{console.log(data);})
    //         .catch(error=>{console.log(error);})

    //     }
    // }
    // generateurDeGrille("Medium");

    function editCaseEmpty(){
        // console.log(contentEmptyText);
        let selected = null;
        let selectedTable=null;
        let rowSelect = null; 
        let colSelect = null; 
        for(let i =0; i< sizeCaseEmpty ; i++){
            caseEmpty[i].addEventListener('click', ()=>{
                for(let j=0;j< sizeCaseEmpty; j++ ){
                    if(contentEmptyText[j].innerHTML == ""){
                        caseEmpty[j].style.background = "none";
                    }

                }
                caseEmpty[i].style.background = "rgba(255, 166, 0, 0.3)";
                selected = i; 
            });
        }
        for(let k=0 ; k<9 ; k++){
            let value = "";
            tableau[k].addEventListener('click', ()=>{
                selectedTable = k;
            });
            for(let j=0; j<3 ; j++){
                tableau[k].rows[j].addEventListener('click', ()=>{
                    rowSelect=j;
                })
            }
            for(let j=0; j<3 ; j++){
                for(let l=0; l<3; l++){
                    tableau[k].rows[j].cells[l].addEventListener('click', ()=>{
                        colSelect=l;
                    })

                }
            }

            number[k].addEventListener('click', ()=>{
                if(selected!= null){
                    let table = reconstitutionGrille();
                    value = number[k].innerText
                    contentEmptyText[selected].innerText = value;
                    checkPossible(table, number[k], selected,selectedTable, rowSelect, colSelect );
                    // console.log(reconstitutionGrille());
                }
            });
        }
    }
    editCaseEmpty();


    function reconstitutionGrille(){
        let grilleJs=[];
        for(let i=0; i<=72 ; i+=9){
            let sousGrilleJs = [];
            for(let j=0 ; j<9; j++){
                sousGrilleJs.push(containerGrilleSudoku[i+j].innerText);
            }
            grilleJs.push(sousGrilleJs);
        }
        return grilleJs;
    }
    


    reconstitutionGrille();
    console.log(reconstitutionGrille());


    /**
     * fonction qui va prendre en paramètre le numéro du tableau sélectonner et va retourner la ligne ou se trouve le tableau   
     * @param {*} selectedTable 
     */
    function tableRowSelect(selectedTable){
        switch (selectedTable) {
            case 0:
            case 1:
            case 2:
                return 0;
            case 3:
            case 4:
            case 5:
                return 1;
            case 6:
            case 7:
            case 8:
                return 2;
        
            default:
                console.error(`il y a eu un problème avec la fonction tableRowSelect, vous avez passer ${selectedTable} en paramètre`)
                break;
        }
    }
    /**
     * fonction qui va prendre en paramètre le numéro du tableau sélectonner et va retourner la colone ou se trouve le tableau   
     * @param {*} selectedTable 
     */
    function tableColumnSelect(selectedTable){
        switch (selectedTable) {
            case 0:
            case 3:
            case 6:
                return 0;
            case 1:
            case 4:
            case 7:
                return 1;
            case 2:
            case 5:
            case 8:
                return 2;
        
            default:
                console.error(`il y a eu un problème avec la fonction tableColumnSelect, vous avez passer ${selectedTable} en paramètre`)
                break;
        }
    }


    /**
     * 
     * @param {*} grilleReconstituer 
     * @param {*} number 
     * @param {*} position 
     * @param {*} selectedTable 
     * @param {int} rowSelect correspond a la ligne de la case selectionner 
     * @param {int} colSelect correspond a la colonne de la case selectionner 
     */
    function checkPossible(grilleReconstituer, number, position, selectedTable, rowSelect, colSelect){
        // console.log(grilleReconstituer);
        // console.log(position);
        console.log(selectedTable);



        // vérifications des nombres dans un carrée 
        let carreChechk = grilleReconstituer[selectedTable];
        // on suppose que le joueur ne s'est pas tromper par défaut et on va tester dans la boucle si il s'est trompé 
        caseEmpty[position].style.background = "green";
        // test carré 
        for(let i = 0 ; i<9; i++){
            if(carreChechk[i]==number.innerHTML){
                // console.log(carreChechk);
                // console.log(number.innerHTML);
                caseEmpty[position].style.background = "red";
            }
        }

        let rowTest=[];



        for(let i =0; i<3; i+=3){
            switch (rowSelect) {
                case 0:
                    rowTest = grilleReconstituer.slice(3*tableRowSelect(selectedTable),(3*tableRowSelect(selectedTable))+3);/* 9-9*/
                    
                    rowTest[i]  =rowTest[i].slice(0,3);/* 9-9 => 6*/
                    rowTest[i+1] = rowTest[i+1].slice(0,3); /* 9-3 =>  0,-6*/ 
                    rowTest[i+2] = rowTest[i+2].slice(0,3);/* 9-6 => 3,-3*/

                    break;
                case 1:
                    rowTest = grilleReconstituer.slice(3*tableRowSelect(selectedTable),(3*tableRowSelect(selectedTable))+3);/* 9-9*/ 
                    
                    rowTest[i]=rowTest[i].slice(3,6);/* 9-9 => 6*/
                    rowTest[i+1]=rowTest[i+1].slice(3,6); /* 9-3 =>  0,-6*/ 
                    rowTest[i+2]=rowTest[i+2].slice(3,6);/* 9-6 => 3,-3*/
                    break;
                case 2:
                    rowTest = grilleReconstituer.slice(3*tableRowSelect(selectedTable),(3*tableRowSelect(selectedTable))+3);/* 9-9*/
                    
                    rowTest[i]=rowTest[i].slice(6,9);/* 9-9 => 6*/
                    rowTest[i+1]=rowTest[i+1].slice(6,9); /* 9-3 =>  0,-6*/ 
                    rowTest[i+2]=rowTest[i+2].slice(6,9);/* 9-6 => 3,-3*/
                    break;
                default:
                    console.error(`Il y a un problème avec le test des lignes de la fonctions checkPossible ${rowSelect} a été passé dans le prédicat`)
                    break;
            }

        }
        let colTestFlag =[];
        let colTest = [];
        for(let i =0; i<9; i+=3){
            // console.log(`colonne selectionner dans le tableau : ${colSelect}`);
            colTestFlag = grilleReconstituer[i+tableColumnSelect(selectedTable)];
            for(let j=0; j<9; j+=3){
                colTest.push(colTestFlag[j+colSelect])
            }
        }



        console.log(rowTest);  

        // test des lignes
        for(let i = 0; i<3;i++){
            for(let j= 0; j<3; j++){
                if(rowTest[i][j]==number.innerHTML){
                    caseEmpty[position].style.background = "red";
                }
            }
        }
        // test des colonnes
        for(let i = 0; i<9;i++){
            if(colTest[i]==number.innerHTML){
                caseEmpty[position].style.background = "red";
            }
        }


    }



    


    // partie qui gère les butons play pause et le chrono 
    let secondes = 0;
    let minute=0;
    let milliSecondes = 0;

    for(let i=0; i<2; i++){
        playPause[i].addEventListener('click', ()=>{
            if(i%2 !=0){
                pause.classList.remove('select');
                play.classList.add('select');
            }else{
                play.classList.remove('select');
                pause.classList.add('select');
            }
        })
    }
    
    function chrono(){
        // console.log('hello');
        if(sec != null && min != null){

            milliSecondes++;
            milliSecondes = String(milliSecondes).padStart(2,"0")
            milli.innerText = milliSecondes;


            if(milliSecondes == 99){
                milliSecondes = 0;
                secondes++;
                secondes = String(secondes).padStart(2,"0")
                sec.innerText = secondes;
            }
            

            if(secondes == 59){
                secondes = 0;
                minute ++;
                minute = String(minute).padStart(2,"0")
                min.textContent = minute;
            }

        }

    }
    function startChrono() {
        if (!interval) {
            interval = setInterval(chrono,10);
        }
    }
    function stopChrono() {
        clearInterval(interval);
        // reset interval
        interval = null;
    }
    startChrono();
    play.addEventListener("click", startChrono);
    pause.addEventListener("click", stopChrono);

    
})