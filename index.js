#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, files) => {
  if (err) {
    throw new ReferenceError(err);
  }

  const statPromises = files.map((file) => lstat(path.join(targetDir, file)));
  const stats = await Promise.all(statPromises);

  stats.forEach((stat, index) => {
    if (stat.isFile()) {
      console.log(chalk.green(files[index]));
    } else {
      console.log(chalk.yellow(files[index]));
    }
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
