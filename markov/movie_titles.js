//https://www.soliantconsulting.com/blog/title-generator-using-markov-chains

var testText = [
    "Hello, my name is Henry.", 
    "Howdy, I am Henry.", 
    "I am Henry", 
    "Henry, and you are?", 
    // "Jellybeans freeze in the winter, except when it is not cold.", 
    // "Jellybeans are tasty.", 
    // "The winter grows many Jellybeans.", 
    "Howdy, nice day right?"
];

var terminals = {};
var startwords = [];
var wordstats = {};

for (var i = 0; i < testText.length; i++) {
    // tokenize text from the provided strings
    var words = testText[i].replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g, ' ').split(' ');
    // console.log('words: ', words);
    // console.log('words[words.length-1]: ', words[words.length-1]);


    terminals[words[words.length-1]] = true;

    // console.log('terminals : ', terminals);
    startwords.push(words[0]);

    // console.log('startwords : ', startwords);
    for (var j = 0; j < words.length - 1; j++) {
        if (wordstats.hasOwnProperty(words[j])) {
            wordstats[words[j]].push(words[j+1]);
        } else {
            wordstats[words[j]] = [words[j+1]];
        }

        // console.log('wordstats: ', wordstats);
    }
}

var choice = function (a) {
    var i = Math.floor(a.length * Math.random());
    return a[i];
};

var make_title = function (min_length) {
    word = choice(startwords);
    var title = [word];
    while (wordstats.hasOwnProperty(word)) {
        var next_words = wordstats[word];
        word = choice(next_words);
        title.push(word);
        if (title.length > min_length && terminals.hasOwnProperty(word)) break;
    }
    if (title.length < min_length) return make_title(min_length);
    return title.join(' ');
};

 var greeting = make_title(3 + Math.floor(3 * Math.random()));

 console.log('greeting :: ', greeting);