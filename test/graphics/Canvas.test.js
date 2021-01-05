import 'jest-canvas-mock';
import * as Canv from '../../src/graphics/Canvas';

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
    });

    test('draw hexagon', () => {
        expect(() => Canv.drawHexagon(ctx, 50, 50, 10)).not.toThrow();
    });
});
