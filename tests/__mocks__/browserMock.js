const defaultDocEl = {
    clientHeight: 50,
    scrollHeight: 100,
    offsetHeight: 100
}
const defaultBodyEl = {
    scrollHeight: 100,
    offsetHeight: 100,
    parentNode: {
        scrollTop: 0
    }
}
const defaultInnerHeight = 50;

const initBrowserMock = jest.fn(() => {
    global.window.innerHeight = defaultInnerHeight;

    Object.defineProperty(global.document, 'documentElement', {
        value: defaultDocEl,
        writable: true
    });
    Object.defineProperty(global.document, 'body', {
        value: defaultBodyEl,
        writable: true
    });
});

const setBrowserMock = jest.fn(overrides => {
    if (overrides.window) {
        global.window = {...global.window, ...overrides.window};
    }

    if (overrides.documentElement) {
        global.document.documentElement = {
            ...global.document.documentElement,
            ...overrides.documentElement
        };
    }

    if (overrides.body) {
        global.document.body = {
            ...global.document.body,
            ...overrides.body
        }
    }
})

const resetBrowserMock = jest.fn(() => {
    global.window.innerHeight = defaultInnerHeight;
    global.document.documentElement = defaultDocEl;
    global.document.body = defaultBodyEl;
})

module.exports = {
    initBrowserMock,
    setBrowserMock,
    resetBrowserMock
};