const fs = require("fs");

class Base {
  renderHTML = (req, res, path, { data }) => {
    fs.readFile(`./views/${path}.html`, "utf8", (err, viewContent) => {
      if (err) {
        console.error('Error reading file:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }

      const result = viewContent.match(/{.+?}/g);
      if(result)
      {
        for(const item of result)
        {
          const itemKey = item.replace(/{|}/g, "");
          let replacement = data[itemKey];

          if ((typeof replacement === "object" || Array.isArray(replacement)) && replacement !== null) 
          {
            replacement = Object.entries(replacement).map(([key, value]) => `<li>${value}</li>`).join("");
          }

          viewContent = viewContent.replace(new RegExp(item, "g"), replacement);
        }
      }

      res.end(viewContent);
    })
  };
}

module.exports = Base;
