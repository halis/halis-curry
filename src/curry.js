'use strict';

module.exports = function curry( fn ) {
	let getArgs, arity;

	if ( !fn || typeof fn !== 'function' ) {
		throw 'curry( fn ) - fn must be a function';
	}

	getArgs = ( args ) => [].slice.call( args, 0 );
	arity = fn.length;

	return function curried() {
		let args;
		args = getArgs( arguments );

		if ( args.length >= arity ) {
			return fn.apply( null, args );
		}
		else {
			return function partial() {
				let args2;
				args2 = getArgs( arguments );
				return curried.apply( null, args.concat( args2 ) ); 
			}
		}
	};
};
