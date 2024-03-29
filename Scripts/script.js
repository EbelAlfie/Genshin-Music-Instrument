var instrumentType = "Lyre" ;
const notes = ["do", "re", "mi", "fa", "sol", "la", "si", "doAlt", "reAlt", "miAlt", "faAlt", "solAlt", "laAlt", "siAlt", "doBass", "reBass", "miBass", "faBass", "solBass", "laBass", "siBass"] ;
var buttons = [] ;

//Initialize key note index pair
var noteMap = new Map() ;
noteMap.set('q', 0);
noteMap.set('w', 1);
noteMap.set('e', 2);
noteMap.set('r', 3);
noteMap.set('t', 4);
noteMap.set('y', 5);
noteMap.set('u', 6);
noteMap.set('a', 7);
noteMap.set('s', 8);
noteMap.set('d', 9);
noteMap.set('f', 10);
noteMap.set('g', 11);
noteMap.set('h', 12);
noteMap.set('j', 13);
noteMap.set('z', 14);
noteMap.set('x', 15);
noteMap.set('c', 16);
noteMap.set('v', 17);
noteMap.set('b', 18);
noteMap.set('n', 19);
noteMap.set('m', 20);

main() ;

function main() {
    //loadAudio() ;
    initButtons() ;
    setupUserAction() ;
}

function loadAudio() { //Download all audio to local storage pro: Play faster cons: Hambur kuota
    notes.forEach((val) => {
        localStorage.setItem(
            val, 
            new Audio("../Assets/Audio/" + instrumentType + "/" + val + ".mp3")
        );
    }) ;
}

//Initialize buttons
function initButtons() {
    notes.forEach((val, i) => {
        buttons[i] = document.getElementById(val) ;
        buttons[i].addEventListener('click', function(){
            new Audio("../Assets/Audio/" + instrumentType + "/" + val + ".mp3").play() ;
        })
    }) ;
}

function setupUserAction() {
    //Keyboard events
    document.body.addEventListener('keydown', e => { //when pressed
        var key = e.key.toLowerCase() ;
        buttons[noteMap.get(key)].click(); //click the button
        buttons[noteMap.get(key)].classList.add('activeButton');
    }) ;

    document.body.addEventListener('keyup', e => { //when finger lifted from key
        var key = e.key.toLowerCase() ;
        buttons[noteMap.get(key)].classList.remove('activeButton');
    }) ;
    //document.body.addEventListener('unload', deleteLocal())
}

function deleteLocal() {
    console.log("test") ;
    notes.forEach((val) => {
        localStorage.removeItem(val) ;
    }) ;
}