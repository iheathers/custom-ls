#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), (err, files) => {
  if (err) {
    throw new ReferenceError(err);
  }

  let statArray = Array(files.length).fill(null);

  files.forEach((file, index) => {
    fs.lstat(file, (err, stats) => {
      if (err) {
        throw new ReferenceError(err);
      }

      statArray[index] = stats;

      const ready = statArray.every((stats) => {
        return stats;
      });

      if (ready) {
        statArray.forEach((stats, index) => {
          console.log(files[index], stats.isFile());
        });
      }
    });
  });
});
