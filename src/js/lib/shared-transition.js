import EventEmitter from 'events';


class SharedTransition extends EventEmitter{
    constructor (options){
        super()

        this.DOM = {
            from: options.from,
            to : options.to
        }

        this.isAnimating = false;
        this.isExpanded = false;
        this._init();
    }

    _init(){

    }
    play(){
        if(this.isAnimating){
            return;
        }
        this.isAnimating = true;
        this.emit('beforePlayStart');
        const fromRect = this.DOM.from.getBoundingClientRect();
        const toRect = this.DOM.to.getBoundingClientRect()

        this._points = {
            from : {
                scale : fromRect.width / toRect.width,
                x : (fromRect.width / 2) - (toRect.width / 2) + fromRect.left,
                y : fromRect.top
            },
            to : {
                scale : 1,
                x:toRect.left,
                y:toRect.top
            }
        }

        // const scale = fromRect.width / toRect.width;
        console.log(this.DOM.to)

        const fromPoint = this._points.from;
        const fromTo = this._points.to;

        this.DOM.to.style.cssText = `
            position:absoulte;
            left:0;
            top:0;
            opacity: 1;
            transition:none;
            transform:translate(${fromPoint.x}px, ${fromPoint.y}px) scale(${fromPoint.scale})
        `
        this.DOM.to.offsetHeight

        this._animate(fromTo)
        .then(()=>{
            this.isAnimating = false;
            this.isExpanded = true;

            this.emit('afterPlayEnd')
        })
        
    }
    _animate({x, y, scale}){
        return new Promise((resolve)=>{
            const toEl = this.DOM.to;
            toEl.style.transition = '.24s';
            toEl.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            
            toEl.addEventListener('transitionend',resolve,{once : true})
        })
        
    }
}
export default SharedTransition;