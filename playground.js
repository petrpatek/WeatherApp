var object = {
  one: true,
  two: false,
  three: true
}

var arr = []

for (var key in object) {
  if (object.hasOwnProperty(key)) {
    if (object[key]) {
      arr.push(key);
    }
  }
}

console.log(arr);

console.log(object["one"]);
