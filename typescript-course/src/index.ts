function combine(input1: number | string, input2: number | string) {
  //runtime check
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combineAges = combine(12, 37);
console.log(combineAges);

const combineNames = combine("John", "Jane");
console.log(combineNames);
