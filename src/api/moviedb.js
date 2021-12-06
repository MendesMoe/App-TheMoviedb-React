import axios from 'axios';

const API_KEY = "2ee2c5b569240ea2a2a879dd9c8a822c";
//Fonctions ajax contenants les requêtes ajax vers l'api movieDB
//récupérations de films suivant un mot clef
export function SearchMoviesWithKeyWord(keyWord) {
   return  axios.get('https://api.themoviedb.org/3/search/movie?api_key='+API_KEY+'&query='+keyWord)
            .then((res)=>{
                console.log(res);
                return res.data
            })
}

// récupération d'un film en fonction de son id
export const onLoadGetMovie = (id)=> {
    return axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+API_KEY)
        .then((res)=>{
            console.log(res);
           return res.data;
        })
}

// récupération d'une company en fonction de son id
export function getCompanyDetails(id) {
    return axios.get('https://api.themoviedb.org/3/company/'+id+'?api_key='+API_KEY)
        .then((res)=>{
            console.log(res);
           return res.data;
        })
}