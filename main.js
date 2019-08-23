/* final code to execute from this class */

$('#myModal').on('hidden.bs.modal', function () {
    // do something…
    console.log("closed");
    window.location.href = "home.html";
});

function startGame() {
    const row = Number(localStorage.getItem("row"));
    const column = Number(localStorage.getItem("column"));
    const level = localStorage.getItem("level");
    const mines = Number(localStorage.getItem("mines"));
    console.log(row,column,mines,level);
    const canvasBuilder = CanvasBuilder();
    canvasBuilder.createObject(row,column,level,mines);
}
