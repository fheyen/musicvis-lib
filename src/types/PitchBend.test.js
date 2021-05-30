import PitchBend from './PitchBend';

describe('PitchBend', () => {

    describe('constructor', () => {

        test('empty', () => {
            expect(new PitchBend()).toEqual({
                start: 0,
                amount: 0,
                channel: 0,
            });
        });

        test('values', () => {
            expect(new PitchBend(1, 2, 3)).toEqual({
                start: 1,
                amount: 2,
                channel: 3,
            });
        });

    });

    describe('PitchBend.from()', () => {

        test('empty', () => {
            expect(PitchBend.from({})).toEqual({
                start: 0,
                amount: 0,
                channel: 0,
            });
        });

        test('values', () => {
            expect(
                PitchBend.from({ start: 1, amount: 2, channel: 3 })
            ).toStrictEqual(
                new PitchBend(1, 2, 3)
            );
        });
    });

});
