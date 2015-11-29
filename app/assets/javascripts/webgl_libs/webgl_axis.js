function graphstraightlineMain() {
    this.version = '0.87';
    w = 800;
    h = 600;
    var s = '';
    s += '<div style="position:relative; width:' + w + 'px; height:' + h + 'px; border-radius: 10px; margin:auto; display:block;  background-color: #e0f8ff;">';
    s += '<canvas id="canvasId" width="' + w + '" height="' + h + '" style="z-index:1;"></canvas>';
    s += '<div id="title" style="font: 20px arial; font-weight: bold; color: black; position:absolute; top:5px; left:0; width:250px; text-align:left; text-align: center;"></div>';
    s += '<input type="range" id="r1"  value="1" min="-40" max="40" step=".1" style="z-index:2; position:absolute; top:90px; left:10px; width:200px; height:17px; border: none; "  oninput="showVal(1,this.value)" onchange="showVal(1,this.value)" />';
    s += '<input type="range" id="r2" value="2" min="-40" max="40" step=".1" style="z-index:2; position:absolute; top:155px; left:10px; width:200px; height:17px; border: none; " oninput="showVal(2,this.value)" onchange="showVal(2,this.value)" />';
    s += '<div id="val1" style=" position:absolute; top:55px; left:20px; border: none; padding:5px; background-color: #ffeeee; font: bold 20px Arial; color: orange; z-index:3;">9</div>';
    s += '<div id="val2" style=" position:absolute; top:120px; left:20px; border: none; padding:5px; background-color: #eeeeff; font: bold 20px Arial; color:blue; z-index:3; ">3</div>';
    s += '<div id="equn" style="font: bold 28px arial; bold; color: darkblue; position:absolute; top:210px; left:10px; width:220px;  text-align: center; background-color: #89FFDE; padding:5px;"></div>';
    s += '<div id="copyrt" style="position:absolute; left:3px; bottom:3px; font: 10px Arial; font-weight: bold; color: blue; ">&copy; 2015 MathsIsFun.com  v' + this.version + '</div>';
    s += '</div>';
    // grid = document.getElementById('draw-grid');

    el = document.write(s);

    // el = grid.appendChild(s)
    // element;
    el = document.getElementById('canvasId');
    ratio = 2;
    el.width = w * ratio;
    el.height = h * ratio;
    el.style.width = w + "px";
    el.style.height = h + "px";
    g = el.getContext("2d");
    g.setTransform(ratio, 0, 0, ratio, 0, 0);
    graphLt = 250;
    graphWd = 300;
    graphTp = 10;
    graphHt = 300;
    coords = new Coords(graphLt, graphTp, graphWd, graphHt, -9, -9, 9, 9, true);
    showVal();
}

function showVal() {
    var r1 = document.getElementById("r1");
    var r2 = document.getElementById("r2");
    var el1 = document.getElementById("val1");
    var el2 = document.getElementById("val2");
    var m = r1.value;
    m = Number(Number(m).toPrecision(5));
    var b = r2.value;
    b = Number(Number(b).toPrecision(5));
    el1.innerHTML = "m = " + m;
    var xpos = (parseFloat(m) + 4) * 200 / 8 - 10;
    el1.style.left = xpos + "px";
    el2.innerHTML = "b = " + b;
    xpos = (parseFloat(b) + 4) * 200 / 8 - 10;
    el2.style.left = xpos + "px";
    g = el.getContext("2d");
    g.clearRect(0, 0, el.width, el.height);
    g.fillStyle = "#ffffff";
    g.beginPath();
    g.rect(coords.left, coords.top, coords.width, coords.height);
    g.fill();
    graph = new Graph(g, coords);
    drawLine(m, b);
    document.getElementById("title").innerHTML = "Graph of y = mx + b";
    document.getElementById("equn").innerHTML = "y = " + linearPhrase([m, b]);
}

function drawLine(m, b) {
    graph.drawGraph();
    g.beginPath();
    g.lineWidth = 2;
    g.strokeStyle = "#00ff00";
    for (i = 0; i < graphWd; i++) {
        var xVal = coords.toXVal(i);
        var yVal = m * xVal + b;
        var yPos = coords.toYPix(yVal);
        if (yPos > (graphTp - 2) && yPos < (graphTp + graphHt + 2)) {
            g.lineTo(graphLt + i, yPos);
        }
    }
    g.stroke();
    g.closePath();
}

function update() {
    HiGraphics.clear(el);
}

