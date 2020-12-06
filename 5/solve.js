
const sack = require( "sack.vfs" );

const data = sack.Volume().read( "input.txt" );
const datas = data.toString();
const passes = datas.split('\n' );
const used = passes.reduce( (acc,n)=>{ if( n.length ) acc.push(n); return acc; }, [] );

console.log( "data:", used );



const sack = require( "sack.vfs" );

const data = sack.Volume().read( "input.txt" );
const datas = data.toString();
const passes = datas.split('\n' );
console.log( "data:", passes );

const found = [];

let max = 0;

function toNum(s) {
	if( s.length != 10 ) {
			console.log( "Bad seat encode:", s );
		return;
	}
	let row = 0;
	let col = 0;
	if( s[0] == 'B' ) {
		row = 1;
	} 
	row <<= 1;
	if( s[1] == 'B' ) {
		row |= 1;
	} 
	row <<= 1;
	if( s[2] == 'B' ) {
		row |= 1;
	} 
	row <<= 1;
	if( s[3] == 'B' ) {
		row |= 1;
	} 
	row <<= 1;
	if( s[4] == 'B' ) {
		row |= 1;
	} 
	row <<= 1;
	if( s[5] == 'B' ) {
		row |= 1;
	} 
	row <<= 1;
	if( s[6] == 'B' ) {
		row |= 1;
	} 

	if( s[7] == 'R' ) {
		col |= 1;
	} 
	col <<= 1;
	if( s[8] == 'R' ) {
		col |= 1;
	} 
	col <<= 1;
	if( s[9] == 'R' ) {
		col |= 1;
	} 
	const seat = row * 8 + col;		
if( seat > max ) {
	max = seat;
	console.log( "next became max" );
}
console.log( "Decode:", s, row, col, seat )
	while( seat >= found.length ) found.push( found.length );
	found[seat] = -1;
}

passes.forEach( pass=> {
	toNum(pass );
} );
console.log( "found Seats:", found.length );
console.log( "EMptySeats:", found.reduce( (acc,n)=>{console.log( "Test:", n ); if (n>=0)acc.push(n); return acc}, [] ) );