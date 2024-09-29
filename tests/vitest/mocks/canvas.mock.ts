 // @ts-nocheck
import { vi, afterAll } from 'vitest';


//Mock specific methods if needed
HTMLCanvasElement.prototype.getContext = vi.fn(() => {
    return {
        fillRect: vi.fn(),
        clearRect: vi.fn(),
        getImageData: vi.fn(() => ({ data: [] })),
        putImageData: vi.fn(),
        createImageData: vi.fn(() => []),
        setTransform: vi.fn(),
        drawImage: vi.fn(),
        save: vi.fn(),
        fillText: vi.fn(),
        restore: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        stroke: vi.fn(),
        translate: vi.fn(),
        scale: vi.fn(),
        rotate: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
        measureText: vi.fn(() => ({ width: 0 })),
        transform: vi.fn(),
        rect: vi.fn(),
        clip: vi.fn(),
        // Add missing properties
        canvas: document.createElement('canvas'),
        getContextAttributes: vi.fn(),
        globalAlpha: 1.0,
        globalCompositeOperation: 'source-over',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'low',
        lineCap: 'butt',
        lineDashOffset: 0.0,
        lineJoin: 'miter',
        lineWidth: 1.0,
        miterLimit: 10.0,
        shadowBlur: 0,
        shadowColor: 'rgba(0, 0, 0, 0)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        strokeStyle: '#000000',
        textAlign: 'start',
        textBaseline: 'alphabetic',
        direction: 'inherit',
        filter: 'none',
        font: '10px sans-serif',
        fillStyle: '#000000',
        createLinearGradient: vi.fn(),
        createPattern: vi.fn(),
        createRadialGradient: vi.fn(),
        getLineDash: vi.fn(),
        isPointInPath: vi.fn(),
        isPointInStroke: vi.fn(),
        resetTransform: vi.fn(),
        scrollPathIntoView: vi.fn(),
        setLineDash: vi.fn(),
    } as unknown as CanvasRenderingContext2D;
});