#!/usr/bin/env node

const fs = require('fs');
const util = require('util');

// const lstat = fs.promises.lstat;
// console.dir({ lstat });

fs.readdir(process.cwd(), async (err, files) => {
  if (err) {
    throw new ReferenceError(err);
  }

  const statPromises = files.map((file) => lstat(file));
  const stats = await Promise.all(statPromises);

  stats.forEach((stat, index) => {
    console.log(files[index], stat.isFile());
  });

  // const statArray = Array(files.length).fill(null);

  // for (const [index, file] of files.entries()) {
  //   statArray[index] = lstat(file);
  // }

  // const awaitedArray = await Promise.all(statArray);

  // const ready = awaitedArray.every((item) => item !== null);

  // console.log(awaitedArray);

  // if (ready) {
  //   console.log('file', files[2], ' statObj ', awaitedArray[2].isFile());
  // }
  // Note: Turns out that forEach works differently on async / await functions

  // files.forEach(async (file, index) => {
  //   const fileType = await lstat(file, index);
  //   console.log({ fileType });
  // });

  // for (const file of files) {
  //   try {
  //     const filetype = await lstat(file);
  //     console.log(filetype);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
});

// Method 1
const lstat = (file) => {
  return new Promise((resolve, reject) => {
    fs.lstat(file, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
};

// Method 2
// const lstat = util.promisify(fs.lstat);
// console.log(lstat);
