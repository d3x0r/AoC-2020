
const sack = require( "sack.vfs" );
const lines = sack.Volume().read( "input.txt" ).toString().split('\n' );

const numbers = lines.map( Number );

const codes = numbers.splice( 0, 25 );


function validate() {
	let from = 0;
        let to = 25;
        let at = 25;
        
        while( at < numbers.length ) {
        	const here = numbers[at];
		let n;
        	for( n = from; n < to; n++ ) {
			let m;
                	for( m = n+1; m < to; m++ ) {
                        	if( numbers[n]+numbers[m] === here ) break;
                        }
                        if( m < to) break;
                }
                if( n === to ) {
                	console.log( "Code ", at, here, "is not valid to the previous 25?" );
                	//return false;
                }
		from++;
		to++;
        	at++;
        }
        
}

validate()