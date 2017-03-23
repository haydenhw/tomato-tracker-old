export const MOUSE_DOWN_ON_ICON = 'MOUSE_DOWN_ON_ICON'; 
export const mouseDownOnIcon = (bool) => ({
  type: 'MOUSE_DOWN_ON_ICON',
  isDown: bool
});

export const TOGGLE_IS_MOUSE_DOWN = 'TOGGLE_IS_MOUSE_DOWN'; 
export const toggleIsMouseDown = () => ({
  type: 'TOGGLE_IS_MOUSE_DOWN'
});

export const TOGGLE_IS_MOUSE_OVER_MODULE = 'TOGGLE_IS_MOUSE_OVER_MODULE'; 
export const toggleIsMouseOverModule = () => ({
  type: 'TOGGLE_IS_MOUSE_OVER_MODULE'
});