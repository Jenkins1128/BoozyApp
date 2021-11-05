const isEmpty = (currentState) => {
	for (const x in currentState) {
		return false;
	}
	return true;
};

export default isEmpty;
