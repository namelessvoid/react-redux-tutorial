const initialState = {
    squares: Array(9).fill(null),
    xIsNext: true
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MARK":
            let newState = { ...state };
            newState.squares[action.payload.square] = action.payload.mark;
            return newState;
        default:
            return state;
    }
}

export default rootReducer;