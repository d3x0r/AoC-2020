
import {sack} from "sack.vfs";

const lines = sack.Volume().read( "data2.txt" ).toString().split('\n' );

const grid = lines.map( l=>[...l] );
console.log("grid:", grid );

	for( let l= 0 ; l < grid.length; l++ ) {
		const g = grid[l];
		for( let c = 0; c < g.length; c++ ) {
			g[c] = Number(g[c] );
		}
	}


const dirs =[ {x:-1,y:-1}, {x:0,y:-1}, {x:1,y:-1},
    	 {x:-1,y:0}, {x:0,y:0}, {x:1,y:0},
	 {x:-1,y:1}, {x:0,y:1}, {x:1,y:1}];

let flashes = 0;

function step( n ) {
	const flashed = [];
	if(0)console.log( "grid(NEW STEP):", showGrid() );
	for( let l= 0 ; l < grid.length; l++ ) {
		const g = grid[l];
		for( let c = 0; c < g.length; c++ ) {
			g[c]++;
		}
	}
	
let react ;
	do {
		react = false;
		for( let l= 0 ; l < grid.length; l++ ) {
			let c = 0;
			const g = grid[l];
			//console.log( "looking at :", l, g );
			for( ; c < g.length; c++ ) {
				//console.log( "is:", g[c], g[c]>9)
				if( g[c] > 9 ) {
					//console.log( "Flash at ", l, c );
					flashed.push( {x:l,y:c} );
					react = true;
					flashes++;

					dirs.forEach( d=>{
						if( (l+d.x) < 0 ) return
						if( (c+d.y) < 0 ) return
						if( (l+d.x) >= grid.length ) return
						if( (c+d.y) >= g.length ) return
						if( d.x == 0 && d.y == 0 ) 
							 grid[l+d.x][c+d.y]=0;//-=8;
						else 
						 	grid[l+d.x][c+d.y]++;
					});
					//console.log( "grid (afterflash):", l, c, n, showGrid() );
					break;
				}
			}
			if( c < g.length ) break;
			//console.log( "grid (after not break?):", showGrid() );
		} 
	} while( react );
	
	for( let flash of flashed ) {
		grid[flash.x][flash.y] = 0;
	}
	//console.log( "gridasdfsaf:", showGrid() );

}

function showGrid() {
	//console.log( "BEFORE CONVERT:", grid );
	return '\n'+grid.map( l=>l.map(c=>c>9?'*':c).join('') ).join('\n');
}

let s;
for( s = 0; s < 100; s++ ) {
	step(s);
}

for( ;; s++ ) {
	flashes = 0;
	step(s);
	if( flashes == 100 ) {
		console.log( "s:", s+1 );
		break;
	}
}

console.log( "Flashes:", flashes );