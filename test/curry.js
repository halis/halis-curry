'use strict';

const curry = require( '../src/curry' );
const expect = require( 'chai' ).expect;

const add = ( a, b, c ) => a + b + c;
const curried = curry( add );

describe( './src/curry.js', () => {

	describe( '#curry()', () => {

		it( 'curried function should accept 3 parameters at once and produce the desired result', () => {
			let result = curried( 2, 2, 2 );
			expect( result ).to.equal( 6 );
		});

		it( 'curried function should accept 2 parameters at once and produce the desired result', () => {
			let result = curried( 2, 2 )( 2 );
			expect( result ).to.equal( 6 );
		});

		it( 'curried function should accept 1 parameter at once and produce the desired result', () => {
			let result = curried( 2 )( 2 )( 2 );
			expect( result ).to.equal( 6 );
		});

		it( 'should ignore extra parameters all at once and produce the desired result', () => {
			let result = curried( 2, 2, 2, 2 );
			expect( result ).to.equal( 6 );
		});

		it( 'should allow a find function to be expanded', () => {
			const list = [
				{ id: 1, name: 'Bob' },
				{ id: 2, name: 'Billy' }
			];

			const find = ( searchId, item, index ) => item.id === searchId;
			const fn = curry( find )( 1 );

			let result = list.find( fn );
			expect( result ).to.deep.equal( { id: 1, name: 'Bob' } );
		});

		it( 'should allow a map function to be expanded', () => {
			const list = [
				{ id: 1, name: 'Bob' },
				{ id: 2, name: 'Billy' }
			];

			const transform = ( msg, item, index ) => {
				item.msg = msg
				return item;
			};
			const fn = curry( transform )( 'awesome' );

			let result = list.map( fn );
			expect( result[ 0 ] ).to.deep.equal( { id: 1, name: 'Bob', msg: 'awesome' } );
			expect( result[ 1 ] ).to.deep.equal( { id: 2, name: 'Billy', msg: 'awesome' } );
		});

		it( 'should throw an error if fn is undefined', () => {
			let error = false;

			try {
				curry( );
			} catch( e ) {
				error = true;
			}

			expect( error ).to.equal( true );
		});

		it( 'should throw an error if fn is null', () => {
			let error = false;

			try {
				curry( null );
			} catch( e ) {
				error = true;
			}

			expect( error ).to.equal( true );
		});

		it( 'should throw an error if fn is not a function', () => {
			let error = false;
			try {
				curry( 'asdf' );
			} catch( e ) {
				error = true;
			}
			expect( error ).to.equal( true );

			error = false;
			try {
				curry( 3 );
			} catch( e ) {
				error = true;
			}
			expect( error ).to.equal( true );

			error = false;
			try {
				curry( {} );
			} catch( e ) {
				error = true;
			}
			expect( error ).to.equal( true );

			error = false;
			try {
				curry( [] );
			} catch( e ) {
				error = true;
			}
			expect( error ).to.equal( true );
		});

	});

});
