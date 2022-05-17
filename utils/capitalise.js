// make a passed-thru name return with proper capitalisation
function capitaliseName(name) {

    // make an array by splitting string by spaces
    let separateWord = name.toLowerCase().split(" ");

    // iterate over each word in the array length: capitalise the first letter of each word
    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].slice(1);
    } 
    // return the properly capitalised name
    return separateWord.join(" ");
}

module.exports = capitaliseName;