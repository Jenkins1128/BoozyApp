import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import renderer from 'react-test-renderer';
import SignUp from '../SignUp';

test('renders correctly', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<SignUp />
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
