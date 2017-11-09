import { RandomBirdResponse } from '../models/RandomBirdResponse';
import { createActionCreator } from 'react-redux-typescript/module/create-action-creator';
import { Dispatch } from 'react-redux';
import { StoreState } from '../reducers';
import { Language } from '../models/Language';
import { Region } from '../models/Region';

// export const REQUEST_RANDOM_BIRD = 'REQUEST_RANDOM_BIRD';
// export const RECEIVE_RANDOM_BIRD = 'RECEIVE_RANDOM_BIRD';
// export const RANDOM_BIRD_ERROR = 'RANDOM_BIRD_ERROR';
//
// export const REQUEST_LANGUAGES = 'REQUEST_LANGUAGES';
// export const RECEIVE_LANGUAGES = 'RECEIVE_LANGUAGES';
//
// export const REQUEST_REGIONS = 'REQUEST_REGIONS';
// export const RECEIVE_REGIONS = 'RECEIVE_REGIONS';

export enum ActionTypeKeys {
	REQUEST_RANDOM_BIRD = 'REQUEST_RANDOM_BIRD',
	RECEIVE_RANDOM_BIRD = 'RECEIVE_RANDOM_BIRD',
	RANDOM_BIRD_ERROR = 'RANDOM_BIRD_ERROR',

	REQUEST_LANGUAGES = 'REQUEST_LANGUAGES',
	RECEIVE_LANGUAGES = 'RECEIVE_LANGUAGES',
	SET_CURRENT_LANGUAGE = 'SET_CURRENT_LANGUAGE',

	REQUEST_REGIONS = 'REQUEST_REGIONS',
	RECEIVE_REGIONS = 'RECEIVE_REGIONS',
	SET_CURRENT_REGION = 'SET_CURRENT_REGION',
}

export const actionCreators = {
	requestRandomBird: createActionCreator(ActionTypeKeys.REQUEST_RANDOM_BIRD),
	receiveRandomBird: createActionCreator(ActionTypeKeys.RECEIVE_RANDOM_BIRD, (state: RandomBirdResponse) => {
		return state;
	}),
	randomBirdError: createActionCreator(ActionTypeKeys.RANDOM_BIRD_ERROR),

	requestLanguages: createActionCreator(ActionTypeKeys.REQUEST_LANGUAGES),
	receiveLanguages: createActionCreator(ActionTypeKeys.RECEIVE_LANGUAGES, (state: Language[]) => { return state; }),
	setCurrentLanguage: createActionCreator(ActionTypeKeys.SET_CURRENT_LANGUAGE, (state: Language) => { return state; }),

	requestRegions: createActionCreator(ActionTypeKeys.REQUEST_REGIONS),
	receiveRegions: createActionCreator(ActionTypeKeys.RECEIVE_REGIONS, (state: Region[]) => { return state; }),
	setCurrentRegion: createActionCreator(ActionTypeKeys.SET_CURRENT_REGION, (state: Region) => { return state; })
};

type S<T> = { response: T };

type QRandomBirdResponse = S<{ randomBirdResponse: RandomBirdResponse }>;
type QLanguagesResponse = S<{ languages: Language[] }>;
type QLanguageResponse = S<{ currentLanguage: Language }>;
type QRegionsResponse = S<{ regions: Region[] }>;
type QRegionResponse = S<{ region: Region }>;

export type Action = ({ type: ActionTypeKeys.REQUEST_RANDOM_BIRD }) |
	({ type: ActionTypeKeys.RECEIVE_RANDOM_BIRD, payload: RandomBirdResponse} & QRandomBirdResponse) |
	({ type: ActionTypeKeys.RANDOM_BIRD_ERROR, error: string }) |
	({ type: ActionTypeKeys.REQUEST_LANGUAGES }) |
	({ type: ActionTypeKeys.RECEIVE_LANGUAGES, payload: Language[] }  & QLanguagesResponse) |
	({ type: ActionTypeKeys.SET_CURRENT_LANGUAGE, payload: Language }  & QLanguageResponse) |
	({ type: ActionTypeKeys.REQUEST_REGIONS}) |
	({ type: ActionTypeKeys.RECEIVE_REGIONS, payload: Region[]} & QRegionsResponse) |
	({ type: ActionTypeKeys.SET_CURRENT_REGION, payload: Region}  & QRegionResponse)
	;

export function fetchRandomBird(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(actionCreators.requestRandomBird());
		return fetch('http://localhost:8080/random')
			.then(response => response.json())
			.then(json => dispatch(actionCreators.receiveRandomBird(json)));
	};
}

export function fetchLanguages(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(actionCreators.requestLanguages());
		return fetch('http://localhost:8080/languages')
			.then(response => response.json())
			.then(json => dispatch(actionCreators.receiveLanguages(json)));
	};
}

export function fetchRegions(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(actionCreators.requestRegions());
		return fetch('http://localhost:8080/regions')
			.then(response => response.json())
			.then(json => dispatch(actionCreators.receiveRegions(json)));
	};
}

export function setCurrentLanguage(language: Language): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		return dispatch(actionCreators.setCurrentLanguage(language));
	};
}
