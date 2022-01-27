const axios = require("axios");
const { Remarkable } = require('remarkable');

getSubjectResult = () => {
    let url = "https://openlibrary.org/subjects/" + document.getElementById('search-bar').value + ".json";
  
    axios.get(url)
    .then(value => {
      let html='';
      let coverBook;
      value.data.works.map( book => {
        coverBook = checkCoverBook(book.cover_id);
        html += `
        <div class="book d-flex m-5" id="${book.key}">
        <div>
          <img src="${coverBook}">
        </div>
        <div class="book-title">  
          <p><b>Book: </b>${book.title}</p>
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
          <div class="inactive" id="${book.key}-description"></div>
          <button class="btn btn-dark read-more" id="${book.key}-read-button" type="button" onclick="getDescriptionBooks('${book.key}')">
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
    let html = '';
    axios(url)
    .then(value => {
      let elem = document.getElementById(`${value.data.key}-description`);
      let buttonReadMore = document.getElementById(`${value.data.key}-read-button`);
      switch(typeof(value.data.description)){
        case 'string':
          html=`${value.data.description}`;
          break;
        case 'object':
          html=`${value.data.description.value}`;
          break;
        case 'undefined':
          html=`Description not found`;
          break;
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
      cover = 'img/no-image.png';
    } else {
      cover = `https://covers.openlibrary.org/b/id/${cover}-M.jpg`;
    }
    return cover;
  }
  