function hiGraphics() {
    lineWidth = 5;
    lineJoin = "round";
    strokeStyle = "#333";
}
hiGraphics.prototype.clear = function(el) {
    g = el.getContext("2d");
    g.clearRect(0, 0, el.width, el.height);
    return true;
};
hiGraphics.prototype.lineStyle = function(width, clr, opacity) {
    lineWidth = width;
    lineJoin = "round";
    strokeStyle = clr;
};
hiGraphics.prototype.stt = function() {
    g.beginPath();
    g.lineWidth = lineWidth;
    g.lineJoin = lineJoin;
    g.strokeStyle = strokeStyle;
};
hiGraphics.prototype.drawCircle = function(g, circleX, circleY, circleRadius) {
    this.stt();
    g.fillStyle = "#FF0000";
    g.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    g.stroke();
    return true;
};
hiGraphics.prototype.drawArc = function(g, midX, midY, radius, fromAngle, toAngle) {
    this.stt();
    g.arc(midX, midY, radius, fromAngle, toAngle);
    g.stroke();
};
var HiGraphics = new hiGraphics();

function TextBox(ig, ifont, ifontSize, iwd, ilines, itxt, ix, iy, iinputQ) {
    this.g = ig;
    this.font = ifont;
    this.fontSize = ifontSize;
    this.wd = iwd;
    this.lines = ilines;
    this.txt = itxt;
    this.posx = ix;
    this.posy = iy;
    this.clr = "#000000";
    this.refresh();
}
TextBox.prototype.refresh = function() {
    this.g.font = this.fontSize + "px " + this.font;
    this.g.fillStyle = this.clr;
    this.g.fillText(this.txt, this.posx, this.posy, this.wd);
};
TextBox.prototype.setText = function(itxt) {
    this.txt = itxt;
    this.refresh();
};
TextBox.prototype.setClr = function(iclr) {
    this.clr = iclr;
    this.refresh();
};

function Coords(left, top, width, height, xStt, yStt, xEnd, yEnd, uniScaleQ) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.xStt = xStt;
    this.yStt = yStt;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.uniScaleQ = uniScaleQ;
    var xLogQ = false;
    var yLogQ = false;
    var skewQ = true;
    this.xScale;
    var xLogScale;
    this.yScale;
    this.calcScale();
}
Coords.prototype.calcScale = function() {
    if (this.xLogQ) {
        if (this.xStt <= 0)
            this.xStt = 1;
        if (this.xEnd <= 0)
            this.xEnd = 1;
    }
    if (this.yLogQ) {
        if (this.yStt <= 0)
            this.yStt = 1;
        if (this.yEnd <= 0)
            this.yEnd = 1;
    }
    var temp;
    if (this.xStt > this.xEnd) {
        temp = this.xStt;
        this.xStt = this.xEnd;
        this.xEnd = temp;
    }
    if (this.yStt > this.yEnd) {
        temp = this.yStt;
        this.yStt = this.yEnd;
        this.yEnd = temp;
    }
    var xSpan = this.xEnd - this.xStt;
    if (xSpan <= 0)
        xSpan = 0.1;
    this.xScale = xSpan / this.width;
    this.xLogScale = (Math.log(this.xEnd) - Math.log(this.xStt)) / this.width;
    var ySpan = this.yEnd - this.yStt;
    if (ySpan <= 0)
        ySpan = 0.1;
    this.yScale = ySpan / this.height;
    this.yLogScale = (Math.log(this.yEnd) - Math.log(this.yStt)) / this.height;
    if (this.uniScaleQ && !this.xLogQ && !this.yLogQ) {
        var newScale = Math.max(this.xScale, this.yScale);
        this.xScale = newScale;
        xSpan = this.xScale * this.width;
        var xMid = (this.xStt + this.xEnd) / 2;
        this.xStt = xMid - xSpan / 2;
        this.xEnd = xMid + xSpan / 2;
        this.yScale = newScale;
        ySpan = this.yScale * this.height;
        var yMid = (this.yStt + this.yEnd) / 2;
        this.yStt = yMid - ySpan / 2;
        this.yEnd = yMid + ySpan / 2;
    }
}
Coords.prototype.toXPix = function(val, useCornerQ) {
    if (this.xLogQ) {
        return this.left + (Math.log(val) - Math.log(xStt)) / xLogScale;
    } else {
        return this.left + ((val - this.xStt) / this.xScale);
    }
};
Coords.prototype.toYPix = function(val) {
    if (this.yLogQ) {
        return this.top + (Math.log(yEnd) - Math.log(val)) / yLogScale;
    } else {
        return this.top + ((this.yEnd - val) / this.yScale);
    }
};
Coords.prototype.toPtVal = function(pt, useCornerQ) {
    return new Pt(toXVal(pt.x, useCornerQ), toYVal(pt.y, useCornerQ));
};
Coords.prototype.toXVal = function(pix, useCornerQ) {
    if (useCornerQ) {
        return this.xStt + (pix - this.left) * this.xScale;
    } else {
        return this.xStt + pix * this.xScale;
    }
};
Coords.prototype.toYVal = function(pix, useCornerQ) {
    if (useCornerQ) {
        return yEnd - (pix - top) * yScale;
    } else {
        return yEnd - pix * yScale;
    }
};
Coords.prototype.getTicks = function(stt, span) {
    var ticks = [];
    var inter = this.tickInterval(span / 5, false);
    tickStt = Math.ceil(stt / inter) * inter;
    var i = 0;
    do {
        var tick = i * inter;
        tick = Number(tick.toPrecision(5));
        ticks.push([tickStt + tick, 1]);
        i++;
    } while (tick < span);
    inter = this.tickInterval(span / 4, true);
    for (i = 0; i < ticks.length; i++) {
        var t = ticks[i][0];
        if (Math.abs(Math.round(t / inter) - (t / inter)) < 0.001) {
            ticks[i][1] = 0;
        }
    }
    return ticks;
};
Coords.prototype.tickInterval = function(span, majorQ) {
    var pow10 = Math.pow(10, Math.floor(Math.log(span) * Math.LOG10E));
    var mantissa = span / pow10;
    if (mantissa >= 5) {
        if (majorQ) {
            return (5 * pow10);
        } else {
            return (2 * pow10);
        }
    }
    if (mantissa >= 2) {
        if (majorQ) {
            return (2 * pow10);
        } else {
            return (1 * pow10);
        }
    }
    if (mantissa >= 1) {
        if (majorQ) {
            return (1 * pow10);
        } else {
            return (0.2 * pow10);
        }
    }
    if (majorQ) {
        return (1 * pow10);
    } else {
        return (0.2 * pow10);
    }
};
Coords.prototype.xTickInterval = function(tickDensity, majorQ) {
    return this.tickInterval((this.xEnd - this.xStt) / tickDensity, majorQ);
};
Coords.prototype.yTickInterval = function(tickDensity, majorQ) {
    return this.tickInterval((this.yEnd - this.yStt) / tickDensity, majorQ);
};

