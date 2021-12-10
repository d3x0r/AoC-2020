import {sack} from "sack.vfs";

const lines = sack.Volume().read( "data2.txt" ).toString().split('\n' );

const lastInv = {'{':'}',
                 '(':')',
                 '[':']',
                 '<':'>'}


const score = {'}':1197,')':3,'>':25137,']':57};
let total = 0;

for( let line of lines ) {
	const s = parse(line );
	
}
console.log( "score:", total );

function parse(line) {
	const stack = [];
	for( let c of [...line] )  {
		if( ( c === '[' )||( c === '{' )||( c === '<' )||( c === '(' )) {
			stack.push( c );
		}
		else {
			const last = stack.pop();
			if( c === ']' && last === '[' ) continue;
			if( c === '}' && last === '{' ) continue;
			if( c === ')' && last === '(' ) continue;
			if( c === '>' && last === '<' ) continue;
			console.log( 'expected', lastInv[last],"Got:", c );
			total += score[c];
			return false;
		}
	}
	return true;
}
