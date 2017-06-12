import * as actions from 'actions/indexActions';

const defaultState = {
  isModalActive: false,
  isFormModalActive: true,
  modalType: 'ADD_TASKS',
  modalProps: null,
};

export const modal = (state = defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE_IS_MODAL_ACTIVE:
    case actions.DELETE_PROJECT_REQUEST:
      return {
        ...state,
        shouldRenderModal: !state.shouldRenderModal,
      };
    case actions.TOGGLE_IS_FORM_MODAL_ACTIVE:
      return {
        ...state,
        isFormModalActive: !state.shouldRenderModal,
      };
    case actions.CHANGE_MODAL_TYPE:
      return {
        ...state,
        modalType: action.modalType,
      };
    case actions.UPDATE_MODAL_PROPS:
      return {
        ...state,
        modalProps: action.modalProps,
      };
    case actions.CONFIRM_PROJECT_DELETE:
      return {
        shouldRenderModal: true,
        modalType: 'CONFIRM',
        modalProps: action.modalProps,
      };

    default:
      return state;
  }
};
