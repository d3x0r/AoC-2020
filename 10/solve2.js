

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

const choices = [];
for( var n = 0; n < deltas.length; n++ ) {
	let numChoices = 1;
	console.log( "Look at:", n, deltas[n] );
	if( deltas[n] === 1 ) {
		if( deltas[n+1] === 1 ) {
			if( deltas[n+2] === 1 ) {
				//numChoices=2;
				if( deltas[n+3] === 1 ) {
					numChoices= 7;
					n += 4;
				}
				else	{
					numChoices = 4;
					n += 3;
				}
			}
			else {
				numChoices = 2;
				n += 2;
			}
		}
		else {
			n += 1;
			numChoices = 1;
		}
		choices.push( numChoices );
	}
}

const total = choices.reduce( ((acc,n)=>n>0?acc*n:acc),1);
console.log( "Thing:", choices, total );