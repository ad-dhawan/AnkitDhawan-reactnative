const initialState = {
  feed: [],
};

export default (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case 'FEED':
      return {...state, feed: action.payload};

    default:
      return state;
  }
};
