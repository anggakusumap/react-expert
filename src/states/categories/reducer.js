import { ActionType } from './action';

const initialState = {
  value: [],
  selectedCategory: '',
};

const categoriesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_CATEGORIES:
      return {
        ...state,
        value: action.payload.categories,
      };
    case ActionType.SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: state.selectedCategory === action.payload.category ? '' : action.payload.category,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
