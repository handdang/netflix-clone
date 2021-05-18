import View from './view';
import Html from '../../views/home.html';

// QUES : 이거 공통으로 쓰고싶은데
const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
class Home extends View {
    constructor (){
        super({
            innerHTML : Html,
            className : 'home'
        })
    }

    created() {
        getData();
    }

    mounted() {
        console.log('mounted')
    }

    destroyed() {
        console.log('destroyed')   
    }
}

function getData(){
    let list = '';
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=414ac1c796f172eb60eef17ee4a37c73')
    .then(res => res.json())
    .then(res => {
        if (res.results) {
            let data = res.results;
            data.forEach((element) => {
                  list += `<li class="element">
                            <div class="thumbnail">
                                <div class="thumbnail-inner">
                                    <img src="${IMAGE_BASE_URL+"w500"+element.backdrop_path}">
                                </div>
                            </div>
                        </li>`
            });
            document.querySelector('.list-ui').innerHTML = list;
        }
    });
}
export default Home;