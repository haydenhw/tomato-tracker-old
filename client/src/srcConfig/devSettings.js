const renderModal = false; 
const productionMode = false;
export const isOnboardingActive = productionMode ? false : false;
export const modalType = productionMode ? "WELCOME" : "WELCOME";  

export const renderFormModal = productionMode ? false : (isOnboardingActive || renderModal);
export const showProgressBar = true || false;
// export const devStyle = !productionMode && {
//     position: 'static',
//     width: '300px',
//     margin: '0 auto',
//     transform: 'translate(0, 0)'
//   };

