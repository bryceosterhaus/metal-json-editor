export const TYPE_COLORS = {
	boolean: '#AA0D91',
	null: '#FF8C00',
	number: '#1C00CF',
	readOnly: '#117700',
	string: '#C41A16'
};

export function setIn(initVal, locator = [], value) {
	if (!(initVal instanceof Object)) {
		return initVal;
	}

	let clonedVal = JSON.parse(JSON.stringify(initVal));

	let retVal = clonedVal;

	let i;

	for (i = 0; i < locator.length - 1; i++) {
		retVal = retVal[locator[i]];
	}

	retVal[locator[i]] = value;

	return clonedVal;
}