import View from './view';
import Html from '../../views/home.html';
// const template = `
//     <h2>home</h2>
//     <p>is home</p>
//     <a href="/tv">드라마로 이동</a>
// `;
// console.log(template);
class Home extends View {
    constructor (){
        super({
            innerHTML : Html,
            className : 'home'
        })
        // console.log(this.$element);

        // //접근방식
        // this.$element.querySelector('h2');
        // this.$element.querySelector('p');
    }

    created() {
        console.log('created')
    }

    mounted() {
        console.log('mounted')
    }

    destroyed() {
        console.log('destroyed')   
    }
}

export default Home;