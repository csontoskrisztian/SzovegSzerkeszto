// Változók
let input = document.getElementById("input");
let output = document.getElementById("output");



// Lap újratöltésnél figyelmeztetés, hogy a módosítások elvesznek.
window.onbeforeunload = function () {
    return false;
}

// Output frissítése mikor változik az input
document.getElementById("input").addEventListener("input", RenderOutput);

// Kiírás Outputba az oldal megnyitásakor
RenderOutput();


//Események és eseménykezelők
// Gombok
for (let i = 0; i < document.getElementsByClassName("ButtonModifier").length; i++) {
    document.getElementsByClassName("ButtonModifier")[i].addEventListener('click', OnClickModifier);
}
// Betűszín inputok
for (let i = 0; i < document.getElementsByClassName("CInput").length; i++) {
    document.getElementsByClassName("CInput")[i].addEventListener('change', OnChangeColor);
}
// Háttér rádiógombok
for (let i = 0; i < document.getElementsByClassName("BGCRadio").length; i++) {
    document.getElementsByClassName("BGCRadio")[i].addEventListener('change', OnChangeBGColor);
}
// Lista
for (let i = 0; i < document.getElementsByClassName("ButtonModifierList").length; i++) {
    document.getElementsByClassName("ButtonModifierList")[i].addEventListener('click', OnClickModifierList);
}



// Az element id-je alapján megállítja mit használjon tagként
function OnClickModifier() {
    // console.log("Hello World")

    let startTag = "<" + this.id + ">";
    let endTag = "</" + this.id.split(" ")[0] + ">";
    // console.log(startTag, endTag)

    Changer(startTag, endTag);
}

// Gomb id megváltoztatása az adott rgb kód alapján
function OnChangeColor() {
    let red = document.getElementById("Menu_Color_R").value;
    let green = document.getElementById("Menu_Color_G").value;
    let blue = document.getElementById("Menu_Color_B").value;

    document.getElementsByClassName("Menu_Color_Button")[0].id = "span style='color: rgb(" + red + "," + green + "," + blue + ")'";
    document.getElementsByClassName("Menu_Color_Button")[0].style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
}

// Gomb id megváltoztatása az adott rádiógomb alapján
function OnChangeBGColor() {
    document.getElementsByClassName("Menu_Background_Color")[0].id = "span style='background-color: " + this.id + "'";
    document.getElementsByClassName("Menu_Background_Color")[0].style.backgroundColor = this.id;
}

// Lista beszúrása
function OnClickModifierList() {
    let startTag;
    let endTag;

    if (this.id == "ListUnordered") {
        startTag = "<ul>";
        endTag = "</ul>";
    } else if (this.id == "ListOrdered") {
        startTag = "<ol>";
        endTag = "</ol>";
    }


    let text = input.value;
    let start = input.selectionStart;
    let end = input.selectionEnd;
    let oldTag = "p";
    let newTag = "li";

    input.value = ChangeTagsInSelectedText(text, start, end, startTag, endTag, oldTag, newTag);

    RenderOutput();
}



// Kiírás outputba
function RenderOutput() {
    let html = input.value;

    output.innerHTML = html;
}

//Értékadó függények
function Changer(startTag, endTag) {
    let text = input.value;
    let start = input.selectionStart;
    let end = input.selectionEnd;

    input.value = GetWrappedSelection(text, start, end, startTag, endTag);
    RenderOutput();
}

function GetWrappedSelection(text, start, end, startTag, endTag) {
    let left = text.slice(0, start);
    let middle = text.slice(start, end);
    let right = text.slice(end);

    let newText = `${left}${startTag}${middle}${endTag}${right}`;
    return newText;
}

function ChangeTagsInSelectedText(text, start, end, startTag, endTag, oldTag, newTag) {
    let left = text.slice(0, start);
    let middle = text.slice(start, end).replaceAll("<" + oldTag + ">", "<" + newTag + ">").replaceAll("</" + oldTag + ">", "</" + newTag + ">");
    let right = text.slice(end);

    console.log(middle);

    let newText = `${left}${startTag}${middle}${endTag}${right}`;
    return newText;
}