const ActionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
  SELECTED_CATEGORY: 'SELECTED_CATEGORY',
};

const receiveCategoriesActionCreator = (categories) => ({
  type: ActionType.RECEIVE_CATEGORIES,
  payload: {
    categories,
  },
});

const selectedCategoryActionCreator = (category) => ({
  type: ActionType.SELECTED_CATEGORY,
  payload: {
    category,
  },
});

const asyncSelectedCategory = (category) => async (dispatch) => {
  dispatch(selectedCategoryActionCreator(category));
};

export
{
  ActionType,
  receiveCategoriesActionCreator,
  asyncSelectedCategory,
};
