import {sack} from "sack.vfs";

const lines = sack.Volume().read( "data2.txt" ).toString().split('\n' );


const vals = lines.map( l=>l.split('|').map( l=>l.split(' ').map(s=>s.length ) ) );

let _1s = 0;
let _4s = 0;
let _7s = 0;
let _8s = 0;

console.log( "???", vals );
for( let l of vals ) {
	if( l.length > 1 )
	for( let n of l[1] ) {
		if( n == 2 ) _1s++;
		if( n == 4 ) _4s++;
		if( n == 3 ) _7s++;
		if( n == 7 ) _8s++;
	}
}
console.log( "THING:", _1s, _4s, _7s, _8s );