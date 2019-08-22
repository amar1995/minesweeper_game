
const CanvasBuilder = function() {
    var canvas = document.getElementById("canvas");
    
    var width = 20;
    var row,column,level,numberOfMines;
    var imgArray = new Array(13);
    var gameBegin;
    var context, myTimer;
    function create(rows,columns,levels,mines=0) {

        row = rows;
        column = columns;
        level = levels;
        numberOfMines = mines;
        canvas.height =  row*width;
        canvas.width = column*width; 
        context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height); 
        canvas.addEventListener('click', detectIsBomb);
        canvas.addEventListener('contextmenu', flagAddOrRemove);
        for(var i=0;i<13;i++) 
            imgArray[i] = new Image();
        imgArray[0].src = "./images/simpleTile.jpg";
        imgArray[1].src = "./images/1.jpg";
        imgArray[2].src = "./images/2.jpg";
        imgArray[3].src = "./images/3.jpg";
        imgArray[4].src = "./images/4.jpg";
        imgArray[5].src = "./images/5.jpg";
        imgArray[6].src = "./images/6.jpg";
        imgArray[7].src = "./images/7.jpg";
        imgArray[8].src = "./images/8.jpg";
        imgArray[9].src = "./images/flag.png";
        imgArray[10].src = "./images/bomb.jpeg";
        imgArray[11].src = "./images/tiles.jpg";
        gameBegin = GridFilled();
        gameBegin.createObject(row,column,level,numberOfMines);
        imgArray[11].onload = function() {
            for(var i=0;i<=row;i++) {
                for(var j=0;j<=column;j++)
                {
                    context.rect(j*width,i*width,width,width);
                    context.stroke();
                    context.drawImage(imgArray[11],j*width,i*width,width,width);
                }
            }
        };
        const timer = Timer();
        myTimer = setInterval(timer.setTime,1000);
    }
    
    


    function detectIsBomb(e) {
        context.fillStyle = "black";
        var j = Math.floor(e.offsetX / width),
        i = Math.floor(e.offsetY / width);
        // console.log([i,j,gameBegin.getValueOfOriginalGrid(i,j)]);
        if(gameBegin.getValueOfOriginalGrid(i,j) !== -1) {
            const traveGrid = gameBegin.revealGrid(i,j);
            for(var k=0;k<traveGrid.length;k++) {
                var val = gameBegin.getValueOfOriginalGrid(traveGrid[k][0],traveGrid[k][1]);
                // console.log([traveGrid[k][0],traveGrid[k][1]]);
                context.rect(traveGrid[k][1]*width, traveGrid[k][0]*width, width, width);
                context.stroke();
                context.drawImage(imgArray[val],traveGrid[k][1]*width,traveGrid[k][0]*width,width,width);
            }
        } else {
            /* Game Over */
            revealGridSolution();
        }
        if(gameBegin.isGameOver()) {
            console.log("Completed");
            stopGame();
        }
    }

    function revealGridSolution() {
        for(var i=0;i<row;i++) {
            for(var j=0;j<column;j++) {
                if(gameBegin.getValueOfSeenGrid(i,j) === -1) {
                    if(gameBegin.getValueOfOriginalGrid(i,j) === -1) {
                        context.rect(j*width,i*width,width,width);
                        context.stroke();
                        context.drawImage(imgArray[10],j*width,i*width,width,width);
                    } else {
                        context.rect(j*width,i*width,width,width);
                        context.stroke();
                        context.drawImage(imgArray[gameBegin.getValueOfOriginalGrid(i,j)],j*width,i*width,width,width);
                    }
                }
            }
        }
        stopGame();
    }
    function stopGame() {
        clearInterval(myTimer);
    }

    function flagAddOrRemove(e) {
        e.preventDefault();
        var j = Math.floor(e.offsetX / width),
        i = Math.floor(e.offsetY / width);
        if(gameBegin.getValueOfSeenGrid(i,j) === -1) {
            context.rect(j*width, i*width, width, width);
            context.stroke();
            context.drawImage(imgArray[9],j*width,i*width,width,width);
            gameBegin.addFlag(i,j);
        } else {
            context.rect(j*width, i*width, width, width);
            context.stroke();
            context.drawImage(imgArray[11],j*width,i*width,width,width);
            gameBegin.removeFlag(i,j);
        }
        if(gameBegin.isGameOver()) {
            console.log("Completed");
            stopGame();
        }
    }
    create(10,10,"custom",10);
    return {
        createObject: create
    };
}
CanvasBuilder();