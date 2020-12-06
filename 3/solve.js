
const sack = require( "sack.vfs" );
const lines = sack.Volume().read( "input.txt" ).toString().split('\n' );

const width = 31;

function path( dx, dy )
{
	let x = 0;
	let y = 0;
	let mx = x % width;
	let count = 0;
	for( y = 0; y < lines.length; y+=dy ) {
		const tree = (lines[y][mx] === '#')
		if( tree )
			count++;
		x += dx;
		mx = x % width;
	}
	console.log( dx, dy,"Smashed", count, "trees" );
	return count;
}
//path( 3, 1 );

const lengths = [path( 1, 1 ),
path( 3, 1 ),
path( 5, 1 ),
path( 7, 1 ),
path( 1, 2 ),
];
console.log( "total product:", lengths.reduce( (acc,x)=>acc*x,1 ) );
