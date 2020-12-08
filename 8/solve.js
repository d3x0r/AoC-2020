
const sack = require( "sack.vfs" );
const lines = sack.Volume().read( "input.txt" ).toString().split('\n' );

const program = lines.map(parseInst );

function parseInst( i ) {
	const t = i.split(' ' );
	return {i:t[0],n:Number(t[1]),ticks:0};
}


let accum = 0;

function runProgram() {
	let cp = 0;
	while( true ) {
		const i = program[cp];
		console.log( "Tick:", cp, i );
		i.ticks++;
		if( i.ticks === 2 ){
			console.log( "Tick", cp, accum, i, program[cp-1] );
			//return;
		}
		cp++;
		if( i.i === 'acc' )
			accum += i.n;
		else if( i.i === 'jmp' ) 
			cp += (i.n-1);
		else if( i.i === "nop" )
			;
		else{
			console.log( 'bad instruction;', i );
		}
	}
}

runProgram();