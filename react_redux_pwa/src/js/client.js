import React from "react"
import ReactDOM from "react-dom"
import { compose, createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers/reducer'

import reactImages from '../images/react-logo.png'

import createMuiTheme from 'material-ui/styles/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainContainer from './containers/MainContainer'

import localforage from 'localforage'

const app = document.getElementById('app')
const theme = createMuiTheme()

const apiForage = "my-api-db"
localforage.config({
    driver: [localforage.INDEXEDDB,
             localforage.LOCALSTORAGE],
    name: apiForage,
    storeName: 'my-indexeddb-store'
  });

// const myReduxMiddleware = ({dispatch,getState}) => nextMiddleWareOrDispatch => action => {
// 	console.log("Neeeext",nextMiddleWareOrDispatch)
// 	console.log("action ===> ",action)
// 	const newState =  nextMiddleWareOrDispatch(action)
// 	// debugger
// 	console.log("new State ===> ",getState())
// 	localStorage.setItem('myReduxState',JSON.stringify(getState()))
// 	return newState
// }

const myReduxStoreEnhancer = () => (createStore) => (reducer, preloadedState) => {
	const store = createStore(reducer, preloadedState)
	const dispatch = (action) => {
		console.info('Old State before dispatch ==>', store.getState())
		console.log("localforage in client ===> ", localforage)
		localforage.getItem('key1').then(res => console.log("local forage from client.js", res ))
		
		const actionReturned = store.dispatch(action)
		console.info("New State after the dispatch==> ", store.getState())
		return actionReturned
	}
	store.subscribe(() => {
		console.log("State From Subscribe function ==> ", store.getState())
	})

	// store.sub
	return {
		...store,
		// subscribe,
		dispatch
	}

}

const store = createStore(
	reducer,
	JSON.parse(localStorage.getItem('myReduxState'))||{newItem:''},
	compose(
		applyMiddleware(
			thunk,
			// myReduxMiddleware,
		),
		myReduxStoreEnhancer()
	)
)

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<MainContainer/>
		</MuiThemeProvider>
	</Provider>
	, app)