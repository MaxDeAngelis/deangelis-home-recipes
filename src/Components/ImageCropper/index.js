import React, { useEffect, useRef, useReducer } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddPhoto from '@material-ui/icons/AddAPhotoOutlined';
import ZoomIn from '@material-ui/icons/ZoomInOutlined';
import ZoomOut from '@material-ui/icons/ZoomOutOutlined';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';
import reducer from './reducer';

import { addImageToCanvas, getDataURL } from './utils';

const styles = (theme) => ({
  root: {
    position: 'relative',
    '& img': {
      width: '100%',
    },
  },
  hidden: {
    display: 'none',
  },
  upload: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  cropper: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999999,
    backgroundColor: '#4e4e4ecc',
    '&>div': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      backgroundColor: theme.palette.background.default,
      '& canvas': {
        cursor: 'move',
      },
    },
  },
  buttonBar: {
    display: 'flex',
    justifyContent: 'center',
    '&>*': {
      margin: '0 5px',
    },
  },
  close: theme.mixins.cancel,
});

function CropperModal(props) {
  const { image, state, dispatch, classes, onCropComplete } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, state.width, state.height);
    addImageToCanvas(
      context,
      state.imageData,
      state.width,
      state.height,
      state.zoom
    );
  }, [state.width, state.height, state.imageData, state.zoom]);

  function handleCrop() {
    const formData = new FormData();
    formData.append(
      'image',
      getDataURL(state.imageData, state.width, state.height, state.zoom)
    );
    formData.append('action', 'CROP_IMAGE');
    formData.append('url', image);

    fetch('/processAction.php', {
      method: 'POST',
      body: formData,
    })
      .then(
        (response) => response.json(),
        (error) => console.log('An error occurred.', error)
      )
      .then((response) => {
        onCropComplete(response.url);
        dispatch({ type: 'CLOSE' });
      });
  }

  function handleZoom(direction) {
    setTimeout(() => {
      dispatch({ type: direction, continue: handleZoom });
    }, 25);
  }

  return (
    <div
      role="button"
      onMouseDown={() => dispatch({ type: 'DRAG_START' })}
      onMouseMove={(e) =>
        dispatch({ type: 'DRAGGING', clientX: e.clientX, clientY: e.clientY })
      }
      onMouseUp={() => dispatch({ type: 'DRAG_END' })}
      className={classes.cropper}
    >
      <div style={{ width: state.width, height: state.height }}>
        <canvas ref={canvasRef} width={state.width} height={state.height} />
        <div className={classes.buttonBar}>
          <Fab
            size="small"
            component="label"
            onMouseDown={() => {
              dispatch({ type: 'ZOOM_START' });
              handleZoom('ZOOM_IN');
            }}
            onMouseUp={() => dispatch({ type: 'ZOOM_END' })}
          >
            <ZoomIn />
          </Fab>
          <Fab
            size="small"
            component="label"
            onMouseDown={() => {
              dispatch({ type: 'ZOOM_START' });
              handleZoom('ZOOM_OUT');
            }}
            onMouseUp={() => dispatch({ type: 'ZOOM_END' })}
          >
            <ZoomOut />
          </Fab>

          <Fab
            size="small"
            color="secondary"
            component="label"
            onClick={handleCrop}
          >
            <Check />
          </Fab>
          <Fab
            size="small"
            className={classes.close}
            component="label"
            onClick={() => dispatch({ type: 'CLOSE' })}
          >
            <Close />
          </Fab>
        </div>
      </div>
    </div>
  );
}

function Cropper(props) {
  const { onCropComplete, state, dispatch, image, altText, classes } = props;
  const fileId = `file-${new Date().getTime()}`;

  function handleUpload(e) {
    const formData = new FormData();
    formData.append('img', e.target.files[0]);
    formData.append('action', 'UPLOAD_IMAGE');
    e.target.value = '';

    fetch('/processAction.php', {
      method: 'POST',
      body: formData,
    })
      .then(
        (response) => response.json(),
        (error) => console.log('An error occurred.', error)
      )
      .then((response) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          dispatch({ type: 'OPEN' });
          dispatch({
            type: 'FIT_IMAGE',
            image: img,
            imageWidth: img.width,
            imageHeight: img.height,
          });
        };
        img.src = response.url;
      });
  }

  return (
    <div className={classes.root}>
      <Fab
        size="small"
        color="secondary"
        component="label"
        className={classes.upload}
        htmlFor={fileId}
      >
        <AddPhoto />
      </Fab>
      <input
        id={fileId}
        type="file"
        accept="image/*"
        className={classes.hidden}
        onChange={handleUpload}
      />
      <img src={image} alt={altText} />
      {state.open ? (
        <CropperModal
          {...{ image, state, dispatch, classes, onCropComplete }}
        />
      ) : null}
    </div>
  );
}

function ImageCropper(props) {
  const { editable, image, altText, width, height, classes, onCropComplete } =
    props;
  const [state, dispatch] = useReducer(reducer, {
    open: false,
    dragging: false,
    zooming: false,
    imageData: {},
    mouse: {
      x: null,
      y: null,
    },
    currentUrl: image,
    zoom: 1,
    width,
    height,
  });

  if (editable) {
    return (
      <Cropper
        {...{
          image,
          altText,
          classes,
          state,
          onCropComplete,
          dispatch,
        }}
      />
    );
  }

  return (
    <div className={classes.root}>
      <img src={image} alt={altText} />
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(ImageCropper);
