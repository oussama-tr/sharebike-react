const fs = require('fs')

const cleaner = function(path)
{
    fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      })
}

module.exports = cleaner;
