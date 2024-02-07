export class WebGlObjects {
    static getWebGlObjectTag(object) {
        return object[WebGlObjects.SPECTOROBJECTTAGKEY];
    }
    static attachWebGlObjectTag(object, tag) {
        tag.displayText = WebGlObjects.stringifyWebGlObjectTag(tag);
        object[WebGlObjects.SPECTOROBJECTTAGKEY] = tag;
    }
    static stringifyWebGlObjectTag(tag) {
        if (!tag) {
            return "No tag available.";
        }
        return `${tag.typeName} - ID: ${tag.id}`;
    }
}
WebGlObjects.SPECTOROBJECTTAGKEY = "__SPECTOR_Object_TAG";
class BaseWebGlObject {
    constructor() {
        this.id = 0;
    }
    get type() {
        return window[this.typeName] || null;
    }
    tagWebGlObject(webGlObject) {
        if (!this.type) {
            return undefined;
        }
        let tag;
        if (!webGlObject) {
            return tag;
        }
        tag = WebGlObjects.getWebGlObjectTag(webGlObject);
        if (tag) {
            return tag;
        }
        if (webGlObject instanceof this.type) {
            const id = this.getNextId();
            tag = {
                typeName: this.typeName,
                id,
            };
            WebGlObjects.attachWebGlObjectTag(webGlObject, tag);
            return tag;
        }
        return tag;
    }
    getNextId() {
        return this.id++;
    }
}

export default BaseWebGlObject;
