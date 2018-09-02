/*
    This file should be separate and generated.
    Production mode would only output production elements.
    Add build flags for --
*/
window.loadEntry = (entry) => {
    switch (entry) {
        case "wc-test-app":
            return import("./wc-test-app/wc-test-app.js");
        case "wc-test2-app":
            return import("./wc-test2-app/wc-test2-app.js");
        default:
            return Promise.reject(`loadEntry: entry "${entry}" not found`);
    }
};