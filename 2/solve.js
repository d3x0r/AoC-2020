
const sack = require( "sack.vfs" );
const lines = sack.Volume().read( "input.txt" ).toString().split('\n' );

let rows = lines.map( line=>{
	const rows = line.split(' ' );
        rows[0] = rows[0].split('-');
        return  {min : Number(rows[0][0]), max:Number(rows[0][1]), letter:rows[1][0], pw : rows[2] };
        
} );

let valid = [];
for( let row of rows ) {
	let match = row.letter;
        if(0) {
		let found = 0;
		for( let n = 0; n < row.pw.length; n++ )
                	if( row.pw[n] === match ) {
                        	found++;
                        }
                if( found >= row.min && found <= row.max ) {
                	valid.push( row );
                }
	} else {
		const a = (row.pw[row.min-1] === row.letter)
		const b = (row.pw[row.max-1] === row.letter);
		if( (a ^ b) )    {
			valid.push(row );
		}
	}
}

console.log( "Found:", valid.length );