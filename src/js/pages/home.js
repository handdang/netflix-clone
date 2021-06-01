import View from './view';
import Html from '../../views/home.html';
import Swiper from '../lib/swiper.js';
import {
    IMAGE_BASE_URL,
    tmdb
} from '../api'

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
        // this._getMovePopular();
        console.log('mounted')
    }

    destroyed() {
        console.log('destroyed')   
    }
}
// _getMovePopular() {
//     tmdb.getMovePopular().then((res) => {
//         this._render(res.results)
//     })
// }
// _render(results){
//     console.log(results)
// }
function getData(){
    let list = '';
    tmdb.getMovePopular()
    .then((res) => {
        if (res.results) {
            let data = res.results;
            data.forEach((element) => {
                list +=  `<li class="element">
                    <div class="thumbnail">
                        <div class="thumbnail-inner">
                            <img src="${IMAGE_BASE_URL+"w500"+element.backdrop_path}">
                        </div>
                    </div>
                </li>`
            });
            document.querySelector('.nowWatch').innerHTML = list;
        }
        setTimeout(()=>{
            const swiper = new Swiper(document.querySelector('.nowWatch') , {
                navigation : {
                    prevEl : document.querySelector('.prev'),
                    nextEl : document.querySelector('.next'),
                }
            })
            swiper.on('started',() => {
                document.querySelector('.prev').classList.add('started');
            })
            swiper.on('update',(index) => {
                console.log(swiper.currentIndex)
            })
        },1)  
    })
    
}
export default Home;