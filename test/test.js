const projects = require('./test-data');

// not designed to handle data with second level deep arrays non-array objects as properties;
function normalize(dataArray, idKey) {
  const byId = {};

  dataArray.forEach((item) => {
    const byIdProp = {};

    Object.keys(item).forEach((key) => {
      const itemKeyValue = item[key];

      if (Array.isArray(itemKeyValue)) {
        byIdProp[key] = item[key].map(subItem => subItem[idKey]);
      } else {
        byIdProp[key] = itemKeyValue;
      }
    });

    byId[item[idKey]] = byIdProp;
  });

  const allIds = dataArray.map(item => item[idKey]);

  return {
    byId,
    allIds,
  };
}

const res = normalize(projects, 'shortId');
// Object.keys(res.byId).forEach(key => console.log(res.byId[key]));
// console.log(JSON.stringify(res, null, 2));

const oz = 28;
const mushrooms = .5 * oz;
const choco = 6 * oz;
const ratio = choco / mushrooms;
const chocoVolRatio = 80 / 8;
const cell = 70 / 6;
const mushWeight = 3;
const cells = mushWeight * ratio / cell;
const mlPerOz = 29.57
// 19.6
const totalWeight = 54;
const tareWeight = 19.6;
//oz
const volume = 1;
//want: grams choco / fl oz
const gramPerFlOz =  (totalWeight - tareWeight) / volume;
// how many grams choco for half eigth of mush ?
// how many fl oz
// 1.75gm * ()
const choco4Halfer = 1.75 * ratio / gramPerFlOz;
const choco4Full = 3.5 * ratio / gramPerFlOz;

const barMoldVol = 70 / gramPerFlOz;

console.log(1.4 * gramPerFlOz);
// console.log(1.75 * ratio);
// console.log(21 / gramPerFlOz);
