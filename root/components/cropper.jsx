import React from 'react';
import ReactDOM from 'react-dom';

require("../style/components/cropper.scss");

var Cropper = React.createClass({
    getInitialState: function() {
        return {
            dragging: false,
            zoomHeld: false,
            zoomTimer: null,
            zoomingInterval: null,
            zoomDirection: null,
            image: {},
            mouse: {
              x: null,
              y: null
            },
            preview: null,
            currentUrl: null,
            zoom: 1
        };
    },
    componentDidUpdate: function() {
        var context = ReactDOM.findDOMNode(this).querySelector(".canvas").getContext("2d");
        context.clearRect(0, 0, this.props.width, this.props.height);
        this.addImageToCanvas(context, this.state.image);
    },
    isDataURL: function(s) {
        return !!s.match(/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i);
    },
    fitImageToCanvas: function(width, height) {
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
    
        return { width: scaledWidth, height: scaledHeight };
    },
    prepareImage: function(imageUri) {
        var me = this;
        var img = new Image();
        if (!this.isDataURL(imageUri)) img.crossOrigin = 'anonymous';
        img.onload = function() {
          var scaledImage = me.fitImageToCanvas(img.width, img.height);
          scaledImage.resource = img;
          scaledImage.x = 0;
          scaledImage.y = 0;
          me.setState({dragging: false, image: scaledImage, preview: me.toDataURL()});
        };
        img.src = imageUri;
    },
    preventSelection: function(e) {
        if (this.state.dragging) {
          e.preventDefault();
          return false;
        }
    },
    boundedCoords: function(x, y, dx, dy) {
        var newX = x - dx;
        var newY = y - dy;
    
        var scaledWidth = this.state.image.width * this.state.zoom;
        var dw = (scaledWidth - this.state.image.width) / 2;
        var imageLeftEdge = this.state.image.x - dw;
        var imageRightEdge = (imageLeftEdge + scaledWidth);
    
        var rightEdge = this.props.width;
        var leftEdge = 0;
    
        if (newX - dw > 0) { x = dw; }
        else if (newX < (-scaledWidth + rightEdge)) { x = rightEdge - scaledWidth; }
        else {
          x = newX;
        }
    
        var scaledHeight = this.state.image.height * this.state.zoom;
        var dh = (scaledHeight - this.state.image.height) / 2;
        var imageTopEdge = this.state.image.y - dh;
        var imageBottomEdge = imageTopEdge + scaledHeight;
    
        var bottomEdge = this.props.height;
        var topEdge = 0;
        if (newY - dh > 0) { y = dh; }
        else if (newY < (-scaledHeight + bottomEdge)) { y = bottomEdge - scaledHeight; }
        else {
          y = newY;
        }
    
        return { x: x, y: y };
    },
    addImageToCanvas: function(context, image) {
        if (!image.resource) return;
        context.save();
        context.globalCompositeOperation = "destination-over";
        var scaledWidth = this.state.image.width * this.state.zoom;
        var scaledHeight = this.state.image.height * this.state.zoom;
    
        var x = image.x - (scaledWidth - this.state.image.width) / 2;
        var y = image.y - (scaledHeight - this.state.image.height) / 2;
    
        // need to make sure we aren't going out of bounds here...
        x = Math.min(x, 0);
        y = Math.min(y, 0);
        y = scaledHeight + y >= this.props.height ? y : (y + (this.props.height - (scaledHeight + y)));
        x = scaledWidth + x >= this.props.width ? x : (x + (this.props.width - (scaledWidth + x)));
    
        context.drawImage(image.resource, x, y, image.width * this.state.zoom, image.height * this.state.zoom);
        context.restore();
    },
    toDataURL: function() {
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
    },
    handleClose: function(e) {
        var canvas = ReactDOM.findDOMNode(this).querySelector(".canvas");
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
        canvas.removeEventListener("mousedown", this.handleMouseDown);

        ReactDOM.findDOMNode(this).classList.remove("show");
    },
    handleMouseDown: function(e) {
        this.setState({
          image: this.state.image,
          dragging: true,
          mouse: {
            x: null,
            y: null
          }
        });
    },
    handleMouseUp: function(e) {
        this.setState({ dragging: false, preview: this.toDataURL() });
    },
    handleMouseMove: function(e) {
        if (!this.state.dragging) return;
    
        var mouseX = e.clientX;
        var mouseY = e.clientY;
        var imageX = this.state.image.x;
        var imageY = this.state.image.y;
    
        var newImage = this.state.image;
    
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
    },
    handleUpload: function(e) {
        var me = this;

        var formData = new FormData();
        formData.append('img', e.target.files[0])
        formData.append('action', 'UPLOAD_IMAGE')

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            // TODO: Maybe handle other states
            // Success is 4
            if (xhr.readyState == 4) {
                var response = JSON.parse(this.responseText);
                me.prepareImage(response.url);
                me.setState({currentUrl: response.url, zoom: 1});

                var canvas = ReactDOM.findDOMNode(me).querySelector(".canvas");
                me.prepareImage(me.props.image);

                window.addEventListener("mousemove", me.handleMouseMove, false);
                window.addEventListener("mouseup", me.handleMouseUp, false);
                canvas.addEventListener("mousedown", me.handleMouseDown, false);

                ReactDOM.findDOMNode(me).classList.add("show");                
            }
        }

        xhr.open('POST', 'processAction.php', true);

        xhr.send(formData);
    },
    handleCrop: function() {
        var data = this.toDataURL();
        var me = this;
        
        var formData = new FormData();
        formData.append('image', data);
        formData.append('action', 'CROP_IMAGE')
        formData.append('url', this.state.currentUrl);

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            // TODO: Maybe handle other states
            // Success is 4
            if (xhr.readyState == 4) {
                var response = JSON.parse(this.responseText);
                me.props.onAfterCrop(response.url);
                me.handleClose();
            }
        }

        xhr.open('POST', 'processAction.php', true);
        xhr.send(formData);
    },
    handleZoomMouseDown: function(e) {
        var me = this;
        if (e.target.classList.contains("zoom-in")) {
            this.setState({zoomDirection: "in"});
        } else {
            this.setState({zoomDirection: "out"});
        }  

        var timer = setTimeout(function() {
            var interval = setInterval(me.handleZoom, 25);
            
            me.setState({zoomingInterval: interval});
        }, 500);

        this.setState({zoomTimer: timer, zoomHeld: true});
    },
    handleZoomMouseUp: function(e) {
        if (this.state.zoomTimer) {
            clearTimeout(this.state.zoomTimer)
        }

        if (this.state.zoomingInterval) {
            clearInterval(this.state.zoomingInterval);
        }
        this.setState({zoomTimer: null, zoomingInterval: null, zoomHeld: false, zoomDirection: null});
    },
    handleZoom: function(e) {
        if ((e && e.target.classList.contains("zoom-in")) || this.state.zoomDirection == "in") {
            var newZoom = this.state.zoom + 0.01;

            if (newZoom <= 3) {
                this.setState({zoom: newZoom});
            }
        } else {
            var newZoom = this.state.zoom - 0.01;

            if (newZoom >= 1) {
                this.setState({zoom: newZoom});
            }
        }  
    },
    render: function() {
        var fileId = "file-" + new Date().getTime();
        return (
            <div className="cropper">
                <div className="display">
                    {this.props.editable &&
                        <div>
                            <label htmlFor={fileId} className="ti-settings"/>
                            <input id={fileId} type="file" accept="image/*" onChange={this.handleUpload}/>
                        </div>
                    }
                    <img className="display" src={this.props.image + "?" + new Date().getTime()}/>
                </div>
                <div className="container">
                    <div className="mask"></div>
                    <div className="content">
                        <div className="toolbar">
                            <a className="ti-minus zoom-out" 
                                onClick={this.handleZoom}
                                onMouseDown={this.handleZoomMouseDown}
                                onMouseUp={this.handleZoomMouseUp}/>
                            <a className="ti-plus zoom-in" 
                                onClick={this.handleZoom}
                                onMouseDown={this.handleZoomMouseDown}
                                onMouseUp={this.handleZoomMouseUp}/>
                            <a className="ti-check" onClick={this.handleCrop}/>
                            <a className="ti-close" onClick={this.handleClose}/>
                        </div>
                        <canvas
                            className="canvas"
                            width={this.props.width}
                            height={this.props.height}>
                        </canvas>
                    </div>                    
                </div>
            </div>
        );
    }
});

Cropper.propTypes = {
    image: React.PropTypes.string.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    zoom: React.PropTypes.number,
    editable: React.PropTypes.bool,
    onAfterCrop: React.PropTypes.func
};

Cropper.defaultProps = { 
    width: 400, 
    height: 400, 
    zoom: 1, 
    editable: true,
    onAfterCrop: function(url){}
};

export default Cropper;