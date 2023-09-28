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
    // }catch(error){
    //     console.error('error');
    // }
}

const app = ()=>{
    navSlide();
    getTrending();
}


app()