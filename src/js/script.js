const axios = require("axios");
const { Remarkable } = require('remarkable');
const _ = require('lodash');
const covBook = require('../img/no-image.png')

getSubjectResult = () => {
    let url = "https://openlibrary.org/subjects/" + document.getElementById('search-bar').value + ".json";
  
    axios.get(url)
    .then(value => {
      let html='';
      value.data.works.map( book => {
        let coverId = _.get(book, 'cover_id', 'no-cover');
        let bookKey = _.get(book, 'key', 'no-book-key');
        let titleBook = _.get(book, 'title', 'Without title')
        coverBook = checkCoverBook(coverId);
        html += `
        <div class="book d-flex m-5" id="${bookKey}">
        <div>
          <img src="${coverBook}">
        </div>
        <div class="book-title">  
          <p><b>Book: </b>${titleBook}</p>
          <p><b>Authors: </b>
        `;
        for(numberAuthors in book.authors) {
          html += `${book.authors[numberAuthors].name}`;  
          if(numberAuthors != book.authors.length-1){
            html+=', ';
          }else {
            html+='.';
          }
        }
        html+= `</p>
          <div class="inactive" id="${bookKey}-description"></div>
          <button class="btn btn-dark read-more" id="${bookKey}-read-button" type="button" onclick="getDescriptionBooks('${bookKey}')">
          Read More<i class="fas fa-arrow-down ps-3"></i></button>
        </div>
        </div>`;
      })
      
      if(html == ""){
        html =  '<h2 class="text-center mt-3">No results found</h2>';
      }
  
      document.getElementById('result').innerHTML = html;
    })
    .catch((error) => { console.log(error) });
  }  
  
  getDescriptionBooks = (id) => {
    this.id = id;
    let url = `https://openlibrary.org${id}.json`;
    let md = new Remarkable();
    axios(url)
    .then(value => {
      let html = _.get(value.data, 'description', 'Description not found');
      let keyId = _.get(value.data, 'key', 'no')
      let elem = document.getElementById(`${keyId}-description`);
      let buttonReadMore = document.getElementById(`${keyId}-read-button`);
      
    
      if(typeof(html) == 'object'){
        html = _.get(value.data, 'description.value', 'Description not found');
      }
        
      if (elem.classList.contains('inactive')) {
          elem.classList.remove('inactive');
          elem.classList.add('active');
          buttonReadMore.classList.remove('inactive');
          buttonReadMore.classList.add('active');
          buttonReadMore.innerHTML = `Read Less<i class="fas fa-arrow-up ps-3"></i>`;
          html=`<p><b>Description:</b></p>` + md.render(html);
          
      } else {
          elem.classList.remove('active');
          elem.classList.add('inactive');
          buttonReadMore.classList.remove('active');
          buttonReadMore.classList.add('inactive');
          buttonReadMore.innerHTML = `Read More<i class="fas fa-arrow-down ps-3"></i>`;
          html= '';
      }
      elem.innerHTML = html;  
    })
    .catch((error) => { console.log(error) });
  }
  
  checkCoverBook = (cover) => {
    this.cover = cover;
    if(cover == null) {
      cover = covBook;
    } else {
      cover = `https://covers.openlibrary.org/b/id/${cover}-M.jpg`;
    }
    return cover;
  }
  
