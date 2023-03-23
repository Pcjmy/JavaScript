function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let left = [];
  let right = [];
  let x = arr[0];
  for (let i=1; i<arr.length; i++) {
    if (arr[i]<x) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(arr[0],quickSort(right))
}

console.log(quickSort([2,7,3,1,6,5,4,9,8]))