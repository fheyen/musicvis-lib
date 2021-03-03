import * as SimilarSections from './SimilarSections';

describe('SimilarSections', () => {
    describe('findSimilarStringSections', () => {
        test('empty', () => {
            expect(
                SimilarSections.findSimilarStringSections('', '')
            ).toStrictEqual(
                []
            );
            expect(
                SimilarSections.findSimilarStringSections('1234', '')
            ).toStrictEqual(
                []
            );
            expect(
                SimilarSections.findSimilarStringSections('', '1234')
            ).toStrictEqual(
                []
            );
        });

        test.skip('simple, no gaps', () => {
            expect(
                SimilarSections.findSimilarStringSections('123412341234', '1234')
            ).toStrictEqual(
                [
                    { index: 0, distance: 0 },
                    { index: 4, distance: 0 },
                    { index: 8, distance: 0 },
                ]
            );
        });

        test.skip('simple, gaps', () => {
            expect(
                SimilarSections.findSimilarStringSections('1234 1234 1234', '1234')
            ).toStrictEqual(
                [
                    { index: 0, distance: 0 },
                    { index: 5, distance: 0 },
                    { index: 10, distance: 0 },
                ]
            );
        });
    });

    describe('findSimilarNoteSections', () => {

        test('empty', () => {

        });
    });
});
