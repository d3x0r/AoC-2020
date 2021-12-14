
import {sack} from "sack.vfs";
const JSON = sack.JSOX;

const lines = sack.Volume().read( "data2.txt" ).toString().split('\n' );

let header = lines[0];
const substs = [];
let counts = {};
let names = '';
const info = lines.splice(2).reduce( (acc,l)=>{
	const r = l.split(" -> ");
	
	acc[r[0]]=r[1]; 
	if( !(r[1] in counts ) ) {
		names+=r[1];
		counts[r[1]] = 0;
	}
	return acc; 
}, {} );

let pairpool = [{},{}];
let pairs = pairpool[0];
let pairIndex = 0;
let pairlist = [];
let schedule = [];

for( let n of names ) {
	for( let m of names ) {
		const s = n+m;
		const j = pairpool[0];
		const k = pairpool[1];
		j[s]=0;
		k[s]=0;
		pairlist.push( s );
	}
}

for( let z = 0; z < header.length-1; z++ ) {
	counts[header[z]]++;
	const hpair = header.substr(z,2);
	const pair = pairlist.find( p=>p===hpair );
	if( !schedule.find( s=>s===pair ) )
		schedule.push( pair );
	else console.log( "duplicate pair in initial string:", pair );
	console.log( "hpair?", hpair, schedule );
	pairpool[pairIndex][hpair]++;
}
counts[header[header.length-1]]++;


function step() {
	const newSchedule = [];
	let pair;
	console.log( "do schedule:", schedule.length );
	let needmod = ' ';
	const fromList = pairpool[pairIndex];
	const toList = pairpool[1-pairIndex];
	pairIndex = 1-pairIndex;
	//console.log( "Fromlisst should get blanked to tolist is counted into" );
	while( pair = schedule.shift() )
	{
		const count = fromList[pair];
		fromList[pair] = 0;

		{
			const rule = info[pair];
			counts[rule]+=count;

			const newpair1 = pair[0]+rule;
			toList[newpair1] += count;
		        //console.log( "pair??", newpair1 );
			const next1 = pairlist.find( p=>p===newpair1 );
			if( !newSchedule.find( s=>s===next1 ) )
				newSchedule.push( next1 );

			//console.log( "push:", next1, pair );

			const newpair2 = rule+pair[1];
			toList[newpair2] += count;
		        
			const next2 = pairlist.find( p=>p===newpair2 );
			if( !newSchedule.find( s=>s===next2 ) )
				newSchedule.push( next2 );
			//console.log( "push(2):", next2 );
		}
	}
	
	for( let v in fromList ) {		
		if( fromList[v] ) console.log( "DIdn't clear form list." );
	}
	//console.log( "Swap schedule:", schedule.length, newSchedule.length );
	schedule = newSchedule;
}

count();
                     
for( let s = 0; s < 40; s++ ) {
	step();
}

console.log( "FINAL counts:" );
count();



function count(  ) {
let minc,minval=Infinity, maxc, maxval=0;

for( let n = 0; n < names.length; n++ ) {
	if( counts[names[n]] > maxval ) { maxc = names[n]; maxval = counts[names[n]] }
	if( counts[names[n]] < minval ) { minc = names[n]; minval = counts[names[n]] }
		console.log( "???", names[n], counts[names[n]], maxc, minc, maxval, minval );
}

console.log( "max-min", counts, minval, maxval, minc, maxc, maxval-minval );

}


