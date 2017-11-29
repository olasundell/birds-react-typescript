import { Action, ActionTypeKeys } from '../actions/actions';
import { BirdComponentProps } from '../components/BirdComponent';
import { defaultLanguage } from '../models/Language';
import { defaultRegion } from '../models/Region';

export interface BirdReducer {
	bird: BirdComponentProps;
}

const initialState: BirdComponentProps = {
	currentLanguage: defaultLanguage(),
	currentRegion: defaultRegion(),
	isLoading: false,
	response: undefined,
};

export function randomBirdReducer(state: BirdComponentProps = initialState, action: Action): BirdComponentProps {
	switch (action.type) {
		case ActionTypeKeys.RECEIVE_BIRD:
			return {
				...state,
				isLoading: false,
				response: action.payload
			};
		case ActionTypeKeys.REQUEST_RANDOM_BIRD:
		case ActionTypeKeys.REQUEST_SPECIFIC_BIRD:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypeKeys.SET_CURRENT_LANGUAGE:
			return {
				...state,
				currentLanguage: action.payload,
			};
		case ActionTypeKeys.SET_CURRENT_REGION:
			return {
				...state,
				currentRegion: action.payload,
			};
		default:
			return state;
	}
}