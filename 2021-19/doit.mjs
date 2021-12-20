
import {sack} from "sack.vfs";
const JSON = sack.JSOX;

const lines = sack.Volume().read( "data.txt" ).toString().split('\n' );

const scanners = [];

{
	let scanner = null;
	for( let line = 0; line < lines.length; line++ ) {
		const l = lines[line];
		if( l.length < 2 ) continue;
		if( l.startsWith( "---" ) ) {
			scanners.push( scanner = [] );
		}else 
			scanner.push( l.split(',').map(n=>Number(n)) );
	}
}



const indexers = [

 { order:['x','y','z'], incr:[ 1, 1, 1] }   //0

,{ order:['x','z','y'], incr:[ 1, 1,-1] }  //24
,{ order:['x','y','z'], incr:[ 1,-1,-1] }  //7
,{ order:['x','z','y'], incr:[ 1,-1, 1] }  //26

,{ order:['x','y','z'], incr:[-1, 1, 1] }  //5
,{ order:['x','y','z'], incr:[-1, 1,-1] }  //17
,{ order:['x','y','z'], incr:[-1,-1,-1] }  //17
,{ order:['x','y','z'], incr:[-1,-1, 1] }  //5


,{ order:['y','z','x'], incr:[ 1, 1, 1] }  //2
,{ order:['y','x','z'], incr:[ 1, 1,-1] }  //3
,{ order:['y','z','x'], incr:[ 1,-1,-1] }  //4
,{ order:['y','x','z'], incr:[ 1,-1, 1] }  //1

,{ order:['y','x','z'], incr:[-1, 1, 1] }  //9
,{ order:['y','z','x'], incr:[-1, 1,-1] }  //12
,{ order:['y','x','z'], incr:[-1,-1,-1] }  //11
,{ order:['y','z','x'], incr:[-1,-1, 1] }  //10


,{ order:['z','x','y'], incr:[ 1, 1, 1] }  //14
,{ order:['z','y','x'], incr:[ 1, 1,-1] }  //13
,{ order:['z','x','y'], incr:[ 1,-1,-1] }  //16
,{ order:['z','y','x'], incr:[ 1,-1, 1] }  //6


,{ order:['z','y','x'], incr:[-1, 1, 1] }  //20
,{ order:['z','x','y'], incr:[-1, 1,-1] }  //21
,{ order:['z','y','x'], incr:[-1,-1,-1] }  //8
,{ order:['z','x','y'], incr:[-1,-1, 1] }  //23

];

//console.log( "length:", indexers.length );
if(0) // validate indexers
for( let idx = 0; idx < indexers.length; idx++ ) {

	for( let idx2 = idx+1; idx2 < indexers.length; idx2++ ) {
		if( indexers[idx].order.join('')===indexers[idx2].order.join('') ) {
			//console.log( "Same?", idx, idx2 );
			if( indexers[idx].incr.join('')===indexers[idx2].incr.join('') ) {
				console.log( "REALLY Same?", idx, idx2 );
			}//else console.log( "not really." );
		}
	}		 
}		 



function expandScanner( scanner ) {
	const map = [];
	for( let indexer of indexers ) {
		const grid = [];
		map.push(grid );
		const coord = {x:0,y:0,z:0};
		
		for( let scan of scanner ) {
			indexer.order.map( (x,i)=>{
				coord[x]=scan[i] 
			});
			for( let i of indexer.incr ) coord[indexer.order[i]]
		}
	}
}

