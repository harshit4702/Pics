import  React from 'react' ;
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

class SearchBar extends React.Component {

    state = { term : '' } ;
    onFormSubmit=(event)=> {
        event.preventDefault();
        if(!this.state.term){
            return ;
        }
        this.props.onSubmit(this.state.term);
    }

    onClear = (e)=> {
        if(!this.state.term){
            return ;
        }
        this.setState({term: ''});
        this.props.onClearSubmit();
    }

    render(){
        return (
            <div className="ui segment" style={{backgroundColor: '#F5F5F5'}}>
                <form onSubmit={this.onFormSubmit}>
                <div >
                    <label>Image Search</label>
                    <br/>
                    <TextField
                        variant="outlined"
                        type={'text'}
                        style={{marginTop: 5}}
                        value={this.state.term}
                        onChange={(e) => this.setState({term : e.target.value})} 
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="Search" onClick={this.onClear}>
                                        <Clear />
                                    </IconButton> 
                                    <IconButton
                                        aria-label="Search"
                                        onClick={this.onFormSubmit}
                                    >
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    />
                </div>
                </form>
            </div> 
        ); 
    }
}

export default SearchBar ;


{/* <div className="ui segment">
<form onSubmit={this.onFormSubmit} className="ui form">
    <div className="field">
        <label>Image Search</label><br/>
        {/* <input type="text" onChange={(e) => console.log(e.target.value)} /> */}
//         <input 
//             type="text" 
//             value={this.state.term}
//             onChange={(e) => this.setState({term : e.target.value})} 
//         />
//     </div>
// </form>
// </div>  */}