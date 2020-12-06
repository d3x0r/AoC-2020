const sack = require( "sack.vfs" );
const people = sack.Volume().read( "input.txt" ).toString().split('\n\n' );

const answers = people.map( answers=>answers.split('\n').join('') );

let totalYes = 0;
const answerCount = [];
for( let n = 0; n <= 26; n++ )
	answerCount.push( 0 );

for( let answer of answers ) {
	console.log( "ANSERS:", answer );
	for( let n = 0; n <= 26; n++ )
		answerCount[n] = 0;
	
	for( let n = 0; n < answer.length; n++ ) {
		answerCount[answer[n].codePointAt(0)-96] = 1;
	}
	let groupYes = 0;
	answerCount.forEach( answer=>{if(answer) groupYes++} );
	console.log( "Counter:", answerCount, groupYes );
	totalYes += groupYes;
}

console.log( "total:", totalYes );