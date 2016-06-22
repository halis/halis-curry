# halis-curry
Spice up the JavaScript inter-webs with some currying

## Install

``` bash
npm install halis-curry --save
```

## Unit Tests ( if you download the git repo )

``` bash
npm install && npm run test
```

## Usage

Minimal usage:

```js
const curry = require( 'halis-curry' );

const add = ( a, b, c ) => a + b + c;
const fn = curry( add );

fn( 2, 2, 2 ); 		// 6
fn( 2, 2 )( 2 ); 	// 6
fn( 2 )( 2 )( 2 ); 	// 6
fn( 2, 2, 2, 2 );	// 6
fn( 2, 2, 2 )( 2 )  // Error: after fn( 2, 2, 2 ) the result is 6 not a function!

/*** 
	lets expand the signature of a find function 
	which normally only gives you access to the item and index
***/

const list = [
	{ id: 1, name: 'Bob' },
	{ id: 2, name: 'Billy' }
];

const find = ( searchId, item, index ) => item.id === searchId;
const fn = curry( find )( 1 );

/* 
	now our function can have access to the searchId param of 1 
	and still be used by [].find
*/

list.find( fn ); // { id: 1, name: 'Bob' }

/***
	lets expand the signature of a map function 
	which normally only gives you access to the item and index
***/

const list = [
	{ id: 1, name: 'Bob' },
	{ id: 2, name: 'Billy' }
];

const transform = ( msg, item, index ) => {
	item.msg = msg
	return item;
};
const fn = curry( transform )( 'awesome' );

list.map( fn ); 
/* 
	[
		{ id: 1, name: 'Bob', msg: 'awesome' },
		{ id: 2, name: 'Billy', msg: 'awesome' }
	]
*/

```
