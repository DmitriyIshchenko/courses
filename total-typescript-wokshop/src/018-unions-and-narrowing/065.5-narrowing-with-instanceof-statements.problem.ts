const somethingDangerous = () => {
  if (Math.random() > 0.5) {
    throw new Error("Something went wrong");
    // throw "Something went wrong";
  }

  return "all good";
};

try {
  somethingDangerous();
} catch (error) {
  // How do we change this code to make it
  // not show a red squiggly?
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    throw error; // cover the case when just the string was thrown (line 4)
  }
}
