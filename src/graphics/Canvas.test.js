import 'jest-canvas-mock';
import * as Canv from './Canvas.js';

describe('Canvas', () => {
    // const canvas = HTMLCanvasElement();
    const ctx = new CanvasRenderingContext2D();

    test('canvas mock works', () => {
        expect(() => ctx.arc(1, 2, 3, 4)).toThrow(TypeError);
    });

    test.skip('setupCanvas', () => {
        // expect(() => Canv.setupCanvas(canvas)).not.toThrow();
        // expect(Canv.setupCanvas(canvas)).toBeInstanceOf(CanvasRenderingContext2D);
    });

    test('draw circle', () => {
        expect(() => Canv.drawCircle(ctx, 50, 50, 10)).not.toThrow();
    });

    test('drawLine', () => {
        expect(() => Canv.drawLine(ctx, 30, 50, 10, 20)).not.toThrow();
    });
    test('drawHLine', () => {
        expect(() => Canv.drawHLine(ctx, 30, 50, 10)).not.toThrow();
    });
    test('drawVLine', () => {
        expect(() => Canv.drawVLine(ctx, 30, 50, 10)).not.toThrow();
    });
    test('drawBowRight', () => {
        expect(() => Canv.drawBowRight(ctx, 30, 50, 10, 10)).not.toThrow();
        expect(() => Canv.drawBowRight(ctx, 30, 50, 10, 10, 0)).not.toThrow();
    });

    test('draw filled circle', () => {
        expect(() => Canv.drawFilledCircle(ctx, 50, 50, 10)).not.toThrow();
    });

    test('draw x', () => {
        expect(() => Canv.drawX(ctx, 50, 50, 10)).not.toThrow();
    });

    test('draw diamond', () => {
        expect(() => Canv.drawDiamond(ctx, 50, 50, 10)).not.toThrow();
    });

    test('draw triangle', () => {
        expect(() => Canv.drawTriangle(ctx, 50, 50, 10)).not.toThrow();
    });

    test('draw note trap', () => {
        expect(() => Canv.drawNoteTrapezoid(ctx, 50, 50, 100, 20, 10)).not.toThrow();
    });

    test('draw note trap upwards', () => {
        expect(() => Canv.drawNoteTrapezoidUpwards(ctx, 50, 50, 20, 100, 10)).not.toThrow();
    });

    test('draw rounded rect', () => {
        expect(() => Canv.drawRoundedRect(ctx, 50, 50, 100, 200, 20)).not.toThrow();
        expect(() => Canv.drawRoundedRect(ctx, 50, 50, -1, 200, 20)).not.toThrow();
    });

    test('drawCornerLine', () => {
        expect(() => Canv.drawCornerLine(ctx, 50, 50, 100, 200)).not.toThrow();
        expect(() => Canv.drawCornerLine(ctx, 50, 50, 100, 200, true)).not.toThrow();
        expect(() => Canv.drawCornerLine(ctx, 50, 50, 100, 200, false)).not.toThrow();
        expect(() => Canv.drawCornerLine(ctx, 50, 50, 0, 20)).not.toThrow();
    });
    test('drawRoundedCornerLine', () => {
        expect(() => Canv.drawRoundedCornerLine(ctx, 50, 50, 100, 200)).not.toThrow();
        expect(() => Canv.drawRoundedCornerLine(ctx, 50, 50, 100, 200, 10)).not.toThrow();
        expect(() => Canv.drawRoundedCornerLine(ctx, 50, 50, 10, 200)).not.toThrow();
        expect(() => Canv.drawRoundedCornerLine(ctx, 50, 50, 0, 0)).not.toThrow();
    });
    test('drawRoundedCornerLineRightLeft', () => {
        expect(() => Canv.drawRoundedCornerLineRightLeft(ctx, 50, 50, 100, 200)).not.toThrow();
        expect(() => Canv.drawRoundedCornerLineRightLeft(ctx, 50, 50, 100, 200, 10)).not.toThrow();
        expect(() => Canv.drawRoundedCornerLineRightLeft(ctx, 50, 50, 10, 200)).not.toThrow();
        expect(() => Canv.drawRoundedCornerLineRightLeft(ctx, 50, 50, 0, 0)).not.toThrow();
    });

    test('draw hexagon', () => {
        expect(() => Canv.drawHexagon(ctx, 50, 50, 10)).not.toThrow();
    });

    test('draw bezier x', () => {
        expect(() => Canv.drawBezierConnectorX(ctx, 50, 50, 60, 60)).not.toThrow();
        expect(() => Canv.drawBezierConnectorX(ctx, 60, 60, 50, 50)).not.toThrow();
    });
    test('draw bezier y', () => {
        expect(() => Canv.drawBezierConnectorY(ctx, 50, 50, 60, 60)).not.toThrow();
        expect(() => Canv.drawBezierConnectorY(ctx, 60, 60, 50, 50)).not.toThrow();
    });

    test('drawRoundedCorner', () => {
        for (const x1 of [-10, 0, 10]) {
            for (const x2 of [-10, 0, 10]) {
                for (const y1 of [-10, 0, 10]) {
                    for (const y2 of [-10, 0, 10]) {
                        for (const turnLeft of [-10, 0, 10]) {
                            for (const roundness of [0, 0.1, 0.5, 1]) {
                                expect(() => Canv.drawRoundedCorner(ctx, x1, y1, x2, y2, turnLeft, roundness)).not.toThrow();
                            }
                        }
                    }
                }
            }
        }
    });
});
