const sack = require( "sack.vfs" );
const people = sack.Volume().read( "input.txt" ).toString().split('\n\n' );

const answers = people.map( answers=>answers.split('\n') );

let totalYes = 0;
const answerCount = [];
for( let n = 0; n <= 26; n++ )
	answerCount.push( 0 );

for( let answer of answers ) {
	for( let n = 0; n <= 26; n++ )
		answerCount[n] = 0;
	for( let person of answer ) {
	
		for( let n = 0; n < person.length; n++ ) {
			answerCount[person[n].codePointAt(0)-96]++;
		}       
	}
	let groupYes = 0;
	answerCount.forEach( c=>{if(c===answer.length) groupYes++} );
	//console.log( "Counter:", answerCount, groupYes );
	totalYes += groupYes;
}

console.log( "total:", totalYes );