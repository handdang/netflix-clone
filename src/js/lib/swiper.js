import { reject } from "q";
import { EventEmitter } from "events";

class Swiper extends EventEmitter{
    constructor(elem,options){
        super()
        this.DOM = {elem : elem};
        this.DOM.navigation = options.navigation || {};
        
        this.DOM.slides = Array.from(this.DOM.elem.children);
        this.currentIndex = 0;
        this.isAnimating = false;

        this.started = false;


        //하나의 크기
        this.slideWidth = 0;

        this.slideGroupCount = this._calcSlideGroup();
        this.slideGroupTotal = Math.ceil(this.DOM.slides.length / this.slideGroupCount);
        this._init()
    }

    _init(){
        this._initEvents();
    }
    get slideWidth(){
        return !this.started ? 0 : 100 / this.slideGroupCount;
    }

    set slideWidth(value){
        return value;
    }
    _initEvents(){
        this.DOM.navigation.prevEl.addEventListener('click', this.prev.bind(this));
        this.DOM.navigation.nextEl.addEventListener('click', this.next.bind(this));

        window.addEventListener('resize',this._onResize.bind(this))
    }

    _navigate(direction){
        if(this.isAnimating){
            return;
        }
        this.isAnimating = true;

        let translateX = 0;
        if(direction === 'next'){
            this.currentIndex = this.currentIndex < this.slideGroupTotal - 1 ? ++this.currentIndex : 0;
            translateX = this.slideWidth + (!this.started ? 100 : 200);

        }else{
            this.currentIndex = this.currentIndex > 0 ? --this.currentIndex : this.slideGroupTotal -1;
            translateX = this.slideWidth;
        }
        
        this._animation(translateX)
        .then(()=>{
            this._setInfiniteSwipe(!this.started ? '' : direction);
            this.emit('update',this.currentIndex);
            this.isAnimating = false;
        })
        
    }
    
    _animation(translateX){
        return new Promise((resolve, reject) => {
            const elem = this.DOM.elem;
            elem.style.transition = '.50s';
            elem.style.transform = `translateX(-${translateX}%)`;

            elem.addEventListener('transitionend',resolve, {once : true})
        })
    }
    _calcSlideGroup(){
        const totalWidth = this.DOM.elem.clientWidth;
        const slideWidth = this.DOM.slides[0].clientWidth;

        return Math.round(totalWidth / slideWidth);
    }

    _setInfiniteSwipe(direction){
        const {elem, slides} = this.DOM;
        if(!direction){
            const slide = slides[slides.length -1]
            elem.prepend(slide);
            this.started = true;
            this.emit('started');
        }else{
            if(direction === 'next'){
                const slides = this._getFirstGroupSlides()
                elem.append(...slides);
            }else{
                const slides = this._getLastGroupSlides()
                elem.prepend(...slides);
            }
        }

        const translateX = 100 + this.slideWidth;
        elem.style.transition = '';
        elem.style.transform = `translateX(-${translateX}%)`;

        this.DOM.slides = Array.from(this.DOM.elem.children);
    }

    _getFirstGroupSlides(){
        const slides = this.DOM.slides
        return slides.filter((slide, index) => index < this.slideGroupCount)
    }
    _getLastGroupSlides(){
        const slides = this.DOM.slides.reverse();
        return slides.filter((slide, index) => index < this.slideGroupCount)
    }

    next(){
        console.log('next')
        this._navigate('next');
    }

    prev(){
        this._navigate('prev');
    }

    _onResize(){
        this._calcSlideGroup()
    }
}

export default Swiper;