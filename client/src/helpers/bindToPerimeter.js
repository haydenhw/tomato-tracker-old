export default function bindToPerimeter(coordinateData) {
const cd = coordinateData;
 
 switch(cd.boundToSide) {
  case "bottom":
    return {
      x: cd.moduleX,
      y: cd.boardHeight - cd.moduleHeight
    }
    break;
  case "left":
    return {
      x: 0 + 0.5 * (cd.moduleHeight - cd.moduleWidth),
      y: cd.moduleY
    }
    break;
  case "top":
    return {
      x: cd.moduleX,
      y: 0
    }
    break;
  case "right":
    return {
       x: cd.boardWidth - 0.5 * (cd.moduleHeight + cd.moduleWidth),
       y: cd.moduleY
    }
    break;
 }
}