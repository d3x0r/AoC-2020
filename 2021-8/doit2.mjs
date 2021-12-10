import {sack} from "sack.vfs";

const lines = sack.Volume().read( "data2.txt" ).toString().split('\n' );


const vals2 = lines.map( l=>l.split('|').map( l=>l.split(' ').map(s=>[...s].sort((a,b)=>a<b?-1:1 ).join('') ) ) );

console.log( "vals2:", JSON.stringify( vals2, null, '\t' ) );

const vals = lines.map( l=>l.split('|').map( l=>l.split(' ').map(s=>s.length ) ) );



let _1s = 0;
let _4s = 0;
let _7s = 0;
let _8s = 0;

//console.log( "???", vals );

const one =['a','b'];
const seven =['a'];
const four =['a','d'];
//const seven =['a','b','c'];


let total = 0;

for( let l of vals2 ) {
	let num = 0;
	//console.log( "VALS2:",l );
	if( l.length > 1 ) {
	        const L = [];
		const tmp = l[0].map( n=>n ).sort( (a,b)=>a.length<b.length?-1:1 );		
		//console.log( "A:", tmp );
		for( let s of tmp ) {
			if( s.length < 5 )
				know( s );
		}
		
		for( let n=0; n < l[0].length; n++ )  {
			const ch = l[0][n];
			L[n] = whatis(ch );
		}
		//console.log( "Becomes:", L, l[0] );
		
		for( let n = 0; n <= 4; n++ ) {
			if( l[1][n].length > 1 ) {
				//console.log( "Looking in ", l[0], "for:", l[1][n] );
				const N = l[0].findIndex( s=>s===l[1][n] );
				num = num*10 + L[N];
			}
		}
	}

	total += num; 
	console.log( "NUM:", num, total );
		
}
console.log( "THING:", _1s, _4s, _7s, _8s );


function whatis(s) {
	if( s.length === 2 ) return 1;
	if( s.length === 3 ) return 7;
	if( s.length === 4 ) return 4;
	if( s.length === 7 ) return 8;
	if( s.length === 6 ) {
		if( s.includes(one[0]) && s.includes( one[1] ) ) {
			// 9 or 0
			if( s.includes( four[0] ) && s.includes(four[1] ) )
				return 9;
			return 0;
		}
		return 6;
	}
	if( s.length === 5 ) {
		if( s.includes(one[0]) && s.includes( one[1] ) ) {
			return 3;
		}
		if( s.includes( four[0] ) && s.includes( four[1] ) )
			return 5;
		return 2;
		// else can be 5 or 2
	} 
}

function know(s,n) {
	switch(s.length) {
	case 2:
		one[0] = s[0]; one[1] = s[1];
		break;
	case 3:		
		if( !one.find( c=>c===s[0] ) ) seven[0] = s[0];  
		if( !one.find( c=>c===s[1] ) ) seven[0] = s[1];  
		if( !one.find( c=>c===s[2] ) ) seven[0] = s[2];  
		break;
	case 4:
		let o = 0;
		if( !one.find( c=>c===s[0] ) ) four[o++] = s[0]; 
		if( !one.find( c=>c===s[1] ) ) four[o++] = s[1]; 
		if( !one.find( c=>c===s[2] ) ) four[o++] = s[2]; 
		if( !one.find( c=>c===s[3] ) ) four[o++] = s[3]; 
		break;
	}
}