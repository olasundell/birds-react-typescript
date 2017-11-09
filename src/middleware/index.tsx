// import * as redux from 'redux';
// import {Action, RECEIVE_BIRD, REQUEST_RANDOM_BIRD} from '../actions/actions';
// import { api } from '../api/api';
// import { actionCreators } from '../actions/actions';
//
// export const apiMiddleware = ({dispatch}: redux.MiddlewareAPI<{}>) =>
// 	(next: redux.Dispatch<{}>) =>
// 		(action: Action) => {
// 	switch (action.type) {
// 		case REQUEST_RANDOM_BIRD:
// 			api.randomBird()
// 				.then((response) => dispatch(actionCreators.receiveRandomBird(response)))
// 			break
// 		case RECEIVE_BIRD:
// 			break;
// 	}
// 		};
