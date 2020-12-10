

const sack = require( "sack.vfs" );
const lines = sack.Volume().read( "input.txt" ).toString().split('\n' );

const nums = lines.map(Number);

let max = 0;
nums.forEach( n=>{if( n>max ) max = n } );
max+=3;

const sortedNums = [];
nums.forEach( n=>{
	let z;
	for( z = 0; z < sortedNums.length; z++ ) 
        	if( n<sortedNums[z] )  { sortedNums.splice(z,0,n ); break; }
	if( z === sortedNums.length )
		sortedNums.push(n);
		
} );

console.log( "SortedNums:", sortedNums );

const deltas = [];
for( let m = 0; m < sortedNums.length; m++ ) {
	if( m ) deltas.push(sortedNums[m]-sortedNums[m-1] );
	else deltas.push( sortedNums[m] );
}
deltas.push(3);
console.log( "SortedNums:", deltas );

const ones = deltas.reduce( ((acc,n)=>n===1?acc+1:acc) , 0 )
const threes = deltas.reduce( ((acc,n)=>n===3?acc+1:acc) , 0 )
console.log( "output:", ones, threes, ones*threes )
