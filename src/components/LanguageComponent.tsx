import * as React from 'react';
import { connect } from 'react-redux';
import { Language } from '../models/Language';

export interface LanguageComponentProps {
	languages: Language[];
	isLoading: boolean;
}

class LanguageComponent extends React.Component<LanguageComponentProps, object> {
	render() {
		const { isLoading, languages } = this.props;
		if (isLoading) {
			return (<h2>loading</h2>);
		}

		return (
			<div>
				Choose language:&nbsp;
				<select>
					{languages.map((l) => <option value={l.code}>{l.name}</option>)}
				</select>
			</div>
		);
	}
}

function mapStateToProps(state: any) {
	// console.log(JSON.stringify(state));
	return {
		languages: state.languageResponse.languages,
		isLoading: state.languageResponse.isLoading,
	};
}

export default connect(mapStateToProps)(LanguageComponent);
