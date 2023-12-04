/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require("fs");

function problem2() {
  reading("./lipsum.txt")
    .then((result) => {
      result = result.toUpperCase();
      writing("./upper.txt", result);
    })
    .then(() => {
      console.log("upper created");
      appending("./filenames.txt", "./upper.txt");
    })
    .then(() => {
      console.log("upper appended");
      return reading("./upper.txt");
    })
    .then((data) => {
      data = data.toLowerCase().replaceAll(".", ".\n");
      writing("./sentence.txt", data);
    })
    .then(() => {
      console.log("sentence created");
      appending("./filenames.txt", "\n./sentence.txt");
    })
    .then(() => {
      console.log("sentences appended");
      return reading("./sentence.txt");
    })
    .then((data) => {
      data = data.split(".").sort().join().trim();
      writing("./sorted.txt", data);
    })
    .then(() => {
      console.log("sorted created");
      appending("./filenames.txt", "\n./sorted.txt");
    })
    .then(() => {
      console.log("sorted appended");
      return reading("./filenames.txt");
    })
    .then((data) => {
      data.split("\n").forEach((file) => {
        deleting(file)
          .then(() => {
            console.log(file + " deleted");
          })
          .catch((error) => console.error(error));
      });
    })
    .catch((error) => console.error(error));
}

function reading(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function writing(file, data) {
  return new Promise((reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject(err);
      }
    });
  });
}

function appending(oldfile, newfile) {
  return new Promise((resolve, reject) => {
    fs.appendFile(oldfile, newfile, (err) => {
      if (err) {
        reject(error);
      }
    });
  });
}

function deleting(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(file);
      }
    });
  });
}

module.exports = problem2;
