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

const app = ()=>{
    navSlide();
}


app()