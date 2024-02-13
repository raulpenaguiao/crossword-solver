const buttonSearcherHTML = document.querySelector("#buttonSearcher");
const inputBoxLenHTML = document.querySelector("#inputBoxLen");
const inputBoxStrHTML = document.querySelector("#inputBoxStr");
const wordListHTML = document.querySelector("#wordList");
const regexAlphabetic = /^[a-zA-Z]+$/;
const apiUrlWords = "https://raw.githubusercontent.com/jesstess/Scrabble/master/scrabble/sowpods.txt";
let words = [];
let wordByLen = [];
let num = 0;
let maxlen = 0;


//populate the array with all the words in sowpods
fetch(apiUrlWords)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    (data.split("\n")).forEach(element => {
        words.push(element);
        num += 1;
        l = element.length;
        if(l > maxlen)
            maxlen = l;
    });
    console.log("No issues, there are ", num,  " words with maximal size ", maxlen);
    for(let i = 0; i <= maxlen; i++)
        wordByLen.push([])
    console.log(wordByLen)
    words.forEach(element => {
        wordByLen[element.length].push(element)
    });
    wordByLen.forEach(element => {
        console.log(element.length)
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });


//The variables wordbylen is now populated.


function matchString(st1, st2, l)
{
    for(let i = 0; i < l; i++)
    {
        if(regexAlphabetic.test(st2[i]) && !(st1[i] == st2[i]))
            return false;
    }
    return true;
}

function populateWordList(){
    //Puts in the p element all the words that fit a search query
    wordListHTML.innerHTML = "<ul>";
    query = inputBoxStrHTML.value.toUpperCase();
    len = inputBoxLenHTML.value;
    if(query == "" || len == "")
    {
        if(query == "")
        {
            inputBoxStrHTML.classList.add("error-text-input")
        }
        else
        {
            inputBoxStrHTML.classList.remove("error-text-input")
        }
        if(len == "")
        {
            inputBoxLenHTML.classList.add("error-text-input")
        }
        else
        {
            inputBoxLenHTML.classList.remove("error-text-input")
        }
    }
    else
    {
        console.log(query, len);
        let counter = 0;
        inputBoxLenHTML.classList.remove("error-text-input")
        inputBoxStrHTML.classList.remove("error-text-input")
        wordByLen[len].forEach(element => {
            if(matchString(element, query, len))
            {
                counter += 1;
                console.log(element);
                wordListHTML.innerHTML += "<li>" + element + "</li>";
                if(counter > 100)
                {
                    wordListHTML.innerHTML += "</ul>";
                    console.log("Search done");
                    return;
                }
            }
            wordListHTML.innerHTML += "</ul>";
        });
    }
}

buttonSearcherHTML.addEventListener('click', populateWordList)




