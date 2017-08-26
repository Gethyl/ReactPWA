
export const completeItem = (todoItem) => ({
	type: "COMPLETED_ITEM",
})

export const setItemsList = (data) => ({
	type: "SET_ITEMS_LIST",
	items: data,
})

export const newItemOnBlur = (item) => ({
	type:'NEW_ITEM_ONBLUR',
	newItem: item
})

/**********************************************
 * Fetching Items - Actions
 **********************************************/

const startFetchingItems = () => {
	type:"API_FETCH_ADD_ITEM"
}

const fetchingItemsSuccess = () => {
	type:"API_FETCH_SUCCESS_ADD_ITEM"
}

const fetchingItemsFailed = () => {
	type:"API_FETCH_ERROR_ADD_ITEM"
}
/*********************************************
 * Offline Logging
 *********************************************/
const showOfflineBanner = () => ({
	type:"SHOW_OFFLINE_BANNER",
})

const addOfflineLogMessage = (message) => ({
	type:"ADD_OFFLINE_LOG_ITEM",
	message
})

const clearOfflineLogs = () =>( {
	type:"CLEAR_OFFLINE_LOGS"
})

export const onlineDetected = message => dispatch => {
	dispatch(addOfflineLogMessage(message))
	dispatch(clearOfflineLogs())
}

export const offlineDetected = message => dispatch => {
	dispatch(addOfflineLogMessage(message))
	dispatch(showOfflineBanner())
}



/*********************************************
 * Async FETCH Actions
 *********************************************/
export const addNewItem = newItem => dispatch => {

	if (navigator.onLine){
		dispatch({type:"API_FETCH_ADD_ITEM"})

		fetch('http://localhost:3000/api/additem',{
			method: 'POST',
			mode: 'cors',
			headers: new Headers({"Content-Type": "application/json"}),
			body:JSON.stringify({item:newItem, completed:false})
		})
			.then(res => res.json())
			.then(res => {
				dispatch({type:"API_FETCH_SUCCESS_ADD_ITEM",item:res})
			})
			.catch(err => {
				console.error("Error ",err)
				dispatch({type:"API_FETCH_ERROR_ADD_ITEM"})
			})
	}
	else {
		return {type:"SAVE_FOR_LATER",action:`addNewItem(${newItem})`}
	}
}

export const toggleCompleteFlag = (todoItem) => (dispatch) => {
	if (navigator.onLine) {
		dispatch({ type: "API_UPDATE_COMPLETE_FLAG" })

		fetch(`http://localhost:3000/api/update-complete-flag/${todoItem._id}`, {
			method: 'POST',
			mode: 'cors',
			headers: new Headers({ "Content-Type": "application/json" }),
			body: JSON.stringify({ todo: todoItem })
		})
			.then(res => res.json())
			.then(res => {
				dispatch({ type: "API_UPDATE_SUCCESS_COMPLETE_FLAG", id: res._id })
			})
			.catch(err => {
				console.error("Error ", err)
				dispatch({ type: "API_UPDATE_ERROR_COMPLETE_FLAG" })
			})
	}
	else {
		dispatch(addOfflineLogMessage(`Queuing toggleComplete action for ${todoItem.item}`))
		return { 
			type: "PROCESS_WHEN_ONLINE", 
			asyncItem: {
				originalAction: "toggleCompleteFlag",
				successAction: { type: "API_UPDATE_SUCCESS_COMPLETE_FLAG", id: todoItem._id },
				url: `http://localhost:3000/api/update-complete-flag/${todoItem._id}`,
				method:"POST",
				data: "",
				body: JSON.stringify({ todo: todoItem })
			}
		}
	}
}

export const processQueuedAsyncActions = (asyncItem) => (dispatch) =>  {

	fetch(asyncItem.url, {
			method: asyncItem.method,
			mode: 'cors',
			headers: new Headers({ "Content-Type": "application/json" }),
			body: asyncItem.body || ""
		})
			.then(res => res.json())
			.then(res => {
				// alert("We Did it!!!")
				dispatch(asyncItem.successAction)
			})
			.catch(err => {
				// alert("Not there yet!!!")
				dispatch({type:"FETCH_FAIL"})
			})


}