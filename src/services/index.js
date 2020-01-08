function sortArray(array, param) {
  return array.sort((a, b) =>
    a[param] > b[param] ? 1 : b[param] > a[param] ? -1 : 0
  );
}

module.exports.sortArray = sortArray;
