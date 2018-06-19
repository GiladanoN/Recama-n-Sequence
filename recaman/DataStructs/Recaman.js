
let Recaman = function (n) {
  let arr = [];
  let cur = 0;
  let next;
  arr[0] = cur;
  for (let i=0; i<n; i++) {
    let j = i+1;
    next = arr[i]-j;
    if (next < 0 || arr.includes(next))
      next = arr[i]+j;
    arr[j] = next;
  }
  return arr;
}
