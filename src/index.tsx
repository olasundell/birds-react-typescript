import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import { Provider } from 'react-redux';
import { configureStore } from './reducers';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,

	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
