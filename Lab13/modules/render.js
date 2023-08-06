const fs = require('fs');

class Render {
  renderHTML(req, res, filePath, data) {
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error reading file');
        return;
      }

      const renderedContent = this.replacePlaceholders(content, data);
      res.end(renderedContent);
    });
  }

  replacePlaceholders(content, data) {
    const placeholdersRegex = /\{([\w.\[\]]+)\}/g;
    const renderedContent = content.replace(placeholdersRegex, (match, key) => {
      const value = this.getValueFromData(data, key.replaceAll("{", "").replaceAll("}", ""));
      return value === undefined ? match : value;
    });

    return renderedContent;
  }

  getValueFromData(data, key) {
    const keys = key.split('.');
    let value = data;
    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        if (/\[\d+\]/.test(k)) {
          const arrayKey = k.substring(0, k.indexOf('['));
          const arrayIndex = k.match(/\d+/)[0];
          value = value[arrayKey][parseInt(arrayIndex, 10)];
        } else {
          value = value[k];
        }
      } else {
        return undefined;
      }
    }
    return value;
  }
}

module.exports = new Render();
