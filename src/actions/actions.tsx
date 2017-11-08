import { RandomBirdResponse } from '../models/RandomBirdResponse';
import { createActionCreator } from 'react-redux-typescript/module/create-action-creator';
import { Dispatch } from 'react-redux';
import { StoreState } from '../reducers';

export const REQUEST_RANDOM_BIRD = 'REQUEST_RANDOM_BIRD';
export const RECEIVE_RANDOM_BIRD = 'RECEIVE_RANDOM_BIRD';
export const RANDOM_BIRD_ERROR = 'RANDOM_BIRD_ERROR';

export const actionCreators = {
	requestRandomBird: createActionCreator(REQUEST_RANDOM_BIRD),
	receiveRandomBird: createActionCreator(RECEIVE_RANDOM_BIRD, (state: RandomBirdResponse) => {
		return state;
	}),
	randomBirdError: createActionCreator(RANDOM_BIRD_ERROR),
};

type S<T> = { response: T };
type QRandomBirdResponse = S<{ randomBirdResponse: RandomBirdResponse }>;

export type Action = ({ type: 'REQUEST_RANDOM_BIRD' }) |
	({ type: 'RECEIVE_RANDOM_BIRD', payload: RandomBirdResponse} & QRandomBirdResponse) |
	// { type: 'RECEIVE_RANDOM_BIRD', randomBirdResponse: RandomBirdResponse } |
	// { type: 'RECEIVE_RANDOM_BIRD', randomBirdResponse: (rbr: RandomBirdResponse) => () } |
	({ type: 'RANDOM_BIRD_ERROR', error: string });

export function fetchRandomBird(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(actionCreators.requestRandomBird());
		return fetch('http://localhost:8080/random')
			.then(response => response.json())
			.then(json => dispatch(actionCreators.receiveRandomBird(json)));
	};
}
