// const GridFilling = require('./GridFilling');
const GridFilled = function () {
    var gridRevealed;
    var row,column,level,numberOfMines;
    var visited;
    var isGridTraversalComplete = 0;
    var nonMinesGridSize = 0;
    /* position in grid to do dfs
       left, right,up, down */
    var pos = [[-1,0],[1,0],[0,-1],[0,1]];
    const gameFactory = GridFilling();
    function create(rows,columns,levels,mines=0) {
        row=rows;
        column=columns;
        level=levels;
        numberOfMines = mines;
        makeGrid();
        gridRevealed = new Array(row);
        visited = new Array(row);
        for(var i=0; i<row; i++) {
            gridRevealed[i] = new Array(column);
            visited[i] = new Array(column);
        }
        for(var i=0; i<row; i++) {
            for(var j=0; j<column; j++) {
                gridRevealed[i][j]=-1;
                visited[i][j]=false;
            }
        }
    }
    function makeGrid() {
        if(level === "easy") {
            gameFactory.createObject(row,column,Math.max(row,column));
            nonMinesGridSize = (row*column)-row;
            // console.log(mines);
        }
        else if(level === "medium") {
            gameFactory.createObject(row,column,Math.floor((row*column)/4));
            nonMinesGridSize = (row*column)-Math.floor(((row*column)/4));
            // console.log(mines);
        }
        else if(level === "hard") {
            gameFactory.createObject(row,column,Math.floor((row*column)/2));
            nonMinesGridSize = row*column-Math.floor((row*column)/2);
        }   
        else if(level === "custom") {
            gameFactory.createObject(row,column,numberOfMines);
            nonMinesGridSize = row*column - numberOfMines;
        }
    }
    // used stack as order doesn't matter in this traversal
    function dfs(i,j) {
        var stack = [];
        var ans = [];
        stack.push([i,j]);
        ans.push([i,j,gameFactory.getGridAtIndex(i,j)]);
        visited[i][j]=true;
        gridRevealed[i][j] = gameFactory.getGridAtIndex(i,j);
        if(gameFactory.getGridAtIndex(i,j) !== 0) 
        {
            stack.pop();
            return ans;
        }
        while(stack.length !== 0 ) {
            var temp = stack.pop();
            var x = temp[0], y = temp[1];
            // console.log(temp);  
            for(var k=0;k<4;k++) {
                var l = x+pos[k][0];
                var m = y+pos[k][1];
                if(l>=0 && l<row && m>=0 && m<column) {
                    // console.log([l,m,arr[l][m]])
                    if(gameFactory.getGridAtIndex(l,m) !== -1 &&  gridRevealed[l][m] === -1) {  
                        if(visited[l][m] === false) {
                            visited[l][m]=true;
                            if(gameFactory.getGridAtIndex(l,m) === 0)
                            stack.push([l,m]);
                            ans.push([l,m]);
                            gridRevealed[l][m]=gameFactory.getGridAtIndex(l,m);
                        }
                    }
                }
            }
        }
        return ans;
    }
    function isGameCompleted() {
        console.log(nonMinesGridSize);
        if(nonMinesGridSize === 0) return true;
    }
    function isGameWon() {
        for(var i=0; i<row; i++) {
            for(var j=0; j<column; j++) {
                if(gridRevealed[i][j] === 9 && gameFactory.getGridAtIndex(i,j) !== -1) {
                    return false;
                }
            }
            return true;
        }
    }
    function addFlag(i,j) {
        isGridTraversalComplete += 1;
        gridRevealed[i][j]=9;
    }
    function removeFlag(i,j) {
        isGridTraversalComplete -=1;
        gridRevealed[i][j]=-1;
    }
    function revealGrid(i,j) {
        const arr = dfs(i,j);
        isGridTraversalComplete += arr.length; 
        nonMinesGridSize -= arr.length;
        return arr;
    }
    return {
        createObject: create,
        getRow: function() {
            return row;
        },
        getColumn: function() {
            return column;
        },
        getValueOfOriginalGrid: function(i,j) {
            return gameFactory.getGridAtIndex(i,j);
        },
        getValueOfSeenGrid: function(i,j) {
            return gridRevealed[i][j];
        },
        isGameOver: function() {
            return (isGridTraversalComplete === row*column);
        },
        removeFlag: removeFlag,
        addFlag: addFlag,
        revealGrid: revealGrid,
        isGameWon: isGameWon,
        isGameCompleted: isGameCompleted
    };
}