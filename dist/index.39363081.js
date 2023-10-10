const e=["do","re","mi","fa","sol","la","si","doAlt","reAlt","miAlt","faAlt","solAlt","laAlt","siAlt","doBass","reBass","miBass","faBass","solBass","laBass","siBass"];var s=[],t=new Map;t.set("q",0),t.set("w",1),t.set("e",2),t.set("r",3),t.set("t",4),t.set("y",5),t.set("u",6),t.set("a",7),t.set("s",8),t.set("d",9),t.set("f",10),t.set("g",11),t.set("h",12),t.set("j",13),t.set("z",14),t.set("x",15),t.set("c",16),t.set("v",17),t.set("b",18),t.set("n",19),t.set("m",20);//Initialize buttons
for(let t=0;t<21;t++)s[t]=document.getElementById(e[t]),s[t].addEventListener("click",function(){//document.getElementById(notes[i] + "Mp3").load();
//document.getElementById(notes[i] + "Mp3").play(); 
new Audio("../Assets/Audio/Lyre/"+e[t]+".mp3").play()});//Keyboard events
document.body.addEventListener("keydown",e=>{var a=e.key.toLowerCase();s[t.get(a)].click(),s[t.get(a)].classList.add("activeButton")}),document.body.addEventListener("keyup",e=>{var a=e.key.toLowerCase();s[t.get(a)].classList.remove("activeButton")});//# sourceMappingURL=index.39363081.js.map

//# sourceMappingURL=index.39363081.js.map
