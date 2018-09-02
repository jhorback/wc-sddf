/*
    This file should be separate and generated.
    Production mode would only output production elements.
    Add build flags for --
*/
window.loadEntry = (entry) => {
    switch (entry) {
        case "wc-sddf-app":
            return import("./wc-sddf-app/wc-sddf-app.js");
        case "example-1":
            return import("./example-1-elements/example-1.js");
        case "example-2":
            return import("./example-2-elements/example-2.js");
        case "example-3":
            return import("./example-3-elements/example-3.js");
        default:
            return Promise.reject(`loadEntry: entry "${entry}" not found`);
    }
};