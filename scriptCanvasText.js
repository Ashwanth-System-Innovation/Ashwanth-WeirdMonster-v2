<!DOCTYPE html>
<html>
<head>
    <title>Particle Text Animation</title>
    <style>
        body { margin: 0; overflow: hidden; background: #333; }
        canvas { display: block; }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script>
        function Banner() {
            var keyword = "Ashwanth";
            var canvas;
            var context;
            var bgCanvas;
            var bgContext;
            var denseness = 10;
            var parts = [];
            var mouse = {x:-100,y:-100};
            var mouseOnScreen = false;
            var itercount = 0;
            var itertot = 40;

            this.initialize = function(canvas_id) {
                canvas = document.getElementById(canvas_id);
                context = canvas.getContext('2d');
                
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                
                bgCanvas = document.createElement('canvas');
                bgContext = bgCanvas.getContext('2d');
                
                bgCanvas.width = window.innerWidth;
                bgCanvas.height = window.innerHeight;

                canvas.addEventListener('mousemove', MouseMove, false);
                canvas.addEventListener('mouseout', MouseOut, false);
                    
                start();
            }

            var start = function() {
                bgContext.fillStyle = "#000000";
                bgContext.font = '300px impact';
                bgContext.fillText(keyword, 85, 275);
                
                clear();    
                getCoords();
            }

            var getCoords = function() {
                var imageData, pixel, height, width;
                
                imageData = bgContext.getImageData(0, 0, canvas.width, canvas.height);
                
                for(height = 0; height < bgCanvas.height; height += denseness) {
                    for(width = 0; width < bgCanvas.width; width += denseness) {   
                        pixel = imageData.data[((width + (height * bgCanvas.width)) * 4) - 1];
                        if(pixel == 255) {
                            drawCircle(width, height);
                        }
                    }
                }
                
                setInterval(update, 40);
            }

            var drawCircle = function(x, y) {
                var startx = (Math.random() * canvas.width);
                var starty = (Math.random() * canvas.height);
                
                var velx = (x - startx) / itertot;
                var vely = (y - starty) / itertot;    
                
                parts.push({
                    c: '#' + (Math.random() * 0x949494 + 0xaaaaaa | 0).toString(16),
                    x: x,
                    y: y,
                    x2: startx,
                    y2: starty,
                    r: true,
                    v:{x:velx, y:vely}
                });
            }
                
            var update = function() {
                var i, dx, dy, sqrDist, scale;
                itercount++;
                clear();
                for (i = 0; i < parts.length; i++) {
                    if (parts[i].r == true) {
                        parts[i].x2 += parts[i].v.x;
                        parts[i].y2 += parts[i].v.y;
                    }
                    if (itercount == itertot) {
                        parts[i].v = {x:(Math.random() * 6) * 2 - 6, y:(Math.random() * 6) * 2 - 6};
                        parts[i].r = false;
                    }
                    
                    dx = parts[i].x - mouse.x;
                    dy = parts[i].y - mouse.y;
                    sqrDist = Math.sqrt(dx*dx + dy*dy);
                    
                    if (sqrDist < 20) {
                        parts[i].r = true;
                    }
                    
                    context.fillStyle = parts[i].c;
                    context.beginPath();
                    context.arc(parts[i].x2, parts[i].y2, 4, 0, Math.PI*2, true);
                    context.closePath();
                    context.fill();    
                }    
            }

            var MouseMove = function(e) {
                if (e.layerX || e.layerX == 0) {
                    mouseOnScreen = true;
                    mouse.x = e.layerX - canvas.offsetLeft;
                    mouse.y = e.layerY - canvas.offsetTop;
                }
            }

            var MouseOut = function(e) {
                mouseOnScreen = false;
                mouse.x = -100;
                mouse.y = -100;    
            }

            var clear = function() {
                context.fillStyle = '#333';
                context.beginPath();
                context.rect(0, 0, canvas.width, canvas.height);
                context.closePath();
                context.fill();
            }
        }

        var banner = new Banner();
        banner.initialize("canvas");
    </script>
</body>
</html>
