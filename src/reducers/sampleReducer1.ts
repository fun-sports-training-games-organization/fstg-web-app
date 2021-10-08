type Action = {
    type: string;
};
type State = {
    x: number;
};

const initialState = { x: 1 };
const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                x: state.x + 1
            };
        case 'DECREMENT':
            return {
                x: state.x + 1
            };
        case 'RESET':
            return {
                x: state.x + 1
            };
        default:
            return state;
    }
};
export default reducer;
