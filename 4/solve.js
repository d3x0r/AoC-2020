
const sack = require( "sack.vfs" );

const data = sack.Volume().read( "input.txt" );
const datas = data.toString();
const passes = datas.split('\n\n' );
const used = passes.map( m=>m.split('\n' ).join(' ') );
//console.log( "got:", used );
const split = used.map( (v)=>v.split(' ') );
const valid = ['byr','iyr','eyr','hgt','hcl','ecl','pid','cid'];
const req = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];

const passports = [];
split.forEach( pass=>{
	const obj = {};
	const need = req.map(m=>m);
	let len = 0;
	pass.forEach( field=>{
		const a = field.split(':' );
		obj[a[0]]=a[1];
		let n = 0;
		const xx = need.findIndex( x=>x===a[0] );
		switch( true ) {
		case a[0] == 'byr': 
			if( a[1].length !== 4 || !/[0-9][0-9][0-9][0-9]/.test(a[1]) ) {
				console.log( "fail year:", a[1] );
				console.log( "bad year:", a[1], /[0-9][0-9][0-9][0-9]/.test(a[1]) );
				return;
			}
			 n = Number(a[1]);
			if(!( n >= 1920 && n <= 2002 )){
				console.log( "byr out of range:", a[1] );
				return;
			}
			break;
		case a[0] == 'iyr': 
			if( a[1].length !== 4 || !/[0-9][0-9][0-9][0-9]/.test(a[1]) )
				return;
			 n = Number(a[1]);
			if(!( n >= 2010 && n <= 2020 )){
				console.log( "iyr out of range:", a[1] );
				return;
			}
			break;
		case a[0] == 'eyr': 
			if( a[1].length !== 4 || !/[0-9][0-9][0-9][0-9]/.test(a[1]) )
				return;
			 n = Number(a[1]);
			if(!( n >= 2020 && n <= 2030 )){
				console.log( "eyr out of range:", a[1] );
				return;
			}
			break;
		case a[0] == 'hgt': 
			if( a[1].length=== 5 ) {
				if( a[1][3] !== 'c' || a[1][4] !== 'm' ) {
					console.log( "bad height:", a[1] );
					return;
				}
				const n = Number(a[1][0]) * 100 + Number(a[1][1])*10 + Number(a[1][2]);
				if( !( n >= 150 && n <= 193 ) ) {
					console.log( "bad height:", a[1] );
					return;
				}
			} else if( a[1].length === 4 ) {
				if( a[1][2] !== 'i' || a[1][3] !== 'n' ) {
					console.log( "bad height:", a[1] );
					return;
				}
				const n = Number(a[1][0]) * 10 + Number(a[1][1]);
				if( !( n >= 59 && n <= 76 ) ) {
					console.log( "bad height:", a[1] );
					return;
				}
					
			} else {
				console.log( "bad height:", a[1] );
				
				return;
			}

			break;
		case a[0] == 'hcl': 
			if( a[1].length !== 7 || !/#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]/.test(a[1]) ) {
				//console.log( "hcl failure:", a[1] );
				return;
			}
			break;
		case a[0] == 'ecl': 
			if( !['amb','blu','brn','gry','grn','hzl','oth'].find(ec=>ec===a[1]) )
				return;
			break;
		case a[0] == 'pid': 
			if( a[1].length !== 9 || !/[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.test(a[1]) ) {
				return;
			}
			break;
		}
		if( xx >= 0 )
			 need.splice( xx,1 ) 
	} );
	console.log( 'needs:', need );
	if( need.length === 0 ){
		console.log( "found a valid passports?", obj );
		passports.push(obj );
	}       //else if( pass.length === 8 ) console.log( "tossed 1?" );
})


console.log( "passports", passports.length, passports );

