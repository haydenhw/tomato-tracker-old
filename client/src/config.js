const renderModal = true; 
export const modalType = productionMode ? "WELCOME" : "ADD_PROJECT";  
const productionMode = false;

export const renderFormModal = productionMode ? false : renderModal;
export const isOnboardingActive = productionMode ? false : renderModal;
export const showProgressBar = productionMode || false;
export const devStyle = !productionMode && {
    position: 'static',
    width: '300px',
    margin: '0 auto',
    transform: 'translate(0, 0)'
  };

