// export const AddItem = (data) => ({
// 	type: "ADD_ITEM",
// 	item: data.item,
// 	itemId:data.id,
// 	completed:data.completed
// })

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
 * Async Actions
 *********************************************/
export const addNewItem = (newItem) => (dispatch) => {
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

export const toggleCompleteFlag = (todoItem) => (dispatch) => {
	dispatch({type:"API_UPDATE_COMPLETE_FLAG"})

	fetch(`http://localhost:3000/api/update-complete-flag/${todoItem._id}`,{
		method: 'POST',
		mode: 'cors',
		headers: new Headers({"Content-Type": "application/json"}),
		body:JSON.stringify({todo:todoItem})
	})
    .then(res => res.json())
    .then(res => {
       dispatch({type:"API_UPDATE_SUCCESS_COMPLETE_FLAG",id:res._id})
    })
    .catch(err => {
      console.error("Error ",err)
      dispatch({type:"API_UPDATE_ERROR_COMPLETE_FLAG"})
    })
}