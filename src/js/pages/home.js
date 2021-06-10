import View from './view';
import Html from '../../views/home.html';
import Swiper from '../lib/swiper.js';
import SharedTransition from '../lib/shared-transition.js';
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
        console.log('mounted');
    }

    destroyed() {
        console.log('destroyed');
    }
}

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
            _setupSwipe(document.querySelector('.nowWatch'))
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
function _setupSwipe (elem) {
    return new Promise((resolve, reject) => {
      const images = Array.from(elem.querySelectorAll('img'))

      const clickFn = (event) => {
        _showPreview(event)
      }

      images.forEach(image => {
        image.addEventListener('click', clickFn)
      })

      resolve()
    })
  }

function _showPreview(event){
    const fromEl = event.target;
    const toEl = document.querySelector('.nc-preview-inner');
    console.log(toEl)

    const sharedTransition = new SharedTransition({
        from : fromEl,
        to : toEl
    })
    sharedTransition.on('beforePlayStart',()=>{
        document.querySelector('.smallImage').src = fromEl.src;
    })
    sharedTransition.on('afterPlayEnd',()=>{
        document.querySelector('.largeImage').src = fromEl.src.replace('w500','original');
    })
    sharedTransition.play();
    
}
export default Home;