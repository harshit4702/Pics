import React from 'react';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

class App extends React.Component {
    state = {
        images: [],
        url: 'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=50&',
        searchUrl:'https://www.flickr.com/services/rest/?method=flickr.photos.search&',
        apiKey:'db464fe98e38b57a28ca0ed6a4244c96',
        open: false,
        loader: true,
        mobileView: false,
        page: 1,
        newload: false,
        word: null
    };

    componentDidMount(){
        const {url ,apiKey} = this.state ;
        if(window.innerWidth<560){
            this.setState({mobileView: true})
        }

        axios.get(`${url}&api_key=${apiKey}&format=json&nojsoncallback=1`)
            .then((res)=>{
                this.setState({loader:false , images: res.data.photos.photo})
            });

        window.addEventListener('scroll', this.infiniteScroll);
    }

    infiniteScroll = () => {
        const {url ,apiKey ,searchUrl, images , page ,word} = this.state ;
        let arr = [];
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight ){
            this.setState({page: page+1 , newload: true});
            if(!word){
                axios.get(`${url}&api_key=${apiKey}&page=${page+1}&format=json&nojsoncallback=1`)
                    .then((res)=>{
                        arr = images.concat(res.data.photos.photo);
                        this.setState({images: arr , newload: false});
                    })
                    .catch((err)=>{
                        this.setState({newload:false});
                    })
            }
            else{
                axios.get(`${searchUrl}&api_key=${apiKey}&text=${word}&per_page=50&page=${page+1}&format=json&nojsoncallback=1`)
                    .then((res)=>{
                        arr = images.concat(res.data.photos.photo);
                        this.setState({images: arr , newload: false});
                    })
                    .catch((err)=>{
                        this.setState({newload:false});
                    })
            }
        }
    }

    onSearchSubmit = (term) => {
        this.setState({loader: true , page: 1 , word: term});
        const {searchUrl , apiKey} = this.state ;
        axios.get(`${searchUrl}api_key=${apiKey}&text=${term}&per_page=50&page=1&format=json&nojsoncallback=1`)
            .then((res)=>{
                this.setState({loader:false ,images: res.data.photos.photo})
            });
    }

    onClearSubmit = () => {
        this.setState({loader: true , page: 1});
        const {url , apiKey} = this.state ;
        axios.get(`${url}&api_key=${apiKey}&page=1&format=json&nojsoncallback=1`)
            .then((res)=>{
                this.setState({loader:false ,images: res.data.photos.photo})
            });
    }

    render() { 
        const {loader,mobileView , newload} = this.state ; 
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
                <SearchBar onSubmit={this.onSearchSubmit} onClearSubmit={this.onClearSubmit}/>
                {
                    loader 
                    ? 
                    <CircularProgress color={'primary'} style={{marginLeft: '50%' , marginTop: '20%'}}/>
                    :
                    (
                        mobileView 
                        ?
                        <div style={{marginLeft: '30%'}}>
                                <ImageList images={this.state.images} />
                        </div>
                        :
                        <div style={{marginLeft: '3vw'}}>
                                <ImageList images={this.state.images} />
                                {
                                    newload ? 
                                    <CircularProgress color={'primary'} style={{marginLeft: '50%' , marginTop: '20%'}}/>
                                    : 
                                    null
                                }
                        </div>

                    )
                }
            </div>
        );
    }
}

export default App ;