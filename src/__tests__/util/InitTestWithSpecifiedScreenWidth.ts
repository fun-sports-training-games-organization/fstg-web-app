// https://stackoverflow.com/questions/56180772/jest-material-ui-correctly-mocking-usemediaquery
const initTestWithSpecifiedScreenWidth = (width: number): { height: number; width: number } => {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width
    });
    window.matchMedia = jest.fn().mockImplementation((query) => {
        return {
            matches: width >= 600,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn()
        };
    });
    const height = Math.round((width * 9) / 16);
    return { width, height };
};

export default initTestWithSpecifiedScreenWidth;
