"use strict";
(() => {
var exports = {};
exports.id = 320;
exports.ids = [320];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 9868:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./app/api/prompt/[id]/route.js
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  DELETE: () => (DELETE),
  GET: () => (GET),
  PATCH: () => (PATCH)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(2394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(9513);
// EXTERNAL MODULE: ./models/prompt.js
var models_prompt = __webpack_require__(960);
// EXTERNAL MODULE: ./utils/database.js
var database = __webpack_require__(8400);
;// CONCATENATED MODULE: ./app/api/prompt/[id]/route.js


const GET = async (req, { params })=>{
    try {
        await (0,database/* connectToDB */.P)();
        const prompt = await models_prompt/* default */.Z.findById(params.id).populate("creator");
        if (!prompt) return new Response("Prompt not found", {
            status: 4040
        });
        return new Response(JSON.stringify(prompt, {
            status: 200
        }));
    } catch (error) {
        return new Response("Failed to fetch prompt", {
            status: 500
        });
    }
};
const PATCH = async (request, { params })=>{
    const { prompt, tag } = await request.json();
    try {
        await (0,database/* connectToDB */.P)();
        const existingPrompt = await models_prompt/* default */.Z.findById(params.id);
        if (!existingPrompt) return new Response("Prompt not found", {
            status: 404
        });
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        });
    } catch (error) {
        return new Response("Failed ", {
            status: 500
        });
    }
};
const DELETE = async (request, { params })=>{
    try {
        await (0,database/* connectToDB */.P)();
        await models_prompt/* default */.Z.findByIdAndRemove(params.id);
        return new Response("Prompt deleted sucessfully", {
            status: 200
        });
    } catch (error) {
        return new Response("Failed to delete the post", {
            status: 500
        });
    }
};

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fprompt%2F%5Bid%5D%2Froute&name=app%2Fapi%2Fprompt%2F%5Bid%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Fprompt%2F%5Bid%5D%2Froute.js&appDir=C%3A%5Cschool%5Cleerjaar4%5CDeployment%5Cdeploymentjs%5Cdeploymentjs%5CPS229413.github.io%5CPS229413.github.io%5CPS229413.github.io%5Capp&appPaths=%2Fapi%2Fprompt%2F%5Bid%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/prompt/[id]/route",
        pathname: "/api/prompt/[id]",
        filename: "route",
        bundlePath: "app/api/prompt/[id]/route"
    },
    resolvedPagePath: "C:\\school\\leerjaar4\\Deployment\\deploymentjs\\deploymentjs\\PS229413.github.io\\PS229413.github.io\\PS229413.github.io\\app\\api\\prompt\\[id]\\route.js",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/prompt/[id]/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [478,501,778], () => (__webpack_exec__(9868)));
module.exports = __webpack_exports__;

})();