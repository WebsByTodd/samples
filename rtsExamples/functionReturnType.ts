/**
 * One approach
 */
function add(x: number, y: number) {
	return x + y;
}

function subtract(x: number, y: number) {
	x - y;
}

/**
 * A better approach
 */
function add2(x: number, y: number): number {
	return x + y;
}

function subtract2(x: number, y: number): number {
	x - y; // we forgot to return a number and TS will let us know
}