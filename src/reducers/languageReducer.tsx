import { initialState, StoreState } from './index';
import { Action, ActionTypeKeys } from '../actions/actions';
import { LanguageComponentProps } from '../components/LanguageComponent';

export default function languageResponse(state: StoreState = initialState, action: Action): LanguageComponentProps {
	switch (action.type) {
		case ActionTypeKeys.RECEIVE_LANGUAGES:
			return {
				isLoading: false,
				languages: action.payload,
			};
		case ActionTypeKeys.REQUEST_LANGUAGES:
			return Object.assign({}, state, {
				isLoading: true,
			});
		default:
			return state;
	}
}
