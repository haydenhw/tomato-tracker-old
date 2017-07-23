const renderModal = false; 
const productionMode = false;
export const modalType = productionMode ? "WELCOME" : "EDIT_TASK";  

export const renderFormModal = productionMode ? false : renderModal;
export const isOnboardingActive = productionMode ? false : false;
export const showProgressBar = productionMode || false;
export const devStyle = !productionMode && {
    position: 'static',
    width: '300px',
    margin: '0 auto',
    transform: 'translate(0, 0)'
  };

