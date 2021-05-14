import View from './view';

const template = `
    <h2>movie</h2>
    <p>is movie</p>
`;

class Movie extends View {
    constructor (){
        super({
            innerHTML : template,
            className : 'movie'
        })
        // console.log(this.$element);

        // //접근방식
        // this.$element.querySelector('h2');
        // this.$element.querySelector('p');
    }
}

export default Movie;