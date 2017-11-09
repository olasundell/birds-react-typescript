import { connect, Dispatch } from 'react-redux';
import { Region } from '../models/Region';
import * as React from 'react';
import { StoreState } from '../reducers';
import { bindActionCreators } from 'redux';
import { setCurrentRegion as setCurrentRegionAction } from '../actions/actions';

export interface RegionComponentProps {
	regions: Region[];
	currentRegion: Region;
	isLoading: boolean;
}

interface RegionComponentActions {
	setCurrentRegion(language: Region): (dispatch: Dispatch<StoreState>) => Promise<{}>;
}

interface RegionComponentParams extends RegionComponentActions, RegionComponentProps {
}

class RegionComponent extends React.Component<RegionComponentParams, object> {
	regionMap: Map<string, Region>;

	constructor(props: RegionComponentParams) {
		super(props);
		this.regionMap = new Map();
	}

	componentWillReceiveProps(nextProps: RegionComponentParams, nextState: any) {
		nextProps.regions.forEach((region: Region) => this.regionMap.set(region.code, region));
	}

	change(event: React.FormEvent<HTMLSelectElement>) {
		const { setCurrentRegion } = this.props;

		// No longer need to cast to any - hooray for react!
		const safeSearchTypeValue: string = event.currentTarget.value;

		// console.log(event.currentTarget.value);

		// console.log(safeSearchTypeValue); // in chrome => B
		const region = this.regionMap.get(safeSearchTypeValue);

		if (region) {
			setCurrentRegion(region);
		} else {
			console.log(`Could not find region with code ${safeSearchTypeValue}`);
			// TODO scream
		}
	}

	render() {
		const { isLoading, regions, currentRegion } = this.props;
		if (isLoading) {
			return (<h2>loading</h2>);
		}

		console.log(regions[1]);

		return (
			<div>
				Choose region:&nbsp;
				<select onChange={e => this.change(e)} value={currentRegion.code}>
					{regions.map((l: Region) => <option key={l.code} value={l.code}>{l.name}</option>)}
				</select>
			</div>
		);
	}
}

function mapStateToProps(state: any) {
	// console.log(JSON.stringify(state));
	return {
		regions: state.regionResponse.regions,
		isLoading: state.regionResponse.isLoading,
		currentRegion: state.regionResponse.currentRegion,
	};
}

function mapDispatchToActions(dispatch: Dispatch<StoreState>): RegionComponentActions {
	return {
		setCurrentRegion: bindActionCreators(setCurrentRegionAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToActions)(RegionComponent);
