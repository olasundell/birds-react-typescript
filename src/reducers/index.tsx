// import { Response } from '../models/Response';
// import { Action } from '../actions/actions';

// import { combineReducers } from 'redux';
//
// import { Action } from '../actions/actions';
// import { Response } from '../models/Response';

import { BirdResponse } from '../models/RandomBirdResponse';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import randomBirdResponse from './birdReducer';
import { createLogger } from 'redux-logger';
import languageResponse from './languageReducer';
import { defaultLanguage, Language } from '../models/Language';
import regionResponse from './regionReducer';
import { defaultRegion, Region } from '../models/Region';

export interface StoreState {
	currentLanguage: Language;
	currentRegion: Region;
	isLoading: boolean;
	response?: BirdResponse;
	languages: Language[];
	regions: Region[];
}

export const initialState: StoreState = {
	languages: [],
	regions: [],
	isLoading: false,
	response: undefined,
	currentLanguage: defaultLanguage,
	currentRegion: defaultRegion,
};

export const rootReducer = combineReducers<StoreState>({
	randomBirdResponse,
	languageResponse,
	regionResponse
});

export function configureStore() {
	return createStore<StoreState>(
		rootReducer,
		applyMiddleware(thunk, createLogger())
	);
}

// export namespace Store {
//
// 	export type All = {
// 		response: Response,
// 		isLoading: boolean,
// 		error: string,
// 	};
// }

// function isLoading (state: boolean = false, action: Action): boolean {
// 	switch (action.type) {
// 		case 'REQUEST_RANDOM_BIRD':
// 			return true;
// 		case 'RECEIVE_BIRD':
// 			return false;
// 		default:
// 			return state;
// 	}
// }
//
// function error (state: string = '', action: Action): string {
// 	switch (action.type) {
// 		case 'RANDOM_BIRD_ERROR':
// 			return action.error;
// 		default:
// 			return state;
// 	}
// }
//
// const initialState: Response = {
// 	genusBirds: [],
// 	media: {
// 		url: '',
// 		mediaType: ''
// 	},
// 	actualBird: {
// 		scientificName: '',
// 		genusName: '',
// 		name: ''
// 	}
// };
//
// function receiveRandomBird(state: Response = initialState, action: Action): Response {
// 	switch (action.type) {
// 		case 'RECEIVE_BIRD':
// 			return action.response;
// 		default:
// 			return state;
// 	}
// }
//
// export const reducers = combineReducers<Store.All>({
// 	receiveRandomBird,
// 	isLoading,
// 	error,
// });
// export namespace Store {
// 	export type StoredResponse = { response: Response };
//
// 	export type All = {
// 		response: StoredResponse
// 	};
// }
//
// const initialState: Store.StoredResponse = {
// 	response: null,
// }
//
// function response(state: Store.StoredResponse = initialState, action: Action): Store.StoredResponse {
// 	const { value } = state
// 	switch (action.type) {
// 		case 'RECEIVE_BIRD':
//
// 		default:
// 			return state;
// 	}
// }