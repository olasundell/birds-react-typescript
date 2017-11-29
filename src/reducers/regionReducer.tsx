import { Action, ActionTypeKeys } from '../actions/actions';
import { RegionComponentProps } from '../components/RegionComponent';
import { defaultRegion } from '../models/Region';

export interface RegionReducer {
	region: RegionComponentProps;
}

const initialState: RegionComponentProps = {
	regions: [],
	currentRegion: defaultRegion(),
	isLoading: false
};

export default function regionReducer(state: RegionComponentProps = initialState, action: Action): RegionComponentProps {
	switch (action.type) {
		case ActionTypeKeys.RECEIVE_REGIONS:
			return {
				...state,
				isLoading: false,
				regions: action.payload,
			};
		case ActionTypeKeys.REQUEST_REGIONS:
			return {
				...state,
				isLoading: true,
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
