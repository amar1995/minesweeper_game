/* 
using javascript Math.random()
but we can generate random number using algorithm linear congruential generator or other complex algo
*/
// singleton design pattern
const RandomGenerator = function() {
    var instance;
    function create(row,column,mines) {
        var mineIndexes = [];
        var hashMap = new Array(row);
        for(var i=0;i<row;i++)
        hashMap[i] = new Array(column);
        for(var i=0;i<row;i++) 
        for(var j=0;j<column;j++)
        hashMap[i][j]=1;
        var i,j;
        while(mines !== 0) {
            i=Math.floor(Math.random()*(row-1));
            j=Math.floor(Math.random()*(column-1));
            if(hashMap[i][j] === 1) {
                hashMap[i][j]=0;
                mineIndexes.push([i,j]);
                mines--;
            }
        }
        return mineIndexes;
    }

    return {
        getInstance: function(row,column,mines) {
            if(!instance) {
                instance = create(row,column,mines);
            }
            return instance;
        }
    }
}