function Graph(g, coords) {
    this.g = g;
    this.coords = coords;
    var xClr = 0x4444ff;
    var yClr = 0xff4444;
    this.xLinesQ = true;
    this.yLinesQ = true;
    this.xArrowQ = true;
    this.yArrowQ = true;
    this.xValsQ = true;
    this.yValsQ = true;
    this.skewQ = false;
}
Graph.prototype.drawGraph = function() {
    if (coords.xLogQ) {
        this.drawLinesLogX();
    } else {
        if (this.xLinesQ) {
            this.drawLinesX();
        }
    }
    if (coords.yLogQ) {
        drawLinesLogY();
    } else {
        if (this.yLinesQ) {
            this.drawLinesY();
        }
    }
    if (!this.skewQ) {
        g.beginPath();
        g.lineWidth = 1;
        g.strokeStyle = "#000000";
        g.rect(coords.left, coords.top, coords.width, coords.height);
        g.stroke();
        g.closePath();
    }
}
Graph.prototype.drawLinesX = function() {
    var xAxisPos = coords.toYPix(0);
    var yAxisPos = coords.toXPix(0);
    var g = this.g;
    g.lineWidth = 1;
    var ticks = coords.getTicks(coords.xStt, coords.xEnd - coords.xStt);
    for (var i = 0; i < ticks.length; i++) {
        var tick = ticks[i];
        var xVal = tick[0];
        var tickLevel = tick[1];
        if (tickLevel == 0) {
            g.strokeStyle = "rgba(0,0,256,0.3)";
        } else {
            g.strokeStyle = "rgba(0,0,256,0.1)";
        }
        var xPix = coords.toXPix(xVal, false);
        g.beginPath();
        g.moveTo(xPix, coords.toYPix(coords.yStt, false));
        g.lineTo(xPix, coords.toYPix(coords.yEnd, false));
        g.stroke();
        if (tickLevel == 0 && this.xValsQ) {
            g.fillStyle = "#0000ff"
            g.font = "bold 12px Verdana";
            g.textAlign = "center";
            g.fillText(xVal, xPix, xAxisPos + 15);
        }
    }
    if (this.skewQ)
        return;
    if (yAxisPos >= graphLt && yAxisPos < graphLt + coords.width) {
        g.lineWidth = 1.5;
        g.strokeStyle = "#ff0000";
        g.beginPath();
        g.moveTo(yAxisPos, coords.toYPix(coords.yStt, false));
        g.lineTo(yAxisPos, coords.toYPix(coords.yEnd, false));
        g.stroke();
        g.beginPath();
        g.fillStyle = g.strokeStyle;
        g.drawArrow(yAxisPos, coords.toYPix(coords.yEnd), 15, 2, 20, 10, Math.PI / 2, 10, false);
        g.stroke();
        g.fill();
        g.font = 'bold 24px Arial';
        g.fillText('y', yAxisPos + 12, coords.toYPix(coords.yEnd) + 15);
    }
}
Graph.prototype.drawLinesY = function() {
    var xAxisPos = coords.toYPix(0);
    var yAxisPos = coords.toXPix(0);
    var g = this.g;
    g.lineWidth = 1;
    var ticks = coords.getTicks(coords.xStt, coords.xEnd - coords.xStt);
    for (var i = 0; i < ticks.length; i++) {
        var tick = ticks[i];
        var yVal = tick[0];
        var tickLevel = tick[1];
        if (tickLevel == 0) {
            g.strokeStyle = "rgba(0,0,256,0.3)";
        } else {
            g.strokeStyle = "rgba(0,0,256,0.1)";
        }
        var yPix = coords.toYPix(yVal, false);
        g.beginPath();
        g.moveTo(coords.toXPix(coords.xStt, false), yPix);
        g.lineTo(coords.toXPix(coords.xEnd, false), yPix);
        g.stroke();
        if (tickLevel == 0 && this.yValsQ) {
            g.fillStyle = "#ff0000"
            g.font = "bold 12px Verdana";
            g.textAlign = "right";
            g.fillText(yVal, yAxisPos - 5, yPix + 5);
        }
    }
    if (this.skewQ)
        return;
    if (xAxisPos >= 0 && xAxisPos < coords.height) {
        g.lineWidth = 2;
        g.strokeStyle = "#0000ff";
        g.beginPath();
        g.moveTo(coords.toXPix(coords.xStt, false), xAxisPos);
        g.lineTo(coords.toXPix(coords.xEnd, false), xAxisPos);
        g.stroke();
        g.beginPath();
        g.fillStyle = g.strokeStyle;
        g.drawArrow(coords.toXPix(coords.xEnd, false), xAxisPos, 15, 2, 20, 10, 0, 10, false);
        g.stroke();
        g.fill();
        g.font = 'bold 24px Arial';
        g.fillText('x', coords.toXPix(coords.xEnd, false) - 5, xAxisPos - 7);
    }
};

