// module.exports = Factory = function() {
const Factory = function() {
    var grid;
    var row,column;
    function create(rows,columns) {
        row=rows;
        column=columns;
        grid = new Array(row);
        for(var i=0; i<row; i++) 
            grid[i] = new Array(column);
        for(var i=0; i<row; i++) 
            for(var j=0; j<column; j++)
                grid[i][j]=0;
    }
    return {
        createObject: create,
        updateGrid: function(i,j,value) {
            grid[i][j]=value;
        },
        getGridAtIndex: function(i,j) {
            return grid[i][j];
        }
    };
}