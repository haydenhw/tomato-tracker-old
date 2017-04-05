export default function rotate(rotation, x, y, width, height) {
  rotation = rotation === 360 ? 0 : rotation;
  // rotate module about the center
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
    default:
      console.log(rotation);
  }
  
  rotation += 90;
  
  return { rotation, x, y } 
}