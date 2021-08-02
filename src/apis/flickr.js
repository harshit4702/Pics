import axios from 'axios';

export default axios.create({
    baseURL: 'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=db464fe98e38b57a28ca0ed6a4244c96&',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*"
      }
});