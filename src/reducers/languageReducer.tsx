import { initialState, StoreState } from './index';
import { Action, ActionTypeKeys } from '../actions/actions';
import { LanguageComponentProps } from '../components/LanguageComponent';

export default function languageResponse(state: StoreState = initialState, action: Action): LanguageComponentProps {
	switch (action.type) {
		case ActionTypeKeys.RECEIVE_LANGUAGES:
			return Object.assign({}, state, {
				isLoading: false,
				languages: action.payload,
			});
		case ActionTypeKeys.REQUEST_LANGUAGES:
			return Object.assign({}, state, {
				isLoading: true,
			});
		case ActionTypeKeys.SET_CURRENT_LANGUAGE:
			return Object.assign({}, state, {
				currentLanguage: action.payload,
			});
		default:
			return state;
	}
}
