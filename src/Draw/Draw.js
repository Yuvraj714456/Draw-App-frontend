import { CHAT } from '../constant/events';
import { getShapesFromDB } from '../utils/getShapesFromDB';


const getDistance = (touches) => {
    const [touch1, touch2] = touches;
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
};

const getMidpoint = (touches) => {
    const [touch1, touch2] = touches;
    return {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
    };
};

const toWorld = (x, y, panX, panY, zoom) => ({
    x: (x - panX) / zoom,
    y: (y - panY) / zoom,
});



export const initDraw = async (canvas, socket, getSelectedTool, setSelectedTool,roomId) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let zoom = 1;
    let panX = 0;
    let panY = 0;
    let isDrawing = false;
    let isPanning = false;
    let isGesture = false;
    let startCoords = { x: 0, y: 0 };
    let panStart = { x: 0, y: 0 };
    let points = [];
    let lastMousePos = { x: 0, y: 0 };
    let initialPinchDistance = 0;

    const Shapes = await getShapesFromDB(roomId);


    const draw = () => {
        ctx.fillStyle = 'rgb(18, 18, 18)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(panX, panY);
        ctx.scale(zoom, zoom);
        drawAllShapes(Shapes, ctx);
        if (isDrawing) {
            drawPreview(ctx);
        }
        ctx.restore();
    };

    const drawPreview = (ctx) => {
        const currentTool = getSelectedTool()();
        const worldMousePos = toWorld(lastMousePos.x, lastMousePos.y, panX, panY, zoom);
        ctx.lineWidth = 2 / zoom;

        if (currentTool === "pointer") {
            ctx.strokeStyle = "rgba(100, 150, 255, 0.9)";
            ctx.fillStyle = "rgba(100, 150, 255, 0.1)";
            const width = worldMousePos.x - startCoords.x;
            const height = worldMousePos.y - startCoords.y;
            ctx.fillRect(startCoords.x, startCoords.y, width, height);
            ctx.strokeRect(startCoords.x, startCoords.y, width, height);
            return;
        }
        
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        switch (currentTool) {
            case "rectangle":
                ctx.strokeRect(startCoords.x, startCoords.y, worldMousePos.x - startCoords.x, worldMousePos.y - startCoords.y);
                break;
            case "circle":
                handleCircle(startCoords.x, startCoords.y, worldMousePos.x - startCoords.x, worldMousePos.y - startCoords.y, ctx);
                break;
            case "line":
                handleLine(startCoords.x, startCoords.y, worldMousePos.x, worldMousePos.y, ctx);
                break;
            case "pencil":
                if (points.length > 0) handlePencil(points, ctx);
                break;
        }
    };
    
    const finalizeShape = (endCoords) => {
        const currentTool = getSelectedTool()();
        if (currentTool === "pointer") return;

        let newShape = null;
        switch (currentTool) {
            case "rectangle":
            case "circle":
                newShape = { type: currentTool, x: startCoords.x, y: startCoords.y, width: endCoords.x - startCoords.x, height: endCoords.y - startCoords.y };
                break;
            case "line":
                newShape = { type: "line", x: startCoords.x, y: startCoords.y, endX: endCoords.x, endY: endCoords.y };
                break;
            case "pencil":
                if (points.length > 1) {
                    newShape = { type: "pencil", points: [...points] };
                }
                break;
        }

        if (newShape) {
            Shapes.push(newShape);
            socket.emit(CHAT, { roomId, content: newShape });
        }
    };


    canvas.addEventListener('mousedown', (e) => {
        const currentTool = getSelectedTool()();
        if (currentTool === 'pointer') {
            isDrawing = true;
            startCoords = toWorld(e.offsetX, e.offsetY, panX, panY, zoom);
            lastMousePos = { x: e.offsetX, y: e.offsetY };
        } else {
            isDrawing = true;
            startCoords = toWorld(e.offsetX, e.offsetY, panX, panY, zoom);
            lastMousePos = { x: e.offsetX, y: e.offsetY };
            if (currentTool === 'pencil') {
                points = [startCoords];
            }
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        lastMousePos = { x: e.offsetX, y: e.offsetY };
        if (isPanning) {
            panX = e.clientX - panStart.x;
            panY = e.clientY - panStart.y;
        } else if (isDrawing && getSelectedTool()() === 'pencil') {
            points.push(toWorld(e.offsetX, e.offsetY, panX, panY, zoom));
        }
        draw();
    });

    canvas.addEventListener('mouseup', (e) => {
        if (isDrawing) {
            const endCoords = toWorld(e.offsetX, e.offsetY, panX, panY, zoom);
            finalizeShape(endCoords);
        }
        isPanning = false;
        isDrawing = false;
        points = [];
        draw();
        setSelectedTool("pointer");
    });

    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.ctrlKey) {
            const scaleAmount = e.deltaY > 0 ? 0.95 : 1.05;
            const mouse = { x: e.offsetX, y: e.offsetY };
            const worldPos = toWorld(mouse.x, mouse.y, panX, panY, zoom);
            zoom *= scaleAmount;
            panX = mouse.x - worldPos.x * zoom;
            panY = mouse.y - worldPos.y * zoom;
        } else {
            panX -= e.deltaX;
            panY -= e.deltaY;
        }
        draw();
    });

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const currentTool = getSelectedTool()();
            if (currentTool !== 'pointer') {
                isDrawing = true;
                startCoords = toWorld(touch.clientX, touch.clientY, panX, panY, zoom);
                lastMousePos = { x: touch.clientX, y: touch.clientY };
                if (currentTool === 'pencil') {
                    points = [startCoords];
                }
            }
        } else if (e.touches.length === 2) {
            isDrawing = false;
            isGesture = true;
            initialPinchDistance = getDistance(e.touches);
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            lastMousePos = { x: touch.clientX, y: touch.clientY };
            if (isPanning) {
                panX = touch.clientX - panStart.x;
                panY = touch.clientY - panStart.y;
            } else if (isDrawing && getSelectedTool()() === 'pencil') {
                points.push(toWorld(touch.clientX, touch.clientY, panX, panY, zoom));
            }
        } else if (e.touches.length === 2 && isGesture) {
            const currentPinchDistance = getDistance(e.touches);
            const midpoint = getMidpoint(e.touches);
            const worldMidpoint = toWorld(midpoint.x, midpoint.y, panX, panY, zoom);

            if (initialPinchDistance > 0) {
                const zoomFactor = currentPinchDistance / initialPinchDistance;
                zoom *= zoomFactor;
            }
            panX = midpoint.x - worldMidpoint.x * zoom;
            panY = midpoint.y - worldMidpoint.y * zoom;
            initialPinchDistance = currentPinchDistance;
        }
        draw();
    });

    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (isDrawing) {
            const endCoords = toWorld(lastMousePos.x, lastMousePos.y, panX, panY, zoom);
            finalizeShape(endCoords);
        }
        isPanning = false;
        isDrawing = false;
        isGesture = false;
        points = [];
        initialPinchDistance = 0;
        draw();
    });


    draw();

    return {
        addShape: (shape) => {
            Shapes.push(shape);
            draw();
        },
        draw: draw,
    };
};


const handleCircle = (x, y, w, h, ctx) => {
    const radius = Math.sqrt(w * w + h * h) / 2;
    const centerX = x + w / 2;
    const centerY = y + h / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
    ctx.stroke();
};

const handleLine = (x1, y1, x2, y2, ctx) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};

const handlePencil = (points, ctx) => {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
};

const drawAllShapes = (shapes, ctx) => {
    ctx.strokeStyle = "rgba(255,255,255,1)";
    ctx.lineWidth = 2;

    for (const shape of shapes) {
        if (ctx.getTransform().a === 1) {
            ctx.lineWidth = (shape.lineWidth || 2);
        } else {
             ctx.lineWidth = (shape.lineWidth || 2) / ctx.getTransform().a;
        }
       
        switch (shape.type) {
            case "rectangle":
                ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
                break;
            case "circle":
                handleCircle(shape.x, shape.y, shape.width, shape.height, ctx);
                break;
            case "line":
                handleLine(shape.x, shape.y, shape.endX, shape.endY, ctx);
                break;
            case "pencil":
                handlePencil(shape.points, ctx);
                break;
        }
    }
};
