import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddPhoto from '@material-ui/icons/AddAPhotoOutlined'
import ZoomIn from '@material-ui/icons/ZoomInOutlined'
import ZoomOut from '@material-ui/icons/ZoomOutOutlined'
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check'

const styles = theme => ({
    root: {
        position: 'relative',
        '& img': {
            width: '100%'
        }
    },
    hidden: {
        display: 'none'
    },
    upload: {
        position: 'absolute',
        right: 5,
        top: 5
    },
    cropper: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999999,
        backgroundColor: '#4e4e4ecc',
        '&>div' :{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto',
            backgroundColor: theme.palette.background.default,
            '& canvas': {
                cursor: 'move'
            }
        }
    },
    buttonBar: {
        display: 'flex',
        justifyContent: 'center',
        '&>*': {
            margin: '0 5px',
        },
    },
    close: theme.mixins.cancel
});

class ImageCropper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cropperOpen: false,
            dragging: false,
            zooming: false,
            image: {},
            mouse: {
                x: null,
                y: null
            },
            currentUrl: this.props.image,
            zoom: 1
        }

        this.canvas = React.createRef();

        // Helpers
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.fitImageToCanvas = this.fitImageToCanvas.bind(this);
        this.boundedCoords = this.boundedCoords.bind(this);
        this.addImageToCanvas = this.addImageToCanvas.bind(this);
        this.getDataURL = this.getDataURL.bind(this);

        // Generic actions
        this.handleCrop = this.handleCrop.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        // Drag/Drop movement
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);

        // Zoom handlers
        this.handleZoom = this.handleZoom.bind(this);
        this.handleZoomCancel = this.handleZoomCancel.bind(this);
    }
    componentDidUpdate() {
        if (this.state.cropperOpen) {
            var context = this.canvas.current.getContext("2d");
            context.clearRect(0, 0, this.props.width, this.props.height);
            this.addImageToCanvas(context, this.state.image);
        }
    }
    fitImageToCanvas(width, height) {
        var scaledHeight, scaledWidth;
    
        var canvasAspectRatio = this.props.height / this.props.width;
        var imageAspectRatio = height / width;
    
        if (canvasAspectRatio > imageAspectRatio) {
          scaledHeight = this.props.height;
          let scaleRatio = scaledHeight / height;
          scaledWidth = width * scaleRatio;
        } else {
          scaledWidth = this.props.width;
          let scaleRatio = scaledWidth / width;
          scaledHeight = height * scaleRatio;
        }
    
        return { 
            width: scaledWidth, 
            height: scaledHeight 
        };
    }

    boundedCoords(x, y, dx, dy) {
        var newX = x - dx;
        var newY = y - dy;
    
        var scaledWidth = this.state.image.width * this.state.zoom;
        var dw = (scaledWidth - this.state.image.width) / 2;
    
        var rightEdge = this.props.width;
    
        if (newX - dw > 0) { 
            x = dw; 
        } else if (newX < (-scaledWidth + rightEdge)) { 
            x = rightEdge - scaledWidth; 
        } else {
            x = newX;
        }
    
        var scaledHeight = this.state.image.height * this.state.zoom;
        var dh = (scaledHeight - this.state.image.height) / 2;
    
        var bottomEdge = this.props.height;
        if (newY - dh > 0) { 
            y = dh; 
        } else if (newY < (-scaledHeight + bottomEdge)) { 
            y = bottomEdge - scaledHeight; 
        } else {
            y = newY;
        }
    
        return { x: x, y: y };
    }
    addImageToCanvas(context, image) {
        if (!image.resource) return;
        context.save();
        context.globalCompositeOperation = "destination-over";
        var scaledWidth = this.state.image.width * this.state.zoom;
        var scaledHeight = this.state.image.height * this.state.zoom;
    
        var x = image.x - (scaledWidth - this.state.image.width) / 2;
        var y = image.y - (scaledHeight - this.state.image.height) / 2;
    
        // Keep within the bounds
        x = Math.min(x, 0);
        y = Math.min(y, 0);
        y = scaledHeight + y >= this.props.height ? y : (y + (this.props.height - (scaledHeight + y)));
        x = scaledWidth + x >= this.props.width ? x : (x + (this.props.width - (scaledWidth + x)));
    
        context.drawImage(image.resource, x, y, image.width * this.state.zoom, image.height * this.state.zoom);
        context.restore();
    }
    getDataURL() {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
    
        canvas.width = this.props.width;
        canvas.height = this.props.height;
    
        this.addImageToCanvas(context, {
            resource: this.state.image.resource,
            x: this.state.image.x,
            y: this.state.image.y,
            height: this.state.image.height,
            width: this.state.image.width
        });
    
        return canvas.toDataURL();
    }
    handleClose(e) {
        this.setState({
            cropperOpen: false,
            zoom: 1,
            dragging: false, 
            image: {}
        })
    }
    handleMouseDown(e) {
        this.setState({
            dragging: true,
            mouse: {
                x: null,
                y: null
            }
        });
    }
    handleMouseUp(e) {
        this.setState({ 
            dragging: false
        });
    }
    handleMouseMove(e) {
        if (!this.state.dragging) return;
    
        var mouseX = e.clientX;
        var mouseY = e.clientY;
        var imageX = this.state.image.x;
        var imageY = this.state.image.y;
    
        var newImage = this.state.image;
    
        // If not the first move
        if (this.state.mouse.x && this.state.mouse.y) {
            var dx = this.state.mouse.x - mouseX;
            var dy = this.state.mouse.y - mouseY;
        
            var bounded = this.boundedCoords(imageX, imageY, dx, dy);
        
            newImage.x = bounded.x;
            newImage.y = bounded.y;
        }
    
        this.setState({
            image: this.state.image,
            mouse: {
                x: mouseX,
                y: mouseY
            }
        });
    }
    handleUpload(e) {
        var formData = new FormData();
        formData.append('img', e.target.files[0])
        formData.append('action', 'UPLOAD_IMAGE')

        e.target.value = "";

        fetch('/api/processAction.php', {
            method: 'POST',
            body: formData,
        }).then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        ).then((response) => {
            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                var scaledImage = this.fitImageToCanvas(img.width, img.height);
                scaledImage.resource = img;
                scaledImage.x = 0;
                scaledImage.y = 0;
                this.setState({
                    cropperOpen: true,
                    currentUrl: response.url, 
                    zoom: 1,
                    dragging: false, 
                    image: scaledImage
                });
            };
            img.src = response.url;      
        });
    }
    handleCrop() {
        var formData = new FormData();
        formData.append('image', this.getDataURL());
        formData.append('action', 'CROP_IMAGE')
        formData.append('url', this.state.currentUrl);

        fetch('/api/processAction.php', {
            method: 'POST',
            body: formData,
        }).then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        ).then((response) => {
            this.props.onCropComplete(response.url);
            this.setState({
                cropperOpen: false,
                zoom: 1,
                dragging: false, 
                image: {}, 
                currentUrl: response.url, 
            })    
        });
    }
    handleZoom(direction) {
        let newZoom = this.state.zoom;
        if (direction === "IN") {
            newZoom += 0.01;
        } else if(direction === "OUT") {
            newZoom -= 0.01;
        }

        if (newZoom >= 1 && newZoom <= 3) {
            this.setState({
                zoom: newZoom,
                zooming: true
            });

            setTimeout(() => {
                if (this.state.zooming) this.handleZoom(direction)
            }, 25)
        }
    }
    handleZoomCancel() {
        this.setState({
            zooming: false
        });
    }
    render() {
        const { classes } = this.props;
        let image = <img src={this.state.currentUrl} alt={this.props.altText}/>;

        if (this.props.editable) {
            let cropper;
            var fileId = "file-" + new Date().getTime();

            if (this.state.cropperOpen) {
                cropper = (<div 
                        onMouseDown={this.handleMouseDown}
                        onMouseMove={this.handleMouseMove}
                        onMouseUp={this.handleMouseUp}
                        className={classes.cropper}
                    >
                    <div style={{width:this.props.width, height:this.props.height}}>
                        <canvas
                                ref={this.canvas}
                                width={this.props.width}
                                height={this.props.height}>
                            
                        </canvas>
                        <div className={classes.buttonBar}>
                                <Fab size="small" component="label" onMouseDown={() => this.handleZoom("IN")} onMouseUp={this.handleZoomCancel}><ZoomIn/></Fab>
                                <Fab size="small" component="label" onMouseDown={() => this.handleZoom("OUT")} onMouseUp={this.handleZoomCancel}><ZoomOut/></Fab>
                                <Fab size="small" color="secondary" component="label" onClick={this.handleCrop} ><Check/></Fab>
                                <Fab size="small" className={classes.close} component="label" onClick={this.handleClose}><Close/></Fab>
                        </div>
                    </div>
                </div>)
            }

            return (
                <div className={classes.root}>
                    <Fab size="small" color="secondary" component="label" className={classes.upload} htmlFor={fileId}><AddPhoto/></Fab>
                    <input id={fileId} type="file" accept="image/*" className={classes.hidden} onChange={this.handleUpload}/>
                    {image}
                    {cropper}
                </div>
            )
        } else {
            return <div className={classes.root}>{image}</div>;
        }
    }
}

export default withStyles(styles, { withTheme: true })(ImageCropper);