// Unknown
// is better than any but you have to to runtime type check to do anything with it

let userInput: unknown;
let userName: string;

userInput = 0; // ok
userInput = "text"; // also ok
// userName = userInput; // Error

// need runtime check
if (typeof userInput === "string") {
  userName = userInput; // ok
  console.log(userName);
}

// Never

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };

  // also never returns
  // while(true) {
  //
  // }
}

generateError("err", 500);
// const res = generateError("err", 500); // Error
