import '../style/main.scss';
import Router from './router/router';
import Routes from './router/Routes';


const DOM = {
    container : document.getElementById('container'),
    // navLinks : document.querySelectorAll('.nav-links > a')
}

let router = null;

function init(){
    initRouter();
    initEvents();
}
function initRouter(){
    router = new Router({
        initialRoute : '/',
        entry : DOM.container,
        routes : Routes,
    })
    // router.go();
    // router.back();

}

function initEvents(){
    // Array.from(DOM.navLinks).forEach(link =>  link.addEventListener('click',onNavLink));
    document.addEventListener('click', onRouterLinks)
}
function onRouterLinks(event){
    
    const target = event.target;
    const tagName = target.tagName.toUpperCase();
    if(tagName === 'A'){
        event.preventDefault();

        const path = target.getAttribute('href');
        router.go(path)    
    }
}

function onNavLink(event){
    event.preventDefault(); //새로고침 안되게 기본이벤트 제거
    // console.log(event.target.getAttribute('href'));
    const path = event.target.getAttribute('href');
    router.go(path)
}
init();