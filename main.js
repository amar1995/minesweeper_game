/* final code to execute from this class */

$('#myModal').on('hidden.bs.modal', function () {
    // do something…
    console.log("closed");
    window.location.href = "/";
});
$( "#myModal" ).on('shown.bs.modal', function(){
    const val = localStorage.getItem("won");
    console.log(val);
    if(val === "true")
    document.getElementById("result").innerText = "You Win !!!!"
    else
    document.getElementById("result").innerText = "Try Again !!!!"
    localStorage.removeItem("won");
});
function startGame() {
    const row = Number(localStorage.getItem("row"));
    const column = Number(localStorage.getItem("column"));
    const level = localStorage.getItem("level");
    const mines = Number(localStorage.getItem("mines"));
    console.log(row,column,level,mines);
    const canvasBuilder = CanvasBuilder();
    canvasBuilder.createObject(row,column,level,mines);
}
