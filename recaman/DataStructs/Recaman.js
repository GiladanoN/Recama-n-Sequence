
let Recaman = function (n) {
  let arr = [];
  arr[0] = 0;
  for (let i=1; i<n; i++) {
    let cur = arr[i-1];
    let next = cur-i;
    if (next < 0 || arr.includes(next))
      next = cur+i;
    arr[i] = next;
  }
  return arr;
}

// interesting. the series acctually
//   does contains repeate elements!
