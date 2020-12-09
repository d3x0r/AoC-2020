
const sack = require( "sack.vfs" );
const lines = sack.Volume().read( "input.txt" ).toString().split('\n' );

const numbers = lines.map( Number );

const codes = numbers.splice( 0, 25 );

const target = 29221323;

function validate() {
	let from = 0;
        let to = 25;
        let at = 25;
        
        while( from < numbers.length ) {
        	const here = numbers[at];
		if( here > target ) break;
		let n;
		let min = 10000000000000000;
		let max = 0;
			
		let sum = 0;

        	for( n = from; n < numbers.length; n++ ) {
			sum += numbers[n];
			if( sum > target ) break;
			if( sum === target ) {
				console.log( "Sum is:", from, n, sum );
				const nums = numbers.slice( from, n );
				const t = nums.reduce( ((acc,v)=>acc+v ), 0 );
				for( x = 0; x < nums.length; x++ ) {
					if( nums[x] > max ) max = nums[x];
					if( nums[x] < min ) min = nums[x];
				}
				console.log( "arr:", numbers.slice( from, n ), t, max,min,max+min );
			}
                }
		from++;
        }
        
}

validate()