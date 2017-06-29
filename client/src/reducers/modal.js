import * as actions from 'actions/indexActions';

import { modalType, renderFormModal } from '../config'

const defaultState = {
  isModalActive: renderFormModal,
  isOnboardingActive: false, 
  modalType: modalType,
  modalProps: null,
  rootModalClass: 'unfold'    
};

export const modal = (state = defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE_MODAL:
    case actions.DELETE_PROJECT_REQUEST:
      return {
        ...state,
        isModalActive: !state.isModalActive,
      };
    case actions.TOGGLE_ONBOARD_MODE:
      return {
        ...state,
        rootModalClass: 'roadrunner',
        isModalActive: !state.isModalActive,
        isOnboardingActive: !state.isOnboardingActive,
      };
    case actions.TOGGLE_ADD_TASKS_FORM:
      return {
        ...state,
        isModalActive: !state.isModalActive,
        modalType: 'ADD_TASKS'
      };
    case actions.TOGGLE_EDIT_TASK_FORM:
      return {
        ...state,
        isModalActive: true,
        modalType: 'EDIT_TASK'
      };
    case actions.TOGGLE_PROJECT_NAG_MODAL:
      return {
        ...state,
        isModalActive: true,
        modalType: 'PROJECT_NAG'
      };
    case actions.CONFIRM_EDIT_TASK:
      return {
        ...state,
        isModalActive: true,
        modalType: 'CONFIRM_EDIT_TASK',
        modalProps: action.modalProps
      };
    case actions.EDIT_TASK_REQUEST:
      return {
        ...state,
        isModalActive: false,
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
      }    
    default:
      return state;
  }
};
