const productionMode = true;

export const renderModal = productionMode || true;
export const showProgressBar = productionMode || true;
export const devStyle = !productionMode && {
    position: 'static',
    width: '300px',
    margin: '0 auto',
    transform: 'translate(0, 0)'
  };