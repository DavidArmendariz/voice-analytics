const extractKeys = (object, excludedKey) => {
  const keys = Object.keys(object);
  const index = keys.indexOf(excludedKey);
  if (index > -1) {
    keys.splice(index, 1);
  }
  return keys;
};

export default extractKeys;
