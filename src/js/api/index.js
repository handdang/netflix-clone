export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
export const BASE_URL = 'https://api.themoviedb.org/3'
export const API_KEY = '414ac1c796f172eb60eef17ee4a37c73'

const _fetch = (path) => {
    return window.fetch(`${BASE_URL + path}?api_key=${API_KEY}`)
        .then(res => res.json())   
}

export const tmdb = {
    IMAGE_BASE_URL,

    getMovePopular() {
        return _fetch('/movie/popular')
    }
}