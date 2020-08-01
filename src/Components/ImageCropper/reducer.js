import produce from "immer"

function boundedCoords(x, y, dx, dy, imageData, zoom, rightEdge, bottomEdge) {
    var newX = x - dx;
    var newY = y - dy;

    var scaledWidth = imageData.width * zoom;
    var dw = (scaledWidth - imageData.width) / 2;

    if (newX - dw > 0) { 
        x = dw; 
    } else if (newX < (-scaledWidth + rightEdge)) { 
        x = rightEdge - scaledWidth; 
    } else {
        x = newX;
    }

    var scaledHeight = imageData.height * zoom;
    var dh = (scaledHeight - imageData.height) / 2;

    if (newY - dh > 0) { 
        y = dh; 
    } else if (newY < (-scaledHeight + bottomEdge)) { 
        y = bottomEdge - scaledHeight; 
    } else {
        y = newY;
    }

    return { x: x, y: y };
}

export default produce((draft = {}, action) => {
    switch (action.type) {
        case 'OPEN':
            draft.open = true;
            break;
        case 'CLOSE':
            draft.open = false;
            draft.zoom = 1;
            draft.dragging = false;
            draft.imageData = {};
            break;
        case 'ZOOM_START':
            draft.zooming = true;
            break;   
        case 'ZOOM_IN':
            if (draft.zoom + 0.01 <= 3) {
                draft.zoom += 0.01;
                if (draft.zooming) action.continue(action.type);
            }
            break;    
        case 'ZOOM_OUT':
            if (draft.zoom - 0.01 >= 1) {
                draft.zoom -= 0.01;
                if (draft.zooming) action.continue(action.type);
            }
            break; 
        case 'ZOOM_END':
            draft.zooming = false;
            break; 
        case 'FIT_IMAGE':
            var scaledHeight, scaledWidth;
    
            var canvasAspectRatio = draft.height / draft.width;
            var imageAspectRatio = action.imageHeight / action.imageWidth;
        
            if (canvasAspectRatio > imageAspectRatio) {
                scaledHeight = draft.height;
                let scaleRatio = scaledHeight / action.imageHeight;
                scaledWidth = action.imageWidth * scaleRatio;
            } else {
                scaledWidth = draft.width;
                let scaleRatio = scaledWidth / action.imageWidth;
                scaledHeight = action.imageHeight * scaleRatio;
            }
        
            draft.imageData = {
                resource: action.image,
                width: scaledWidth, 
                height: scaledHeight,
                x: 0,
                y: 0
            };

            break;
        case 'DRAG_START':
            draft.dragging = true;
            draft.mouse = {
                x: null,
                y: null
            };
            break; 
        case 'DRAGGING':
            if (!draft.dragging) break;
    
            var mouseX = action.clientX;
            var mouseY = action.clientY;
            var imageX = draft.imageData.x;
            var imageY = draft.imageData.y;
        
            var newImageData = draft.imageData;
        
            // If not the first move
            if (draft.mouse.x && draft.mouse.y) {
                var dx = draft.mouse.x - mouseX;
                var dy = draft.mouse.y - mouseY;
            
                var bounded = boundedCoords(imageX, imageY, dx, dy, draft.imageData, draft.zoom, draft.width, draft.height);
                
                newImageData.x = bounded.x;
                newImageData.y = bounded.y;
            }
        
            draft.imageData = newImageData;
            draft.mouse = { x: mouseX, y: mouseY }
            break; 
        case 'DRAG_END':
            draft.dragging = false;
            break; 
        default:
            return draft;
    }
}, {});