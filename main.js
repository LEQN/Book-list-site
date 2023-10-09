const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    //toggle nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        // animate links
        navLinks.forEach((link, index)=>{
            if(link.style.animation){
                link.style.animation = '';
            }else{
                link.style.animation = `FadeNavLink 0.5s ease forwards ${index / 7 + 0.2}s`;
            }
        });
        // burger animation
        burger.classList.toggle('b-toggle');
    });
}

function getTrending(){
    // check if the trending container exists
    const trendingBooksContainer = document.getElementById('trending-output');
    if(trendingBooksContainer){
        // clear trending output div
        document.getElementById('trending-output').innerHTML="";
        // fetch the trending books for today from openlibrary
        // try{
            fetch("http://openlibrary.org/trending/daily.json")
            .then(response => response.json())
            .then(data =>{
                // for(var i = 0; i< 10; i++){
                //     document.getElementById("trending-output").innerHTML+="<div>'<h3>"+data.works[i].title+"</h3><br>"+data.works[i].author_name[0]+
                //     "<br><img src='http://covers.openlibrary.org/b/olid/"+data.works[i].cover_edition_key+"-M.jpg'></div>";
                // }
                const trendingOutput = document.getElementById("trending-output");
                for(var i = 0; i< 20; i++){
                    // create new div element for each book and add class the to it then append it to the parent trending-output div
                    const newDiv = document.createElement("div");
                    newDiv.classList.add("Trending-output-items");
                    newDiv.innerHTML = `
                    <img src='http://covers.openlibrary.org/b/olid/${data.works[i].cover_edition_key}-M.jpg'>
                    <br><h3>${data.works[i].title}</h3>
                    <h4>${data.works[i].author_name[0]}</h4>
                    <p>First published in ${data.works[i].first_publish_year}</p>
                    `;
                    trendingOutput.appendChild(newDiv);
                }
            });
    }
    // }catch(error){
    //     console.error('error');
    // }
}

// search by titles
function titleSearch(query){
    // fetch search results
    // check if the trending container exists
    const searchContainer = document.getElementById('results-output');
    if(searchContainer){
        // clear current results displayed
        document.getElementById('results-output').innerHTML="";
        
        fetch("https://openlibrary.org/search.json?title="+query)
        .then(response => response.json())
        .then(data =>{
            document.getElementById("result-count").innerHTML=data.numFound.toLocaleString() + " results found. Displaying top 50";

            // loop through and each book result & create new div for them
            const resultsOutput = document.getElementById("results-output");
            for(var i = 0; i< 50; i++){
                const newDiv = document.createElement("div");
                newDiv.classList.add("Result-output-items");
                if(data.docs[i].author_name){
                newDiv.innerHTML = `
                <img src='http://covers.openlibrary.org/b/olid/${data.docs[i].edition_key[0]}-M.jpg'>
                <br><h3>${data.docs[i].title}</h3>
                <h4>${data.docs[i].author_name[0]}</h4>
                <p>First published in ${data.docs[i].first_publish_year}</p>
                <p>${data.docs[i].number_of_pages_median} of pages</p>
                <p>Average rating: ${data.docs[i].ratings_average}</p>
                `;
                resultsOutput.appendChild(newDiv);
                }else{
                newDiv.innerHTML = `
                <img src='http://covers.openlibrary.org/b/olid/${data.docs[i].edition_key[0]}-M.jpg'>
                <br><h3>${data.docs[i].title}</h3>
                <p>First published in ${data.docs[i].first_publish_year}</p>
                <p>${data.docs[i].number_of_pages_median} of pages</p>
                <p>Average rating: ${data.docs[i].ratings_average}</p>
                `;
                resultsOutput.appendChild(newDiv);
                }
            }
        });
    }
}

// search bar function
function performSearch(){
    // check if search form exists
    const searchingForm = document.getElementById('searchForm');
    if(searchingForm){
        document.getElementById('searchForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const searchCategory = document.getElementById('SearchCategory').value;
            const searchQuery = document.getElementById('searchInput').value;
            if(searchQuery.trim().length > 0){
            // perform search based on chosen category
            switch(searchCategory) {
                case 'title':
                    titleSearch(searchQuery);
                    break;
                case 'author':
                    // author search
                    break;
                case 'genre':
                    // genre search
                    break;
            }
        }
        });
    }
}

const app = ()=>{
    navSlide();
    getTrending();
    performSearch();
}


app()