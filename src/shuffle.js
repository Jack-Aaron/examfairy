const shuffle = (a) => {
  var c = a.length, t, r;
  while (0 !== c) {
    r = Math.floor(Math.random() * c);
    c -= 1; t = a[c]; a[c] = a[r]; a[r] = t
  } return a
}
export default shuffle
 //https://bit.ly/3eNujre