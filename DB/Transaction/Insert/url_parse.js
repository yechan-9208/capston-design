const { parseBooleans } = require('xml2js/lib/processors');

const parseString = require('xml2js').parseString;

exports.xml2js = async (url) => {

  return new Promise((resolve, reject) => {
  parseString(url, (err, result) => {
    if(result==undefined)
      resolve(null);
    resolve(result.a.$.href);
  })
  })
}


