
const sack = require( "sack.vfs" );
const lines = sack.Volume().read( "input.txt" ).toString().split('\n' );

const rules = lines.map( line=>line.split( " contain " ) );

const ruleSet = {};

function parseName(n) {
	console.log( "PARSE:", n );
	const bag = {count:0, color:'' };
	const words = n.split(' ');
	const c = [];
	for( n = 0; n < words.length-1; n++ )
		c.push(words[n]);
	return c.join(' ');
}

function parseRuleName(n, first) {
	if( n === "no other bags" ) 
		return { count:0, name:'' };
	console.log( "PARSE:", n );
	const bag = {count:0, color:'' };
	const words = n.split(' ');
	const c = [];
	for( n = 1; n < words.length-1; n++ )
		c.push(words[n]);
	if( words[0] == 'a' || words[0] == 'A' ) {
		bag.count = 1;
		bag.color = c.join(' ');
	} else {
		const n = Number( words[0] );
		if( !isNaN(n) ) {
			bag.count = n;
			bag.color = c.join(' ');
			return bag;
		} else {
			console.log( "FAIL:", n );
		}
	}
	return bag;
}

function readRules() {
	for( let rule of rules ) {
		const def = parseName( rule[0] );
        	let contains = rule[1].split( ', ' );
                contains[contains.length-1] = contains[contains.length-1].substr( 0, contains[contains.length-1].length-1 );
		contains = contains.map( (bag)=>parseRuleName(bag ) );
		//console.log( "Rule:", contains );
        	ruleSet[def] = contains;
        }
}

const target = "shiny gold";

const paths = [];
let total = 0;

function followRules(target) {
	const keys = Object.keys( ruleSet );
	let count = 0;
	//console.log( "Finding container of:", ruleSet );
	for( let key of keys ) {
		const rule = ruleSet[key];
		//console.log( "Finding container of:", key, rule, target );
        	if( rule.find( r=>{ /*console.log( "TEST:", r );*/return r.color===target } ) ){
			console.log( "Following bag to root?", target, key, rule );
			if( !paths.find( p=>p===key ) )
				paths.push( key );
			count++;
			total++;
			followRules( key );
                	//console.log( "rule:", key, rule );
                }
        }
	return count;
}

readRules();
followRules(target);
console.log( "total:", total, paths.length, paths );
