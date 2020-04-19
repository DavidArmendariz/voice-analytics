const arrayToObject = (array, key, keyValue) => {
  const map = {};
  array.forEach(value => {
      map[value[key]] = value[keyValue]});
  return map;
};

export default arrayToObject;
