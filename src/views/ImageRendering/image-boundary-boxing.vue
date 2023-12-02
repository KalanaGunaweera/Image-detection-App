<template>
       <div id="container">
        <h1>IMAGE BOUNDARY BOXING</h1>
        <canvas id="canvas" ref="canvas"></canvas>
    </div>
</template>
  
<script>
import { ref, watch } from 'vue';
let rectangles = [];
let ctx = null;
let canvas = null;
let isResizing = false;
let selectedRectangle = null;
let resizeHandle = null;
let offsetX, offsetY;
var imageObj = new Image();
let boxData = null;
let lastSelectedRectangle = null;

export default {
    data() {
        return {
            imageUrl: null,   
        };
    },
   
    created() {
        var query = this.$route.query;
        console.log(query);
        boxData = JSON.parse(query.detectedObjects);
        this.imageUrl = query.image;
    },
    
    mounted() {
        this.$nextTick(function () {
            console.log("starting rendering");
            renderBoundingBoxes(this, boxData, this.imageUrl);
        });
    },
    beforeUnmount(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }
};

function renderBoundingBoxes(obj, detectedObjects, img) {

    canvas = obj.$refs.canvas;
    
    ctx = canvas.getContext('2d');
    imageObj = new Image();
    imageObj.src = img;
    imageObj.onload = function () {
        ctx.drawImage(imageObj, 0, 0);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        
        ctx.canvas.width = imageObj.width;
        ctx.canvas.height = imageObj.height;

        rectangles =[];
        detectedObjects._value.forEach(box => {
            var xmin = box.bbox.xmin;
            var xmax = box.bbox.xmax;
            var ymin = box.bbox.ymin;
            var ymax = box.bbox.ymax;
            var h = imageObj.height;
            var w = imageObj.width
            var xStart = xmin * w;
            var yStart = ymin * h;
            var xEnd = xmax * w;
            var yEnd = ymax * h
            var xLength = xEnd - xStart;
            var yLength = yEnd - yStart;
            rectangles.push({ x: xStart, y: yStart, width: xLength, height: yLength });
        });
        drawRectangles();
    }

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleDeleteKey);
}

function drawRectangles() {
    ctx.drawImage(imageObj, 0, 0);
    rectangles.forEach(rect => {
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.stroke();
        drawResizeHandles(rect);
    });
};

function drawResizeHandles(rect) {
    const handles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

    handles.forEach(handle => {
        const x = handle.includes('left') ? rect.x : rect.x + rect.width - 5;
        const y = handle.includes('top') ? rect.y : rect.y + rect.height - 5;

        ctx.fillStyle = '#007bff';
        ctx.fillRect(x, y, 10, 10);

        ctx.strokeStyle = 'white';
        ctx.strokeRect(x, y, 10, 10);
    });
};

function handleMouseDown(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    

    selectedRectangle = hitTest(mouseX, mouseY);

    if (selectedRectangle) {
        const handles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        resizeHandle = handles.find(handle => {
            const x = handle.includes('left') ? selectedRectangle.x : selectedRectangle.x + selectedRectangle.width - 5;
            const y = handle.includes('top') ? selectedRectangle.y : selectedRectangle.y + selectedRectangle.height - 5;

            return mouseX >= x && mouseX <= x + 10 && mouseY >= y && mouseY <= y + 10;
        });

        if (!resizeHandle) {
            offsetX = mouseX - selectedRectangle.x;
            offsetY = mouseY - selectedRectangle.y;
        }
    } else {

    }

    drawRectangles();
}

function handleMouseMove(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    if (selectedRectangle) {
        if (resizeHandle) {
            resizeRectangle(selectedRectangle, mouseX, mouseY);
        } else {
            selectedRectangle.x = mouseX - offsetX;
            selectedRectangle.y = mouseY - offsetY;
        }
        drawRectangles();
    }
}

function handleMouseUp() {
    selectedRectangle = null;
    resizeHandle = null;
}

function handleDeleteKey(event) {
    if (event.key === 'Delete' && lastSelectedRectangle) {
        rectangles = rectangles.filter(rect => rect !== lastSelectedRectangle);
        lastSelectedRectangle = null;
        drawRectangles();
    }
}

function resizeRectangle(rect, mouseX, mouseY) {
    switch (resizeHandle) {
        case 'top-left':
            rect.width += rect.x - mouseX;
            rect.height += rect.y - mouseY;
            rect.x = mouseX;
            rect.y = mouseY;
            break;
        case 'top-right':
            rect.width = mouseX - rect.x;
            rect.height += rect.y - mouseY;
            rect.y = mouseY;
            break;
        case 'bottom-left':
            rect.width += rect.x - mouseX;
            rect.height = mouseY - rect.y;
            rect.x = mouseX;
            break;
        case 'bottom-right':
            rect.width = mouseX - rect.x;
            rect.height = mouseY - rect.y;
            break;
        default:
            break;
    }
}

function hitTest(x, y) {
    for (let i = rectangles.length - 1; i >= 0; i--) {
        const rect = rectangles[i];
        if (
            x >= rect.x &&
            x <= rect.x + rect.width &&
            y >= rect.y &&
            y <= rect.y + rect.height
        ) {
            lastSelectedRectangle = rect;
            return rect;
        }
    }
    lastSelectedRectangle = null;
    return null;
}

</script>
  