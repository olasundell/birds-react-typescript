import { Action, ActionTypeKeys } from '../actions/actions';
import { LanguageComponentProps } from '../components/LanguageComponent';
import { defaultLanguage } from '../models/Language';

export interface LanguageReducer {
	language: LanguageComponentProps;
}

const initialState: LanguageComponentProps = {
	languages: [],
	currentLanguage: defaultLanguage(),
	isLoading: false
};

export default function languageReducer(state: LanguageComponentProps = initialState, action: Action): LanguageComponentProps {
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
