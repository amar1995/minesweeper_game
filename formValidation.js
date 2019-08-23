function isCustom() {
    const levels = document.getElementById("level");
    const mine = document.getElementById("mines");
    if(levels.value === "Custom") {
        mine.disabled = false;  
    } else {
        mine.disabled = true;
    }
}
function isRowValid() {
    const row = document.getElementById("row");
    var r = Number(row.value);
    if(r<3 || r>50) alert("Row must be between 3 and 50");
}
function isColumnValid() {
    const column = document.getElementById("column");
    var c = Number(column.value);
    if(c<3 || c>50) alert("Column must be between 3 and 50");
}
function isFormValid() {
    const levels = document.getElementById("level");
    const row = document.getElementById("row");
    const column = document.getElementById("column");
    const mine = document.getElementById("mines");
    var r = Number(row.value);
    var c = Number(column.value);

    if(r<3 || r>50) {
        alert("Row must be between 3 and 50");
        return false;
    }
    if(c<3 || c>50) {
        alert("Column must be between 3 and 50");
        return false;
    }
    if(levels.value === "Custom") {
        var m = Number(mine.value);
        if(m===0) {
        alert("mines should be atleast 1");
        return false;
        }
        if(r*c < m) 
        alert("Mines should be less than row*column" + r*c );
        return false;
    } 
    if(levels.value === "Easy") {
        localStorage.setItem("row",r);
        localStorage.setItem("column",c);
        localStorage.setItem("level","easy");
        localStorage.setItem("mines",0);
    }
    else if(levels.value === "Medium") {
        localStorage["row"]=r;
        localStorage["column"]=c;
        localStorage["level"]="medium";
        localStorage["mines"]=0;
    }
    else if(levels.value === "Hard"){
        localStorage["row"]=r;
        localStorage["column"]=c;
        localStorage["level"]="hard";
        localStorage["mines"]=0;
    }
    if(levels.value === "Custom"){
        localStorage["row"]=r;
        localStorage["column"]=c;
        localStorage["level"]="custom";
        localStorage["mines"]=Number(mine.value);
    }
    return true;
}