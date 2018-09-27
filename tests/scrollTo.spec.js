jest.mock('@degjs/easing');
import scrollTo from '../src/scrollTo';
import browserMock from './__mocks__/browserMock';

describe('scrollTo', () => {
    beforeAll(() => {
        browserMock.initBrowserMock();
    });

    describe('final position', () => {
        it('should go to element offsetTop', () => {
            const offset = 10;
            const mockEl = {
                offsetTop: offset
            };
            scrollTo({
                element: mockEl,
                duration: 0
            });
            expect(document.documentElement.scrollTop).toEqual(offset);
            expect(document.body.parentNode.scrollTop).toEqual(offset);
            expect(document.body.scrollTop).toEqual(offset);
        });

        it('should default to position if no el', () => {
            const offset = 10;
            scrollTo({
                position: offset,
                duration: 0
            });
            expect(document.documentElement.scrollTop).toEqual(offset);
            expect(document.body.parentNode.scrollTop).toEqual(offset);
            expect(document.body.scrollTop).toEqual(offset);
        });

        it('should not scroll off page', () => {
            // configuring fake browser for viewport height to be less than element top
            browserMock.setBrowserMock({
                window: {
                    innerHeight: 100
                },
                documentElement: {
                    clientHeight: 100
                }
            });
            const expectedVal = 0;
            scrollTo({
                element: {
                    offsetTop: 10
                },
                duration: 0
            });
            expect(document.documentElement.scrollTop).toEqual(expectedVal);
            expect(document.body.parentNode.scrollTop).toEqual(expectedVal);
            expect(document.body.scrollTop).toEqual(expectedVal);
        });
    });

    it('calls requestAnimation frame', () => {
        const totalIterations = 300;
        const requestAnimationSpy = jest.spyOn(window, 'requestAnimationFrame');
        browserMock.resetBrowserMock();

        scrollTo({
            duration: 5000,
            element: {
                offsetTop: 10
            }
        });

        expect(requestAnimationSpy).toHaveBeenCalled();
    });
})