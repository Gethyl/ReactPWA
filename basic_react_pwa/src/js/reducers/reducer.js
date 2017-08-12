
const initialState = { loading:true}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'INITIAL_LIST':
	  return {
        ...state
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer