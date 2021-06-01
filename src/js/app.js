// import '../style/main.scss';
import '../asset/style/main.scss';
import Router from './router/router';
import Routes from './router/Routes';

const DOM = {
    container : document.getElementById('container'),
    
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


    router.on('update', () => {
        console.log(11)
    })
}

function initEvents(){
    document.addEventListener('click', onRouterLinks)
}

function onRouterLinks(event){
    const target = event.target;
    let elems = document.querySelectorAll(".nav-links > ul li.active");
    ;[].forEach.call(elems, function(el) {
        el.classList.remove("active");
    });

    const tagName = target.tagName.toUpperCase();
    if(tagName === 'A'){
        target.parentNode.classList.add('active');

        event.preventDefault();

        const path = target.getAttribute('href');
        router.go(path)    
    }
}

function onNavLink(event){
    event.preventDefault(); //새로고침 안되게 기본이벤트 제거
    const path = event.target.getAttribute('href');
    router.go(path)
}
init();