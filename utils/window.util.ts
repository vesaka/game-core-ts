export const LANDSCAPE = 'landscpape';

export const PORTRAIT = 'portrait';

export const getOrientation = () => {
    var orientation = (screen.orientation || {}).type
            || screen.mozOrientation
            || screen.msOrientation;
    
    if (orientation) {
        if (orientation.indexOf(LANDSCAPE) > -1) {
            return LANDSCAPE;
        } else if (orientation.indexOf(PORTRAIT) > -1) {
            return PORTRAIT;
        }
    }

    if (window.innerWidth > window.innerHeight) {
        return LANDSCAPE;
    }

    return PORTRAIT;
};

export const isHorizontal = () => {
    return window.innerWidth >= window.innerHeight;
};

export const isVertical = () => {
    return window.innerWidth < window.innerHeight;
};

export const isLandscape = () => {
    return LANDSCAPE === getOrientation();
};

export const isPortrait = () => {
    return PORTRAIT === getOrientation();
};

const _w = window || {};
const _s = window.screen || {};
const _b = document.body;
const _d = document.documentElement;

export const getSize = () => {
    var width = Math.max(0, _w.innerWidth || _d.clientWidth || _b.clientWidth || 0);
    var height = Math.max(0, _w.innerHeight || _d.clientHeight || _b.clientHeight || 0);

    return {
        width: width,
        height: height,
        centerx: width / 2,
        centery: height / 2,
        ratio: width / height,
    };
}

export const getMouse = (e: any) => {
    var x = Math.max(0, e.pageX || e.clientX || 0);
    var y = Math.max(0, e.pageY || e.clientY || 0);
    var s = getSize();

    return {
        x: x,
        y: y,
        centerx: (x - s.centerx),
        centery: (y - s.centery),
    };
}
