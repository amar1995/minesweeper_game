// const Factory = require('./Factory.js');
// module.exports = GridFilling = function() {
const GridFilling = function() {
    var row,column;
    var numberOfMines;
    const factory  = Factory();
    // constructor type
    function create(rows,columns,mines) {
        row = rows;
        column = columns;
        numberOfMines = mines;
        makeFinalGrid();
    }
    /* internal use for testing only */
    function print() {
        for( var i=0; i<row; i++) {
            var string = ""; 
            for( var j=0; j<column; j++) {
                string += getGridAtIndex(i,j) + " ";
            }
            console.log(string);
        }
    }
    /*
        if mines is greater than row*column it will be invalid checked in html
        if mines is greater then row*column/2 then calulate mines for row*column/2-mines
        if mines is less then row*column/2 then calculate for mines
        working on probabilty of remainingMines and remainingCells
        private type
    */
    function fillGridWithMines() {
        var flag = 0;
        if(numberOfMines>(row*column)/2) {
            numberOfMines = numberOfMines-(row*column)/2;
            flag = 1;
        }
        factory.createObject(row,column);
        var mines = numberOfMines;
        var remainingCells = row*column;
        var chances;
        const randomGenerator = RandomGenerator();
        const minesIndex = randomGenerator.getInstance(row,column,mines);
        for(var i=0; i<minesIndex.length; i++) 
            factory.updateGrid(minesIndex[i][0],minesIndex[i][1],-1);
        if(flag) {
            for( var i=0; i<row; i++) {
                for( var j=0; j<column; j++) {
                    if(getGridAtIndex(i,j)===-1)
                    factory.updateGrid(i,j,0);
                    else
                    factory.updateGrid(i,j,-1);
                }
            }
        }
    }
    function makeFinalGrid() {
        
        // fill grid with mines
        fillGridWithMines();
        // position of grid to calculate sum
        // left, right,up, down, up-left-dioganal, up-right-dioganal
        // down-left-dioganal, down-right-dioganal
        var arr = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1]];
        for( var i=0; i<row; i++) {
            for( var j=0; j<column; j++) {
                if(getGridAtIndex(i,j) != -1) {
                    for(var k=0;k<8;k++) {
                        if(i+arr[k][0]>=0 && i+arr[k][0]<row && j+arr[k][1]>=0 && j+arr[k][1]<column)
                        if(getGridAtIndex(i+arr[k][0],j+arr[k][1]) === -1)
                        factory.updateGrid(i,j,getGridAtIndex(i,j)+1);
                    }
                }
            }
        }
        print();
    }
    /* grid will be private we can only get value at index */
    function getGridAtIndex(i,j) {
        return factory.getGridAtIndex(i,j);
    }
    return {
        createObject: create,
        getGridAtIndex: getGridAtIndex
    };
}