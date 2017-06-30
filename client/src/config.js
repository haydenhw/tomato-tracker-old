const renderModal = false; 
const productionMode = false;

export const renderFormModal = productionMode || renderModal;
export const modalType = productionMode ? "WELCOME" : "ADD_TASKS";  
export const showProgressBar = productionMode || false;
export const devStyle = !productionMode && {
    position: 'static',
    width: '300px',
    margin: '0 auto',
    transform: 'translate(0, 0)'
  };

