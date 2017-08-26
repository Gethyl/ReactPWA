import React from "react";
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import {
	setItemsList,
	newItemOnBlur,
	addNewItem,
	toggleCompleteFlag,
} from '../actions/action'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'


let robotFontStyle = {
	fontFamily: "Roboto, sans-serif",
	color: "rgba(0, 0, 0, 0.870588)",
	textAlign:'center'
}
let markCompleteStyle = {
	textDecoration: "line-through"
}
let socket
const mapStateToProps = (state = {}) => {
	// console.dir(state)
	return { ...state };
};

export class Todo extends React.Component {
	constructor(props) {
		super(props)
		// const { dispatch } = this.props
	}

	componentDidMount(){
		const {dispatch} = this.props

		//TODO-GGK Move as async Action into action.js
    fetch('http://localhost:3000/api')
    .then(res => res.json())
    .then(res => {
        console.info("Response",res)
        dispatch(setItemsList(res))
    })
    .catch(err => {
			console.error("Error ",err)
			//TODO-GGK dispatch something here?
    })
  }


	render() {
		const { dispatch, items, newItem, offlineLogs, showOfflineBanner } = this.props

		return (
			<div>
				<h2 style={robotFontStyle}>My TO-DO List</h2>

				<Divider />
				<div style={{display:'flex',flexWrap:'wrap', justifyContent:'center', padding:10}}>
					<TextField
						id="newItem"
						value={newItem}
						label="New Item"
						fullWidth={false}
						onChange={(e) => {
							dispatch(newItemOnBlur(e.target.value))
						}}
					/>
					<Button
						children="Add todo" color="primary" raised={true}
						onTouchTap={() => dispatch(addNewItem(newItem))}
					/>
				</div>
				<Divider />
				{offlineLogs.length>0 && <div style={{background:'#000', color: 'orange' }}>You seem to have gone Offline :| </div>}
				<div style={{display:'flex',flexDirection:'row', flexWrap:'wrap'}}>
						<div style={{flex:'1 1 auto'}}>
							<h4 style={{textAlign:'center'}}>TODO Items</h4>
							{!!items && <List>{items.map((todo, key) => {
									return <ListItem key={todo._id} style={todo.completed ? markCompleteStyle : {}} onClick={(event) => {
														dispatch(toggleCompleteFlag(todo))
										}} >
												<ListItemText primary={todo.item} />
										</ListItem>
									})}
								</List>
							}	
						</div>
						{offlineLogs.length>0 && <div style={{flex:'2 1 auto', borderLeft:'2px solid #eee'}}>
							<h4 style={{textAlign:'center'}}>Offline Log</h4>
							<List>{offlineLogs.map((logMessage, index) => {
								return <ListItem key={index} onClick={(event) => {
									
								}} >
									<ListItemText primary={logMessage} />
								</ListItem>
							})}
							</List>
						</div>}
				</div>
							
			</div>
		);
	}
}

export default connect(mapStateToProps)(Todo)
