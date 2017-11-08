import { Action } from '../actions/actions';
import { initialState, StoreState } from './index';
import {BirdComponentProps} from '../components/BirdComponent';

// const initialState: Response = {
export default function randomBirdResponse(state: StoreState = initialState, action: Action): BirdComponentProps {
	switch (action.type) {
		case 'RECEIVE_RANDOM_BIRD':
			// console.log('reducing random bird ' + JSON.stringify(action));
			// return action.payload;

			return {
				isLoading: false,
				response: action.payload,
			};

			// return Object.assign({}, state, {
			// 	response: action.payload,
			// 	isLoading: false,
			// });
		case 'REQUEST_RANDOM_BIRD':
			return Object.assign({}, state, {
				isLoading: true,
			});
		default:
			return state;
	}
}