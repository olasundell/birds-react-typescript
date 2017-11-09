import { Action, ActionTypeKeys } from '../actions/actions';
import { initialState, StoreState } from './index';
import { BirdComponentProps } from '../components/BirdComponent';

// const initialState: Response = {
export default function randomBirdResponse(state: StoreState = initialState, action: Action): BirdComponentProps {
	switch (action.type) {
		case ActionTypeKeys.RECEIVE_BIRD:
			return Object.assign({}, state, {
				isLoading: false,
				response: action.payload,
			});
		case ActionTypeKeys.REQUEST_RANDOM_BIRD:
		case ActionTypeKeys.REQUEST_SPECIFIC_BIRD:
			return Object.assign({}, state, {
				isLoading: true,
			});
		case ActionTypeKeys.SET_CURRENT_LANGUAGE:
			return Object.assign({}, state, {
				currentLanguage: action.payload,
			});
		case ActionTypeKeys.SET_CURRENT_REGION:
			return Object.assign({}, state, {
				currentRegion: action.payload,
			});
		default:
			return state;
	}
}