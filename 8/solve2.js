
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
	accum = 0;
	//program[207].i = "nop";
	//program[641].i = 'nop';
	console.log( "CHange:", program[636] );
	program[636].i = "jmp";
	while( true ) {
		if( cp < 0 || cp >= program.length ) { 
			console.log( "DONE" ); 
			break; 
		}
		const i = program[cp];
		//console.log( "Tick:", cp, i );
		i.ticks++;
		if( i.ticks === 2 ){
			console.log( "Tick", cp, accum, i, program[cp-1] );
			return false;
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
	return true;
}

function tryCode() {
	console.log( "???", program.length );
	for( let n = 0; n < program.length; n++ ) {

		if( program[n].i === 'jmp' ) {
			program[n].i = 'nop';
		}else if( program[n].i == 'nop' ) {
			program[n].i = 'jmp';
		} else 
			continue; // no change...
		console.log( "try:", n );
		if( runProgram() ){
			console.log( "Changed:", accum, n );
			break;
		}
		if( program[n].i === 'jmp' ) {
			program[n].i = 'nop';
		}else if( program[n].i == 'nop' )
			program[n].i = 'jmp';

	}
}

//runProgram();
tryCode();