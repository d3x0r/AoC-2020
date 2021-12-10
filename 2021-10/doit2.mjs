import {sack} from "sack.vfs";

const lines = sack.Volume().read( "data2.txt" ).toString().split('\n' );

const lastInv = {'{':'}',
                 '(':')',
                 '[':']',
                 '<':'>'}


const score = {'}':3,')':1,'>':4,']':2};
let total = 0;

const scores = [];

for( let line of lines ) {
	const s = parse(line );
	
}

scores.sort( (a,b)=>a<b?-1:1);

console.log( "score:", scores, scores.length, scores[scores.length/2] );

function parse(line) {
	const stack = [];
	let good = true;
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
			good = false;
			break;
			console.log( 'expected', lastInv[last],"Got:", c );
			total += score[c];
			return false;
		}
	}
	if( good ) {
	
	let fix = [];
	total = 0;
	while( stack.length ) {
		const c = stack.pop();
		const inv = lastInv[c];
		fix.push( inv );
		total *= 5;
		total += score[inv];
	}
	scores.push(total );
	console.log( "Stack remaining:", total, stack, fix.join('') );	
	}
	return true;
}
