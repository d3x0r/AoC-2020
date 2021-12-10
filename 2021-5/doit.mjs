

import {sack} from "sack.vfs";

const lines = sack.Volume().read( "data2.txt" ).toString().split('\n' );

const l2 = lines.map( (row)=>(row.split("->")).map( cols=>cols.split(',').map(n=>Number(n))) )
console.log( l2 );

let w = 0;
let h = 0;
for( let l of l2 ) {
	if( l.length < 2 )continue;

	if( l[0][0] > w ) w = l[0][0];
	if( l[1][0] > w ) w = l[1][0];
	if( l[0][1] > h ) h = l[0][1];
	if( l[1][1] > h ) h = l[1][1];


}

let field = [];
for( let r = 0; r <= h; r++ ) {
	const row =[];
	field.push(row );
	for( let c = 0; c <= w; c++ ) {
		row.push(0);
	}
}

function plot(x,y) {
	field[y][x]++;
}

function line(x,y, x2,y2 ) {
	let del1 = Math.sign(x2-x);
	let del2 = Math.sign(y2-y);
	let Y = y;
	for( let X = x; X != x2; X+=del1, Y+=del2 )
		plot( X, Y );
	plot( x2, Y );
}

for( let l of l2 ) {
	if( l.length < 2 )continue;
	if ( Math.abs( l[1][0]  - l[0][0] ) == Math.abs( l[1][1]  - l[0][1] ) ) {
		console.log( "Diag:", l );
		line( l[0][0], l[0][1], l[1][0], l[1][1] );
	}

	if( l[0][0] > l[1][0] ) { let t = l[0][0]; l[0][0] = l[1][0]; l[1][0] = t }
	if( l[0][1] > l[1][1] ) { let t = l[0][1]; l[0][1] = l[1][1]; l[1][1] = t }

	if( l[0][0] == l[1][0]  ) { // x line
		console.log( "X:", l );
		for( let y = l[0][1]; y <= l[1][1]; y++ ) {
			field[y][l[0][0]]++;
		}
	}
	if( l[0][1] == l[1][1]  ) { // y line
		console.log( "Y:", l );
		for( let x = l[0][0]; x <= l[1][0]; x++ ) {
			field[l[0][1]][x]++;
		}
	}
}


let total = 0;

for( let r = 0; r <= h; r++ ) {
	for( let c = 0; c <= w; c++ ) {
		if( field[r][c] > 1 ) total++ ;
		if( field[r][c] == 0 ) field[r][c] = '.';
	}
	field[r] = field[r].join('' );
}
console.log( "Field:", field );

console.log( "COUNTED:", total );