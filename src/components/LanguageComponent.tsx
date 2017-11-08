import * as React from 'react';
import { } from '../models/RandomBirdResponse';
import { connect } from 'react-redux';
import { Language } from '../models/Language';

export interface LanguageComponentProps {
	languages: Language[];
}

export class LanguageComponent extends React.Component<LanguageComponentProps, object> {

}

function mapStateToProps(state: any) {
	return {
		languages: state.languageResponse.languages,
		isLoading: state.languageResponse.isLoading,
	};
}

export default connect(mapStateToProps)(LanguageComponent);
