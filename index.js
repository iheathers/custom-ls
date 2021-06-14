#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), async (err, files) => {
  if (err) {
    throw new ReferenceError(err);
  }

  const statPromises = files.map((file) => lstat(file));
  const stats = await Promise.all(statPromises);

  stats.forEach((stat, index) => {
    console.log(files[index], stat.isFile());
  });
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