function linearPhrase(a) {
    var s = "";
    for (var k = 0; k < a.length; k++) {
        var v = a[k];
        if (v != 0) {
            if (v < 0) {
                if (s.length > 0) {
                    s += " &minus; ";
                } else {
                    s += " &minus;";
                }
                v = -v;
            } else {
                if (s.length > 0) {
                    s += " + ";
                }
            }
            switch (k) {
                case 0:
                    if (v != 1) {
                        s += v;
                    }
                    s += "x";
                    break;
                case 1:
                    s += v;
                    break;
                default:
                    if (v != 1) {
                        s += v;
                    }
                    s += "(" + k + ")";
                    break;
            }
        }
    }
    if (s.length == 0) {
        s = '0';
    }
    return s;
}
CanvasRenderingContext2D.prototype.drawArrow = function(x0, y0, totLen, shaftHt, headLen, headHt, angle, sweep, invertQ) {
    var g = this;
    var pts = [
        [0, 0],
        [-headLen, -headHt / 2],
        [-headLen + sweep, -shaftHt / 2],
        [-totLen, -shaftHt / 2],
        [-totLen, shaftHt / 2],
        [-headLen + sweep, shaftHt / 2],
        [-headLen, headHt / 2],
        [0, 0]
    ];
    if (invertQ) {
        pts.push([0, -headHt / 2], [-totLen, -headHt / 2], [-totLen, headHt / 2], [0, headHt / 2]);
    }
    for (var i = 0; i < pts.length; i++) {
        var cosa = Math.cos(-angle);
        var sina = Math.sin(-angle);
        var xPos = pts[i][0] * cosa + pts[i][1] * sina;
        var yPos = pts[i][0] * sina - pts[i][1] * cosa;
        if (i == 0) {
            g.moveTo(x0 + xPos, y0 + yPos);
        } else {
            g.lineTo(x0 + xPos, y0 + yPos);
        }
    }
};