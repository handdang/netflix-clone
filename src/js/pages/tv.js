import View from './view';

const template = `
    <h2>tv</h2>
    <p>is tv</p>
`;

class Tv extends View {
    constructor (){
        super({
            innerHTML : template,
            className : 'tv'
        })
        // console.log(this.$element);

        //접근방식
        this.$element.querySelector('h2');
        this.$element.querySelector('p');
    }
}

export default Tv;