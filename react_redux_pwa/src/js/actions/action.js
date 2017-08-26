
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

	const asyncItem = {
				originalAction: "addNewItem",
				successAction: { type: "API_FETCH_SUCCESS_ADD_ITEM"},
				successPassResponse: true,
				url: 'http://localhost:3000/api/additem',
				method:"POST",
				data: "",
				body: JSON.stringify({item:newItem, completed:false})
			}

	if (navigator.onLine){
		dispatch({type:"API_FETCH_ADD_ITEM"})
		dispatch(processQueuedAsyncActions({...asyncItem}))
	}
	else {
		dispatch(addOfflineLogMessage(`Queuing action - toggleComplete. ${newItem} will be marked Complete/Pending`))
		return { 
			type: "PROCESS_WHEN_ONLINE", 
			asyncItem:{...asyncItem}
		}
	}
}

export const toggleCompleteFlag = (todoItem) => (dispatch) => {
	const asyncItem = {
				originalAction: "toggleCompleteFlag",
				successAction: { type: "API_UPDATE_SUCCESS_COMPLETE_FLAG", id: todoItem._id },
				successPassResponse:false,
				url: `http://localhost:3000/api/update-complete-flag/${todoItem._id}`,
				method:"POST",
				data: "",
				body: JSON.stringify({ todo: todoItem })
			}

	if (navigator.onLine) {
		dispatch({ type: "API_UPDATE_COMPLETE_FLAG" })
		dispatch(processQueuedAsyncActions({...asyncItem}))
	}
	else {
		dispatch(addOfflineLogMessage(`Queuing action - toggleComplete. ${todoItem.item} will be marked Complete/Pending`))
		return { 
			type: "PROCESS_WHEN_ONLINE", 
			asyncItem:{...asyncItem}
		}
	}
}
/*******************************************************************************
 *  Function to handle Fetch to
 *  		> Add New Item.
 * 			> Mark an item as complete or pending.
 *******************************************************************************/
export const processQueuedAsyncActions = (asyncItem) => (dispatch) =>  {

	fetch(asyncItem.url, {
			method: asyncItem.method,
			mode: 'cors',
			headers: new Headers({ "Content-Type": "application/json" }),
			body: asyncItem.body || ""
		})
			.then(res => res.json())
			.then(res => {
				if (asyncItem.successPassResponse){
					dispatch({...asyncItem.successAction,res:res})
				}
				else{
					dispatch(asyncItem.successAction)
				}
			})
			.catch(err => {
				dispatch({type:"FETCH_FAIL"})
			})


}