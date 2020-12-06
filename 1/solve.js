
const sack = require( "sack.vfs" );

const lines = sack.Volume().read( "input.txt" ).toString().split('\n' );

const test = lines.map( n=>Number(n));
for( var n = 0; n < test.length; n++ ) {
	for( var m = n+1; m < test.length; m++ ){
		for( var o = m+1; o < test.length; o++ ){
        		if( (test[n]+test[m]+test[o]) === 2020 ) {
                		console.log( "Found:", test[m], test[n], test[o],test[m]*test[n]*test[o]);
			}
        	}
        }
}
