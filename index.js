#!/usr/bin/env node

const fs = require('fs');
const util = require('util');

// const lstat = fs.promises.lstat;
// console.dir({ lstat });

fs.readdir(process.cwd(), async (err, files) => {
  if (err) {
    throw new ReferenceError(err);
  }

  // Note: Turns out that forEach works differently on async / await functions

  // files.forEach(async (file, index) => {
  //   const fileType = await lstat(file, index);
  //   console.log({ fileType });
  // });

  for (const file of files) {
    try {
      const filetype = await lstat(file);
      console.log(filetype);
    } catch (err) {
      console.log(err);
    }
  }
});

// Method 1
const lstat = (file) => {
  return new Promise((resolve, reject) => {
    console.log({ file });
    fs.lstat(file, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve({ [file]: stats.isFile() });
      }
    });
  });
};

// Method 2
// const lstat = util.promisify(fs.lstat);
// console.log(lstat);
