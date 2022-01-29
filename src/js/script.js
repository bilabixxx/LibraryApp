const axios = require("axios");
const _ = require('lodash');
import  {showResult, showResultNotFound, showDescription} from './view';

let getSubjectResult = () => {
    document.getElementById('result').innerHTML = '';
    let url = "https://openlibrary.org/subjects/" + document.getElementById('search-bar').value + ".json";
    axios.get(url)
    .then(value => {
      let bookCount = _.get(value, 'data.work_count', 0);
      if(bookCount!=0){
      value.data.works.map( book =>  {
        let coverId = _.get(book, 'cover_id', 'no-cover');
        let bookKey = _.get(book, 'key', 'no-book-key');
        let titleBook = _.get(book, 'title', 'Title unknown')
        let authorsBook = _.get(book, 'authors', 'Author unknown');
        showResult(bookKey, titleBook, authorsBook, coverId);
        getDescriptionBooks(bookKey);
      })
    } else {
      showResultNotFound();
    }
    })
    .catch((error) => { console.log(error) });
  }  
  
 let getDescriptionBooks = (id) => {
    let url = `https://openlibrary.org${id}.json`;
    axios(url)
    .then(value => {
      let html = _.get(value.data, 'description', 'Description not found');
      let keyId = _.get(value.data, 'key', 'no');
      showDescription(keyId, html);
    })
    .catch((error) => { console.log(error) });
  }
  
  
  
  document.getElementById('search-btn').addEventListener('click', () => getSubjectResult());
