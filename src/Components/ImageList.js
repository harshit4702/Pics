import React , {useState} from 'react';
import './ImageList.css'
import ImageCard from './ImageCard';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const ImageList = (props) => { 
    const [open, setOpen] = useState(false);

    const [dialogImg, setDialogImg] = useState(['name']);

    const handleClose=()=>{
        setOpen(false);
    }

    const handleOpen = (image) => {
        setOpen(true);
        setDialogImg(image);
    }

    const images = props.images.map((image) => {
        return <ImageCard handleOpen={handleOpen} key={image.id} image={image} />
    });

    return (
        <div>
            <div className="image-list">{images}</div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <img
                            src={`https://live.staticflickr.com/${dialogImg.server}/${dialogImg.id}_${dialogImg.secret}.jpg`}
                            alt="" style={{width:'100%'}} 
                        />
                    </DialogContentText>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="secondary">
                        Close
                    </Button>
                </DialogActions>

                </Dialog>
        </div>
        
    );
};
export default ImageList ;