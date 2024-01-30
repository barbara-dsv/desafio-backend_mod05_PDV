const fs = require ('fs/promises');
const handlebars = require('handlebars');

const htmlCompiler =  async (doc,context) =>{
  const html= await fs.readFile(doc)
  const compiler = handlebars.compile(html.toString());
  const htmlString = compiler(context);
  return htmlString
}

module.exports = {
  htmlCompiler
}