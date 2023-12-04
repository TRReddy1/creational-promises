/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 

    Ensure that the function is invoked as follows: 
        fsProblem1(absolutePathOfRandomDirectory, randomNumberOfFiles)
*/

const fs = require("fs");

function problem1(dir, num) {
  createDir(dir)
    .then((result) => console.log(result))
    .then(
      createFile(dir + "/file " + num + ".json", num).then((result) =>
        console.log(result)
      )
    )
    .catch((error) => console.error(error));
}

function createDir(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("success");
      }
    });
  });
}

function createFile(path, num) {
  if (num === 0) {
    console.log("All files created and deleted");
    return;
  }

  return new Promise((reject) => {
    fs.writeFile(path, "", (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("file " + num + " created");
        deletion(path, num);
      }
    });
  });
}

function deletion(path, num) {
  return new Promise((reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("file " + num + " deleted");
        num--;
        createFile(path, num);
      }
    });
  });
}

module.exports = problem1;
