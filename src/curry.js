'use strict';

module.exports = function curry( fn ) {
	var arity;

	if ( !fn || typeof fn !== 'function' ) {
		throw 'curry( fn ) - fn must be a function';
	}

	arity = fn.length;

	return function curried() {
		var args;
		args = Array.prototype.slice.call( arguments, 0 );

		if ( args.length >= arity ) {
			return fn.apply( null, args );
		}
		else {
			return function partial() {
				let args2;
				args2 = Array.prototype.slice.call( arguments, 0 );
				return curried.apply( null, args.concat( args2 ) ); 
			}
		}
	};
};
