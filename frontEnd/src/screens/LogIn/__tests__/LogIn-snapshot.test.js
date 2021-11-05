import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';

import renderer from 'react-test-renderer';
import LogIn from '../LogIn';

test('LogIn renders correctly', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<LogIn />
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
