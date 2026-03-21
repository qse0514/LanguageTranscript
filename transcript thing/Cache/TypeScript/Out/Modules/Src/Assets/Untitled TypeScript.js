"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriptionComponent = void 0;
var __selfType = requireType("./Untitled TypeScript");
function component(target) {
    target.getTypeName = function () { return __selfType; };
    if (target.prototype.hasOwnProperty("getTypeName"))
        return;
    Object.defineProperty(target.prototype, "getTypeName", {
        value: function () { return __selfType; },
        configurable: true,
        writable: true
    });
}
let TranscriptionComponent = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var TranscriptionComponent = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.vmlModule = this.vmlModule;
            this.transcriptText = this.transcriptText;
            this.internetModule = this.internetModule;
            this.SUPABASE_URL = "https://akfpmfnnmhoatqslpvqt.supabase.co";
            this.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZnBtZm5ubWhvYXRxc2xwdnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMjQyMjQsImV4cCI6MjA4OTcwMDIyNH0.mS4BgmmGY0YQzN7WNqaEw4PofElpcvDzpi8uqleFxTM";
        }
        __initialize() {
            super.__initialize();
            this.vmlModule = this.vmlModule;
            this.transcriptText = this.transcriptText;
            this.internetModule = this.internetModule;
            this.SUPABASE_URL = "https://akfpmfnnmhoatqslpvqt.supabase.co";
            this.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZnBtZm5ubWhvYXRxc2xwdnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMjQyMjQsImV4cCI6MjA4OTcwMDIyNH0.mS4BgmmGY0YQzN7WNqaEw4PofElpcvDzpi8uqleFxTM";
        }
        onAwake() {
            print("Script started on Spectacles!");
            const pollEvent = this.createEvent("UpdateEvent");
            let lastText = "";
            let ticker = 0;
            pollEvent.bind(() => {
                ticker++;
                if (ticker % 3 !== 0)
                    return;
                const req = RemoteServiceHttpRequest.create();
                req.url = `${this.SUPABASE_URL}/rest/v1/transcript?select=text&limit=1`;
                req.method = RemoteServiceHttpRequest.HttpRequestMethod.Get;
                req.setHeader("apikey", this.SUPABASE_ANON_KEY);
                req.setHeader("Authorization", `Bearer ${this.SUPABASE_ANON_KEY}`);
                this.internetModule.performHttpRequest(req, (response) => {
                    const data = JSON.parse(response.body);
                    const text = data[0]?.text ?? "";
                    if (text !== lastText) {
                        lastText = text;
                        this.transcriptText.text = text;
                    }
                });
            });
        }
    };
    __setFunctionName(_classThis, "TranscriptionComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TranscriptionComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TranscriptionComponent = _classThis;
})();
exports.TranscriptionComponent = TranscriptionComponent;
//# sourceMappingURL=Untitled%20TypeScript.js.map