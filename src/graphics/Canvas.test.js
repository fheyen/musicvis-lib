import 'jest-canvas-mock'
import * as cv from './Canvas.js'

describe('Canvas', () => {
  // const canvas = HTMLCanvasElement();
  const ctx = new CanvasRenderingContext2D()

  test('canvas mock works', () => {
    expect(() => ctx.arc(1, 2, 3, 4)).toThrow(TypeError)
  })

  test.skip('setupCanvas', () => {
    // expect(() => Canv.setupCanvas(canvas)).not.toThrow();
    // expect(Canv.setupCanvas(canvas)).toBeInstanceOf(CanvasRenderingContext2D);
  })

  test('draw circle', () => {
    expect(() => cv.drawCircle(ctx, 50, 50, 10)).not.toThrow()
  })

  test('drawLine', () => {
    expect(() => cv.drawLine(ctx, 30, 50, 10, 20)).not.toThrow()
  })
  test('drawHLine', () => {
    expect(() => cv.drawHLine(ctx, 30, 50, 10)).not.toThrow()
  })
  test('drawVLine', () => {
    expect(() => cv.drawVLine(ctx, 30, 50, 10)).not.toThrow()
  })
  test('drawBowRight', () => {
    expect(() => cv.drawBowRight(ctx, 30, 50, 10, 10)).not.toThrow()
    expect(() => cv.drawBowRight(ctx, 30, 50, 10, 10, 0)).not.toThrow()
  })

  test('draw filled circle', () => {
    expect(() => cv.drawFilledCircle(ctx, 50, 50, 10)).not.toThrow()
  })

  test('draw x', () => {
    expect(() => cv.drawX(ctx, 50, 50, 10)).not.toThrow()
  })

  test('draw diamond', () => {
    expect(() => cv.drawDiamond(ctx, 50, 50, 10)).not.toThrow()
  })

  test('draw triangle', () => {
    expect(() => cv.drawTriangle(ctx, 50, 50, 10)).not.toThrow()
  })

  test('draw note trap', () => {
    expect(() => cv.drawNoteTrapezoid(ctx, 50, 50, 100, 20, 10)).not.toThrow()
  })

  test('draw note trap upwards', () => {
    expect(() => cv.drawNoteTrapezoidUpwards(ctx, 50, 50, 20, 100, 10)).not.toThrow()
  })

  test('draw rounded rect', () => {
    expect(() => cv.drawRoundedRect(ctx, 50, 50, 100, 200, 20)).not.toThrow()
    expect(() => cv.drawRoundedRect(ctx, 50, 50, -1, 200, 20)).not.toThrow()
  })

  test('drawCornerLine', () => {
    expect(() => cv.drawCornerLine(ctx, 50, 50, 100, 200)).not.toThrow()
    expect(() => cv.drawCornerLine(ctx, 50, 50, 100, 200, true)).not.toThrow()
    expect(() => cv.drawCornerLine(ctx, 50, 50, 100, 200, false)).not.toThrow()
    expect(() => cv.drawCornerLine(ctx, 50, 50, 0, 20)).not.toThrow()
  })
  test('drawRoundedCornerLine', () => {
    expect(() => cv.drawRoundedCornerLine(ctx, 50, 50, 100, 200)).not.toThrow()
    expect(() => cv.drawRoundedCornerLine(ctx, 50, 50, 100, 200, 10)).not.toThrow()
    expect(() => cv.drawRoundedCornerLine(ctx, 50, 50, 10, 200)).not.toThrow()
    expect(() => cv.drawRoundedCornerLine(ctx, 50, 50, 0, 0)).not.toThrow()
  })
  test('drawRoundedCornerLineRightLeft', () => {
    expect(() => cv.drawRoundedCornerLineRightLeft(ctx, 50, 50, 100, 200)).not.toThrow()
    expect(() => cv.drawRoundedCornerLineRightLeft(ctx, 50, 50, 100, 200, 10)).not.toThrow()
    expect(() => cv.drawRoundedCornerLineRightLeft(ctx, 50, 50, 10, 200)).not.toThrow()
    expect(() => cv.drawRoundedCornerLineRightLeft(ctx, 50, 50, 0, 0)).not.toThrow()
  })

  test('draw hexagon', () => {
    expect(() => cv.drawHexagon(ctx, 50, 50, 10)).not.toThrow()
  })

  test('draw bezier x', () => {
    expect(() => cv.drawBezierConnectorX(ctx, 50, 50, 60, 60)).not.toThrow()
    expect(() => cv.drawBezierConnectorX(ctx, 60, 60, 50, 50)).not.toThrow()
  })
  test('draw bezier y', () => {
    expect(() => cv.drawBezierConnectorY(ctx, 50, 50, 60, 60)).not.toThrow()
    expect(() => cv.drawBezierConnectorY(ctx, 60, 60, 50, 50)).not.toThrow()
  })

  test('drawRoundedCorner', () => {
    for (const x1 of [-10, 0, 10]) {
      for (const x2 of [-10, 0, 10]) {
        for (const y1 of [-10, 0, 10]) {
          for (const y2 of [-10, 0, 10]) {
            for (const turnLeft of [-10, 0, 10]) {
              for (const roundness of [0, 0.1, 0.5, 1]) {
                expect(() => cv.drawRoundedCorner(ctx, x1, y1, x2, y2, turnLeft, roundness)).not.toThrow()
              }
            }
          }
        }
      }
    }
  })

  test('drawBracketH', () => {
    expect(() => cv.drawBracketH(ctx, 50, 50, 60, 0)).not.toThrow()
    expect(() => cv.drawBracketH(ctx, 50, 50, 60, 5)).not.toThrow()
    expect(() => cv.drawBracketH(ctx, 60, 60, 50, -5)).not.toThrow()
  })

  test('drawMatrix', () => {
    const m0 = [
      [0, 0],
      [0, 0]
    ]
    const m1 = [
      [1, 0],
      [0, 1]
    ]
    expect(() => cv.drawMatrix(ctx, m0, 50, 60, 0)).not.toThrow()
    expect(() => cv.drawMatrix(ctx, m0, 50, 60, 100)).not.toThrow()
    expect(() => cv.drawMatrix(ctx, m0, 60, 50, 100)).not.toThrow()
    expect(() => cv.drawMatrix(ctx, m1, 50, 60, 0)).not.toThrow()
    expect(() => cv.drawMatrix(ctx, m1, 50, 60, 100)).not.toThrow()
    expect(() => cv.drawMatrix(ctx, m1, 60, 50, 100)).not.toThrow()
  })

  test('drawColorRamp', () => {
    expect(() => cv.drawColorRamp(ctx)).not.toThrow()
    expect(() => cv.drawColorRamp(ctx, 50)).not.toThrow()
    expect(() => cv.drawColorRamp(ctx, 50, 10)).not.toThrow()
    expect(() => cv.drawColorRamp(ctx, 50, 10, (d) => `rgb(0, 0, ${Math.round(d * 255)})`)).not.toThrow()
  })

  test('drawVerticalText', () => {
    expect(() => cv.drawVerticalText(ctx)).not.toThrow()
    expect(() => cv.drawVerticalText(ctx, 50, 10)).not.toThrow()
    expect(() => cv.drawVerticalText(ctx, 50, 10, 'test')).not.toThrow()
    expect(() => cv.drawVerticalText(ctx, 50, 10, 'test', 'red')).not.toThrow()
    expect(() => cv.drawVerticalText(ctx, 50, 10, 'test', 'red', '10px sans-serif')).not.toThrow()
    expect(() => cv.drawVerticalText(ctx, 50, 10, 'test', 'red', '10px sans-serif', true)).not.toThrow()
  })
})
