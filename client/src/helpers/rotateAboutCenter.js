export default function rotateAboutCenter(boundToSideIndex, rotation, x, y, width, height) {
  if (Number.isInteger(boundToSideIndex)) {
    boundToSideIndex = boundToSideIndex === 3 ? 0 : boundToSideIndex + 1;
  }
  
  rotation = rotation === 360 ? 0 : rotation;
  switch(rotation) {
    case 0: 
      x = x + .5 * (width + height);
      y = y + .5 * (height - width);
      break;
    case 90: 
      x = x + .5 * (width - height);
      y = y + .5 * (width + height);
      break;
    case 180: 
      x = x - .5 * (width + height);
      y = y + .5 * (width - height);
      break;
    case 270: 
      x = x - .5 * (width - height);
      y = y - .5 * (width + height);
      break;
  }
  
  rotation += 90;
  
  return { boundToSideIndex, rotation, x, y } 
}