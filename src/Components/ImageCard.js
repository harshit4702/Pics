import React from 'react' ;
class ImageCard extends React.Component {
    constructor(props){
        super(props) ;
        
        this.state = { spans : 0 } ;

        this.imageRef = React.createRef() ;
    }
    componentDidMount(){
        this.imageRef.current.addEventListener('load' , this.setSpans);
    }

    setSpans = ()=> {
        let height ;
        if(this.imageRef.current)
            height = this.imageRef.current.clientHeight ;
        if(!height){
            const spans = Math.ceil(80 / 10 + 1) ;
            this.setState({spans});
            return;            
        }
        const spans = Math.ceil(height / 10 + 1) ;
        this.setState({spans})
    }

    localHandleOpen = (img) => {
        this.props.handleOpen(img);
    }

    render(){
    const { server, id , secret ,title} = this.props.image ;
        return (
            <div style={{gridRowEnd: `span ${this.state.spans}`}} onClick={()=>{this.localHandleOpen(this.props.image)}}>
                <img
                    style={{cursor: 'pointer'}}
                    ref={this.imageRef}
                    alt={title} 
                    src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
                />
            </div>
        );
    }
}

export default ImageCard ;