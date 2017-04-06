import getPerimeterSide from 'helpers/getPerimeterSide'

function buildCoordinateData(selectedModuleProps, anchorPositions, boardSpecs) {
  const { 
    x,
    y,
    width,
    height
  } = selectedModuleProps;
  let { boundToSideIndex } = selectedModuleProps;
  let { topLeft } = anchorPositions;
  
  if (Number.isInteger(boundToSideIndex)) {
    boundToSideIndex = boundToSideIndex === 3 ? 0 : boundToSideIndex + 1;
    const coordinateData = {
      boundToSide: getPerimeterSide(boundToSideIndex),
      moduleX: x,
      moduleY: y,
      moduleWidth: width,
      moduleHeight: height, 
      topLeftAnchorX: topLeft.x,
      topLeftAnchorY: topLeft.y,
      boardWidth: boardSpecs.width,
      boardHeight: boardSpecs.height
    }
    newParentGroupCoordinates = bindToPerimeter(coordinateData);
  }
}

export default function bindToPerimeter(selectedModuleProps, anchorPositions, boardSpecs)) {
const cd = buildCoordinateData();
 switch(cd.boundToSide) {
  case "bottom":
    return {
      x: cd.moduleX,
      y: cd.topLeftAnchorY + cd.boardHeight - cd.moduleHeight
    }
    break;
  case "left":
    return {
      x: cd.topLeftAnchorX + 0.5 * (cd.moduleHeight - cd.moduleWidth),
      y: cd.moduleY
    }
    break;
  case "top":
    return {
      x: cd.moduleX,
      y: cd.topLeftAnchorY
    }
    break;
  case "right":
    return {
       x: cd.topLeftAnchorX + cd.boardWidth - 0.5 * (cd.moduleHeight + cd.moduleWidth),
       y: cd.moduleY
    }
    break;
 }
}