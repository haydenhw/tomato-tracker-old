export function secondsToMSS(d) {
  d = Number(d);
  
  var m = Math.floor(d / 60);
  var s = Math.floor(d % 360 % 60);
  
  return m + ":" + ('1' + s).slice(-2);
}

export function secondsToHMMSS(d) {
  d = Number(d);
  
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  
  return h + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}

function hasNaN(array) {
  const nanValueCount = array.filter(element => isNaN(Number(element))).length;
  
  return Boolean(nanValueCount);
}

export function timeStringToSeconds(value) {
  const splitValue = value.split(":");
  
  if (hasNaN(splitValue)) {
    return 'NAN_ERROR'
  } 
  
  if (splitValue.length === 0 ) {
    return 0
  }

  const hours = Number(splitValue[0]);
  const minutes = splitValue.length > 1 ? Number(splitValue[1]) : 0;
  const seconds = splitValue.length > 2 ? Number(splitValue[2]) : 0;
  
  return hours * 3600 + minutes * 60 + seconds 
}

