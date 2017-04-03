const fontSize = 10;
const fontFamily = "Calibri";
const fill = "green";
const opacity = 0.1;
const stroke = "black";
const strokeWidth = 0.6;
const imageDir = './modules-images';

export const modulesData = [
  {
    x: null,
    y: null,
    width: 90,
    height: 110,
    rotation: 0,
    text: "Barrel Connector (20V 3A)",
    textX: 10,
    textY: 25,
    fontSize,
    fontFamily,
    fill,
    opacity,
    stroke,
    strokeWidth,
    imageX: 10,
    imageY: 10,
    imageWidth: 70,
    imageHeight: 100,
    imageSrc: require(`${imageDir}/barrel-connector.svg`),
    iconSrc: require(`${imageDir}/barrel-connector-icon.svg`),
    iconHeight: "70px",
    price: null,
    info: null
  },
  {
    x: null,
    y: null,
    width: 75,
    height: 75,
    rotation: 0,
    text: "3.5V/1.5A Regulator",
    textX: 15,
    textY: 20,
    fontSize,
    fontFamily,
    fill,
    opacity,
    stroke,
    strokeWidth,
    imageX: null,
    imageY: null,
    imageWidth: null,
    imageHeight: null,
    imageSrc: null,
    iconSrc: require(`${imageDir}/regulator-icon.svg`),
    iconHeight: "55px",
    price: null,
    info: null
  }
]