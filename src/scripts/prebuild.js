const fs = require('fs');

const package = {
    name: 'piksel',
    version: '1.0.1',
    license: "GPLV3",
    description: 'An app for students.',
    homepage: 'https://github.com/cryy/piksel',
    author: 'cryy <gabrijelsota@gmail.com> (https://github.com/cryy/piksel/)',
    main: 'main.js',
    dependencies: {
      '@babel/runtime': '^7.18.0',
      'electron-better-ipc': '^2.0.1',
      'electron-store': '^8.0.1',
      glasstron: '^0.1.1',
      lodash: '^4.17.21',
      moment: '^2.29.3',
      'object-path': '^0.11.8',
      'puppeteer-core': '^14.1.0',
      'puppeteer-in-electron': '^3.0.5',
      'electron-updater': '^5.0.1'
    },
    devDependencies: {}
  }

console.log(JSON.stringify(package));

console.log("Writing package.json...");
if (!fs.existsSync("./dist")) {
    fs.mkdirSync("./dist");
}
fs.writeFileSync("./dist/package.json", JSON.stringify(package));
console.log("Done!")