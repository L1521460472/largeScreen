var EARTHRADIUS = 6370996.81

function degreeToRad(degree) {
    return (Math.PI * degree) / 180;
};
function _getRange(v, a, b) {
    if (a != null) {
        v = Math.max(v, a);
    }
    if (b != null) {
        v = Math.min(v, b);
    }
    return v;
}
function _getLoop(v, a, b) {
    while (v > b) {
        v -= b - a;
    }
    while (v < a) {
        v += b - a;
    }
    return v;
}

export function getDistance(point1, point2) {
    point1.blng = _getLoop(point1.blng, -180, 180);
    point1.blat = _getRange(point1.blat, -74, 74);
    point2.blng = _getLoop(point2.blng, -180, 180);
    point2.blat = _getRange(point2.blat, -74, 74);

    var x1, x2, y1, y2;
    x1 = degreeToRad(point1.blng);
    y1 = degreeToRad(point1.blat);
    x2 = degreeToRad(point2.blng);
    y2 = degreeToRad(point2.blat);

    return EARTHRADIUS *
            Math.acos(
                Math.sin(y1) * Math.sin(y2) +
                Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1)
            )
}