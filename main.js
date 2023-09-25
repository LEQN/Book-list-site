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
    document.getElementById('trending-output').innerHTML="";
    // try{
        fetch("http://openlibrary.org/trending/daily.json")
        .then(response => response.json())
        .then(data =>{
            for(var i = 0; i< 10; i++){
                document.getElementById("trending-output").innerHTML+="<h3>"+data.works[i].title+"</h3>"+data.works[i].author_name[0]+
                "<br><img src='http://covers.openlibrary.org/b/olid/"+data.works[i].cover_edition_key+"-M.jpg'><br>";
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