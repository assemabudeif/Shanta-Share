const INITIAL_VALUE = {
    loader: false
}
export default function LoaderReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        default:
            return state
    }
}