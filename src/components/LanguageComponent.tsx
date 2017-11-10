import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Language } from '../models/Language';
import { StoreState } from '../reducers';
import { bindActionCreators } from 'redux';
import { setCurrentLanguage as setCurrentLanguageAction } from '../actions/actions';

export interface LanguageComponentProps {
	languages: Language[];
	currentLanguage: Language;
	isLoading: boolean;
}

export interface LanguageComponentActions {
	setCurrentLanguage(language: Language): (dispatch: Dispatch<StoreState>) => Promise<{}>;
}

export interface LanguageComponentParams extends LanguageComponentActions, LanguageComponentProps {
}

class LanguageComponent extends React.Component<LanguageComponentParams, object> {
	langMap: Map<string, Language>;

	constructor(props: LanguageComponentParams) {
		super(props);
		this.langMap = new Map();
	}

	componentWillReceiveProps(nextProps: LanguageComponentParams, nextState: any) {
		nextProps.languages.forEach((lang: Language) => this.langMap.set(lang.code, lang));
	}

	change(event: React.FormEvent<HTMLSelectElement>) {
		const { setCurrentLanguage } = this.props;

		const safeSearchTypeValue: string = event.currentTarget.value;

		const language = this.langMap.get(safeSearchTypeValue);

		if (language) {
			setCurrentLanguage(language);
		} else {
			// TODO scream
		}
	}

	render() {
		const { isLoading, languages, currentLanguage } = this.props;
		if (isLoading) {
			return (<h2>loading</h2>);
		}

		return (
			<div>
				Choose language:&nbsp;
				<select onChange={e => this.change(e)} value={currentLanguage.code} >
					{languages.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
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
		currentLanguage: state.languageResponse.currentLanguage,
	};
}

function mapDispatchToProps(dispatch: Dispatch<StoreState>): LanguageComponentActions {
	return {
		setCurrentLanguage: bindActionCreators(setCurrentLanguageAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageComponent);
