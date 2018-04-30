export default (state = null, action)=> {
    switch (action.type) {
        case 'USER_SELECTED':
            return action.payload;
            break;
        case 'USER_SEARCH':
            return action.payload;
            break;
    }
    return state;
}
