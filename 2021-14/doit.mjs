
import {sack} from "sack.vfs";
const JSON = sack.JSOX;

const lines = sack.Volume().read( "data2.txt" ).toString().split('\n' );

let header = lines[0];
const substs = [];

let counts = {};
let minc,minval=Infinity, maxc, maxval=0;
let names = '';

const info = lines.splice(2).reduce( (acc,l)=>{
	const r = l.split(" -> ");
	acc[r[0]]=r[1]; 
	if( !(r[1] in counts ) ) {
		names+=r[1];
		counts[r[1]] = 0;
	}
	return acc; 
}, {} );

console.log( "Rules:", info );

/*
const data2 = sack.HTTPS.get( 
				{hostname:  //'216.58.192.142',
                			 'adventofcode.com',
					  //port : 443,
					  method : "GET",
					  ca : null,
					  rejectUnauthorized: true,
					  path : "/2021/day/14/input"
                                          //, agent : false
			      } );
*/
//console.log( "Data?", data2 );

function count() {
	for( let i = 0; i < names.length; i++ ) {
		counts[names[i]]=0;
	}
	for( let i = 0; i < header.length; i++ ) {
		counts[header[i]]++;
	}

}

function subst( ) {
	for( let z = 0; z < header.length; z++ ) {
		const seg = header.substr(z,2);
		if( seg.length < 2 ) continue;
		const rule = info[seg];
		if( rule ) {
			header = header.substr(0,z+1)+rule+header.substr(z+1);
			z++;
		}else {
			console.log( "norule.");
		}
	}
	count();
	console.log( "Counts:", counts, header );
}
count();
console.log( "Counts:", counts, header );
for( let i = 0; i < 10; i++ )
	subst()


console.log( "NAMES:", names );
for( let n = 0; n < names.length; n++ ) {
	if( counts[names[n]] > maxval ) { maxc = names[n]; maxval = counts[names[n]] }
	if( counts[names[n]] < minval ) { minc = names[n]; minval = counts[names[n]] }
		console.log( "???", names[n], counts[names[n]], maxc, minc, maxval, minval );
}

console.log( "max-min", counts, minval, maxval, minc, maxc, maxval-minval );

//console.log( "Header:", header );
console.log( "substs:", substs );