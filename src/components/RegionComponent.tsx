import { connect } from 'react-redux';
import { Region } from '../models/Region';
import * as React from 'react';

export interface RegionComponentProps {
	regions: Region[];
	isLoading: boolean;
}

class RegionComponent extends React.Component<RegionComponentProps, object> {
	render() {
		const { isLoading, regions } = this.props;
		if (isLoading) {
			return (<h2>loading</h2>);
		}

		return (
			<div>
				Choose region:&nbsp;
				<select>
					{regions.map((l) => <option value={l.code}>{l.name}</option>)}
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
	};
}

export default connect(mapStateToProps)(RegionComponent);
