import * as Piano from './Piano';

describe('Piano', () => {


    test('pianoPitchRange', () => {
        expect(Piano.pianoPitchRange.get(88)).toStrictEqual({ minPitch: 21, maxPitch: 108 });
    });
});
