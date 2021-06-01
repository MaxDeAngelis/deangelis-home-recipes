import produce from 'immer';

import { boundedCoords } from './utils';

export default produce((draft = {}, action) => {
  switch (action.type) {
    case 'OPEN': {
      draft.open = true;
      break;
    }
    case 'CLOSE': {
      draft.open = false;
      draft.zoom = 1;
      draft.dragging = false;
      draft.imageData = {};
      break;
    }
    case 'ZOOM_START': {
      draft.zooming = true;
      break;
    }
    case 'ZOOM_IN': {
      if (draft.zoom + 0.01 <= 3) {
        draft.zoom += 0.01;
        if (draft.zooming) action.continue(action.type);
      }
      break;
    }
    case 'ZOOM_OUT': {
      if (draft.zoom - 0.01 >= 1) {
        draft.zoom -= 0.01;
        if (draft.zooming) action.continue(action.type);
      }
      break;
    }
    case 'ZOOM_END': {
      draft.zooming = false;
      break;
    }
    case 'FIT_IMAGE': {
      let scaledHeight;
      let scaledWidth;

      const canvasAspectRatio = draft.height / draft.width;
      const imageAspectRatio = action.imageHeight / action.imageWidth;

      if (canvasAspectRatio > imageAspectRatio) {
        scaledHeight = draft.height;
        const scaleRatio = scaledHeight / action.imageHeight;
        scaledWidth = action.imageWidth * scaleRatio;
      } else {
        scaledWidth = draft.width;
        const scaleRatio = scaledWidth / action.imageWidth;
        scaledHeight = action.imageHeight * scaleRatio;
      }

      draft.imageData = {
        resource: action.image,
        width: scaledWidth,
        height: scaledHeight,
        x: 0,
        y: 0,
      };

      break;
    }
    case 'DRAG_START': {
      draft.dragging = true;
      draft.mouse = {
        x: null,
        y: null,
      };
      break;
    }
    case 'DRAGGING': {
      if (!draft.dragging) break;

      const mouseX = action.clientX;
      const mouseY = action.clientY;
      const imageX = draft.imageData.x;
      const imageY = draft.imageData.y;

      const newImageData = draft.imageData;

      // If not the first move
      if (draft.mouse.x && draft.mouse.y) {
        const dx = draft.mouse.x - mouseX;
        const dy = draft.mouse.y - mouseY;

        const bounded = boundedCoords(
          imageX,
          imageY,
          dx,
          dy,
          draft.imageData,
          draft.zoom,
          draft.width,
          draft.height
        );

        newImageData.x = bounded.x;
        newImageData.y = bounded.y;
      }

      draft.imageData = newImageData;
      draft.mouse = { x: mouseX, y: mouseY };
      break;
    }
    case 'DRAG_END': {
      draft.dragging = false;
      break;
    }
    default: {
      return draft;
    }
  }
  return draft;
}, {});
