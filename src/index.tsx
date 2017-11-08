import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from './reducers';

// let store: redux.Store<Store.All> = redux.createStore(
// 	rootReducer,
// 	{} as Store.All,
// 	redux.applyMiddleware(thunk),
// );

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,

	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
