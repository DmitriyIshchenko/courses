export interface Draggable {
  dragStartHandler(event: DragEvent): void;

  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  // signal the browser that the thing you drag something over is a valid drag target (otherwise dropping would not be possible). Basically permits the drop
  dragOverHandler(event: DragEvent): void;

  // react to the actual drop (update the data/UI)
  dropHandler(event: DragEvent): void;

  // give visual feedback to the user
  dragLeaveHandler(event: DragEvent): void;
}
