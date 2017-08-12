import React from "react"
import ReactDOM from "react-dom"
import reactImages from '../images/react-logo.png'

import createMuiTheme from 'material-ui/styles/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainContainer from './containers/MainContainer'

const app = document.getElementById('app')
const theme = createMuiTheme()

ReactDOM.render(
		<MuiThemeProvider theme={theme}>
			<MainContainer></MainContainer>
		</MuiThemeProvider>
	, app)