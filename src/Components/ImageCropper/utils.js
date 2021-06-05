export function boundedCoords(x, y, dx, dy, imageData, zoom, xMax, yMax) {
  const newX = x - dx;
  const newY = y - dy;

  const scaledWidth = imageData.width * zoom;
  const dw = (scaledWidth - imageData.width) / 2;
  if (newX - dw > 0) {
    x = dw;
  } else if (newX < -scaledWidth + xMax) {
    x = xMax - scaledWidth;
  } else {
    x = newX;
  }

  const scaledHeight = imageData.height * zoom;
  const dh = (scaledHeight - imageData.height) / 2;
  if (newY - dh > 0) {
    y = dh;
  } else if (newY < -scaledHeight + yMax) {
    y = yMax - scaledHeight;
  } else {
    y = newY;
  }

  return { x, y };
}

export function addImageToCanvas(context, imageData, width, height, zoom) {
  if (!imageData.resource) return;

  context.save();
  context.globalCompositeOperation = 'destination-over';
  const scaledWidth = imageData.width * zoom;
  const scaledHeight = imageData.height * zoom;

  let x = imageData.x - (scaledWidth - imageData.width) / 2;
  let y = imageData.y - (scaledHeight - imageData.height) / 2;

  // Keep within the bounds
  x = Math.min(x, 0);
  y = Math.min(y, 0);
  y = scaledHeight + y >= height ? y : y + (height - (scaledHeight + y));
  x = scaledWidth + x >= width ? x : x + (width - (scaledWidth + x));

  context.drawImage(
    imageData.resource,
    x,
    y,
    imageData.width * zoom,
    imageData.height * zoom
  );
  context.restore();
}

export function getDataURL(imageData, width, height, zoom) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  addImageToCanvas(
    context,
    {
      resource: imageData.resource,
      x: imageData.x,
      y: imageData.y,
      height: imageData.height,
      width: imageData.width,
    },
    width,
    height,
    zoom
  );

  return canvas.toDataURL();
}
