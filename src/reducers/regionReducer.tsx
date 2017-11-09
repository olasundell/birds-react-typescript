import { initialState, StoreState } from './index';
import { Action, ActionTypeKeys } from '../actions/actions';
import { RegionComponentProps } from '../components/RegionComponent';

export default function regionResponse(state: StoreState = initialState, action: Action): RegionComponentProps {
	switch (action.type) {
		case ActionTypeKeys.RECEIVE_REGIONS:
			return Object.assign({}, state, {
				isLoading: false,
				regions: action.payload,
			});
		case ActionTypeKeys.REQUEST_REGIONS:
			return Object.assign({}, state, {
				isLoading: true,
			});
		case ActionTypeKeys.SET_CURRENT_REGION:
			return Object.assign({}, state, {
				currentRegion: action.payload,
			});
		default:
			return state;
	}
}
