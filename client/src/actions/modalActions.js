

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const toggleModal = () => ({
  type: 'TOGGLE_MODAL',
});

export const TOGGLE_ONBOARD_MODE = 'TOGGLE_ONBOARD_MODE';
export const toggleOnboardMode = () => ({
  type: 'TOGGLE_ONBOARD_MODE',
});

export const TOGGLE_ADD_TASKS_FORM = 'TOGGLE_ADD_TASKS_FORM';
export const toggleAddTasksForm = () => ({
  type: 'TOGGLE_ADD_TASKS_FORM',
});

export const TOGGLE_EDIT_TASK_FORM = 'TOGGLE_EDIT_TASK_FORM';
export const toggleEditTaskForm = (taskId) => ({
  type: 'TOGGLE_EDIT_TASK_FORM',
  taskId
});

export const TOGGLE_PROJECT_NAG_MODAL = 'TOGGLE_PROJECT_NAG_MODAL';
export const toggleProjectNagModal = () => ({
  type: 'TOGGLE_PROJECT_NAG_MODAL',
});

export const CONFIRM_EDIT_TASK = 'CONFIRM_EDIT_TASK';
export const confirmEditTask = (modalProps) => ({
  type: 'CONFIRM_EDIT_TASK',
  modalProps
});


export const CHANGE_MODAL_TYPE = 'CHANGE_MODAL_TYPE';
export const changeModalType = modalType => ({
  type: 'CHANGE_MODAL_TYPE',
  modalType,
});

export const UPDATE_MODAL_PROPS = 'UPDATE_MODAL_PROPS';
export const updateModalProps = modalProps => ({
  type: 'UPDATE_MODAL_PROPS',
  modalProps,
});

export const CONFIRM_PROJECT_DELETE = 'CONFIRM_PROJECT_DELETE';
export const confirmProjectDelete = modalProps => ({
  type: 'CONFIRM_PROJECT_DELETE',
  modalProps,
  modalType: 'CONFIRM',
});
