const productionMode = true;
export const isOnboardingActive = productionMode ? false : true;
export const modalType = productionMode ? "WELCOME" : "WELCOME";  
const renderModal = false; 
export const renderFormModal = productionMode ? false : (isOnboardingActive || renderModal);
export const showProgressBar = true || false;
