console.log('........START.........')

var propertyData = require('../test-data/propertyAPI.json');

function separateSellingPoints (dataKey, pD) {
  var keys = Object.keys(pD);
  return keys.map((key, idx, array) => {
    return pD[key].data.attributes.sellingPoints.localSellingPoints;
  })
}

function denoteDataKeys (keys) {
  return flatten(keys.map((key, idx) => {
      return separateSellingPoints(key, propertyData)
    })
  )
}

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

var sampleSentence = denoteDataKeys(['localSellingPoints'])[0];

console.log('sampleSentence : ','\n', sampleSentence, '\n')

// sampleSentence = sampleSentence.match( /[^\.,;!\?]+[\.,;!\?]+/g )

function countChar (string, delimiter) {
  if (delimiter === '|' || delimiter === '\\'){
    delimiter = '\\' + delimiter;
  } 
  
  return string.match( new RegExp(delimiter, 'g') ).length
}

function checkAllDelimiters (string) {
  var delimiters = ['.',',',';','|','!','-','/'];
  var contains = [];

  for (var i = 0; i < delimiters.length; i++){
    if (string.includes(delimiters[i]))
      contains.push({ 
        char: delimiters[i],
        count: countChar(string, delimiters[i]),
        //TODO: finish separating triples before and after the delimiter
        nextTriples: getTriples(string, delimiters[i], true),
        prevTriples: getTriples(string, delimiters[i], false)
      })
  }

  return contains
}

function getIdxOfDelimiter (string, delimiter) {
  var idxes = []
  for (var i = 0; i < string.length; i++) {
    if (string[i] === delimiter){
      idxes.push(i);
    }
  }
  return idxes
}

function add (num) {
  return function (origNum){
    return origNum + num
  }
}

function subtract (num) {
  return function (origNum){
    return origNum - num
  }
}

function getTriples (string, delimiter, forwardOrBack) {
  var triples = []
  var equation = forwardOrBack ? add : subtract

  for (var i = 0; i < string.length; i++){
    if (string[i] === delimiter){
      triples.push([
        string[i],
        string[equation(1)(i)] || '',
        string[equation(2)(i)] || ''
      ])
    }
  }
  // console.log('Trips : ', forwardOrBack ? 'forward -- ' : 'back -- ', triples)
  return triples
}

var a = Date.now()
console.log(checkAllDelimiters(sampleSentence))
var b = Date.now()

console.log('Perf: ', b-a, ' ms')
console.log('..........END..........')