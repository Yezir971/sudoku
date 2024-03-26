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

            number[k].addEventListener('click', ()=>{
                if(selected!= null){
                    value = number[k].innerText
                    contentEmptyText[selected].innerText = value;
                    let table = reconstitutionGrille();
                    checkPossible(table, number[k], selected);
                    console.log(tableau);
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
    
    // save.addEventListener('click', (e)=>{
    //     let toto = reconstitutionGrille();
    //     inputGrille.value = toto;
    //     console.dir(inputGrille);
    //     e.preventDefault();
    // });

    reconstitutionGrille();
    console.log(reconstitutionGrille())

    function checkPossible(grilleReconstituer, number, position){
        console.log('dans check');

        // console.log(position % 9);
        
        console.log(grilleReconstituer);
        console.log(position);

        for(let i=0; i<9; i++){
            console.log(grilleReconstituer[i]);

        }
        // if(grilleReconstituer[position] == number){
        //     caseEmpty[position].style.background = "red";
        //     return;
        // }
        // caseEmpty[i].style.background = "green";
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