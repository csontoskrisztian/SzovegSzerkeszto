//Elemek kigyűjtése
let buttonH1 = document.getElementById('buttonH1');
let buttonP = document.getElementById('buttonP');
let buttonStrong = document.getElementById('buttonStrong');
let buttonRed = document.getElementById('buttonRed');
let input = document.getElementById('input');
let output = document.getElementById('output');

RenderOutput();

//Események és eseménykezelők
buttonH1.addEventListener('click', OnClickH1);
buttonP.addEventListener('click', OnClickP);
buttonStrong.addEventListener('click', OnClickStrong);
buttonRed.addEventListener('click', OnClickRed)
input.addEventListener('keyup', RenderOutput);

function OnClickH1() {
    let startTag = "<h1>"
    let endTag = "</h1>"
    
    Changer(startTag, endTag);
}

function OnClickP() {
    let startTag = "<p>"
    let endTag = "</p>"
    
    Changer(startTag, endTag);
}

function OnClickStrong() {
    let startTag = "<Strong>";
    let endTag = "</Strong>";
    Changer(startTag, endTag);
}

function OnClickRed() {
    let startTag = "<span style='color: red;'>";
    let endTag = "</span>";
    Changer(startTag, endTag);
}

function RenderOutput() {
    let html = input.value;

    output.innerHTML = html;
}

//Értékadó függények
function Changer(startTag, endTag){
    let text = input.value;
    let start = input.selectionStart;
    let end = input.selectionEnd;

    input.value = GetWrappedSelection(text, start, end, startTag, endTag);
    RenderOutput();
}

function GetWrappedSelection(text, start, end, startTag, endTag){
    let left = text.slice(0, start);
    let middle = text.slice(start, end);
    let right = text.slice(end);

    let newText = `${left}${startTag}${middle}${endTag}${right}`;
    return newText;
}