/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useMatch, useLocation, useRoutes } from 'react-router-dom';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var Status;
(function (Status) {
    Status[Status["Initial"] = 0] = "Initial";
    Status[Status["Loading"] = 1] = "Loading";
    Status[Status["Loaded"] = 2] = "Loaded";
    Status[Status["Failed"] = 3] = "Failed";
})(Status || (Status = {}));
//# sourceMappingURL=types.js.map

function useManager(_a) {
    // const infoAboutComponent = useRef<InfoAboutComponent>({});
    // if (!infoAboutComponent.current[pathname]) {
    //   infoAboutComponent.current[pathname] = {
    //     resolvers,
    //     guards,
    //     pathname,
    //     props: {},
    //     redirectUrl,
    //   };
    // }
    var guards = _a.guards;
    function evaluateGuards() {
        return __awaiter(this, void 0, void 0, function () {
            var _i, guards_1, guard, canActivate, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, guards_1 = guards;
                        _a.label = 1;
                    case 1:
                        if (!(_i < guards_1.length)) return [3 /*break*/, 6];
                        guard = guards_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, guard.canActivate()];
                    case 3:
                        canActivate = _a.sent();
                        if (!canActivate) {
                            return [2 /*return*/, Status.Failed];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error('Error in guards');
                        console.error(e_1);
                        return [2 /*return*/, Status.Failed];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, Status.Loaded];
                }
            });
        });
    }
    // async function loadResolvers() {
    //   const keys = Object.keys(resolvers).map(resolverKey => resolverKey);
    //   const promises = Object.keys(resolvers).map(resolverKey => resolvers[resolverKey].resolve());
    //   const resultOfResolvers = await Promise.all(promises).catch(e => {
    //     console.error('Error in resolvers');
    //     console.error(e);
    //   });
    //   return (resultOfResolvers as []).reduce((acc, next, index) => {
    //     const key = keys[index];
    //     return { ...acc, [key]: next };
    //   }, {});
    // }
    // function getRedirectUrl(): string | undefined {
    //   if (infoAboutComponent.current[pathname].redirectUrl) {
    //     return infoAboutComponent.current[pathname].redirectUrl as string;
    //   };
    // }
    function getStatusBeforeEvaluating() {
        return guards.length === 0 ? Status.Loaded : Status.Loading;
    }
    return { evaluateGuards: evaluateGuards, getStatusBeforeEvaluating: getStatusBeforeEvaluating };
}
var useLoadingNotification = function (element, fn) {
    // console.log(element, fn);
    element.__notifyLoading = fn;
};
//# sourceMappingURL=hooks.js.map

var RouteHelper = /** @class */ (function () {
    function RouteHelper(element) {
        this.element = element;
        this.guards = [];
    }
    // TODO: Add guards
    // TODO: Add guards tests
    // TODO: Add ability to show loading
    // TODO: Add resolvers
    // TODO: Add resolvers tests
    // TODO: Add something like (useRoutes) with RouteHelper
    // TODO: Add something like (useRoutes) with RouteHelper tests
    // TODO: Add metadata (title)
    // TODO: Add metadata (title) tests
    // TODO: Add lazy loading
    // TODO: Add lazy loading tests
    // TODO: Add server side plug
    // TODO: Add server side plug tests
    // public withResolvers(): void {}
    RouteHelper.prototype.withGuards = function (guards) {
        this.guards = guards;
        return this;
    };
    RouteHelper.prototype.notifyStatusChange = function (status) {
        var notifyFunction = this.element.type['__notifyLoading'];
        if (typeof notifyFunction === 'function') {
            notifyFunction(status);
        }
    };
    RouteHelper.prototype.create = function () {
        var manager = useManager({ guards: this.guards });
        var _a = useState(Status.Initial), status = _a[0], setStatus = _a[1];
        // const path = useResolvedPath('home22');
        var match = useMatch('home/home22');
        var location = useLocation();
        // const evaluateGuards = async () => {
        //   const initialStatus = manager.getStatusBeforeEvaluating();
        //
        //   setStatus(initialStatus);
        //   this.notifyStatusChange(initialStatus);
        //
        //   const guardStatus = await manager.evaluateGuards();
        //
        //   setStatus(guardStatus);
        //   this.notifyStatusChange(initialStatus);
        //   if (status === Status.Failed) {
        //     console.log('Need to do something');
        //   }
        // };
        useEffect(function () {
            console.log('rendered 88');
            //   (async () => {
            //     // console.log(path);
            //     await evaluateGuards();
            //   })();
        }, []);
        // useEffect(() => {
        //   console.log(match);
        // }, [location]);
        if (status == Status.Loading) {
            return React.createElement("h1", null, "loading...");
        }
        if (status == Status.Failed) {
            return React.createElement("h1", null, "failed to load...");
        }
        // if (status == Status.Loaded) {
        return React.createElement(React.Fragment, null, this.element);
    };
    return RouteHelper;
}());

var createWrapperRoute = function (props, element) {
    var helper = new RouteHelper(element);
    if (Array.isArray(props.guards)) {
        helper.withGuards(props.guards);
    }
    return helper.create();
};
var wrapRoutesToHelper = function (routes) {
    return routes.map(function (_a) {
        var element = _a.element, others = __rest(_a, ["element"]);
        var children = Array.isArray(others.children) ? wrapRoutesToHelper(others.children) : [];
        return __assign(__assign({}, others), { element: createWrapperRoute(others, element), children: children });
    });
};
var RouteHelper2 = function (props) {
    return createWrapperRoute(props, props.element);
};
var useRoutesWithHelper = function (routes) {
    return useRoutes(wrapRoutesToHelper(routes));
};

export { RouteHelper, RouteHelper2, Status, useLoadingNotification, useRoutesWithHelper };