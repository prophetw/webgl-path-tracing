import WebGlConstants from "./webglConstants.js";
class ReadPixelsHelper {
    static isSupportedCombination(type, format, internalFormat) {
        type = type || WebGlConstants.UNSIGNED_BYTE.value;
        format = format || WebGlConstants.RGBA.value;
        if (format !== WebGlConstants.RGB.value &&
            format !== WebGlConstants.RGBA.value) {
            return false;
        }
        if (internalFormat !== WebGlConstants.RGB.value &&
            internalFormat !== WebGlConstants.RGBA.value &&
            internalFormat !== WebGlConstants.RGBA8.value &&
            internalFormat !== WebGlConstants.RGBA16F.value &&
            internalFormat !== WebGlConstants.RGBA32F.value &&
            internalFormat !== WebGlConstants.RGB16F.value &&
            internalFormat !== WebGlConstants.RGB32F.value &&
            internalFormat !== WebGlConstants.R11F_G11F_B10F.value &&
            internalFormat !== WebGlConstants.SRGB8.value &&
            internalFormat !== WebGlConstants.SRGB8_ALPHA8.value) {
            return false;
        }
        return this.isSupportedComponentType(type);
    }
    static readPixels(gl, x, y, width, height, type) {
        gl.getError();
        const size = width * height * 4;
        let pixels;
        if (type === WebGlConstants.UNSIGNED_BYTE.value) {
            pixels = new Uint8Array(size);
        }
        else {
            type = WebGlConstants.FLOAT.value;
            pixels = new Float32Array(size);
        }
        gl.readPixels(x, y, width, height, gl.RGBA, type, pixels);
        const err = gl.getError();
        if (err !== 0) {
            console.error('readpixel error info ', WebGlConstants.stringifyWebGlConstant(err, 'getError'));
            return undefined;
        }
        if (type === WebGlConstants.UNSIGNED_BYTE.value) {
            return pixels;
        }
        const newPixels = new Uint8Array(width * height * 4);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                newPixels[i * width * 4 + j * 4 + 0] = Math.min(Math.max(pixels[i * width * 4 + j * 4 + 0], 0), 1) * 255;
                newPixels[i * width * 4 + j * 4 + 1] = Math.min(Math.max(pixels[i * width * 4 + j * 4 + 1], 0), 1) * 255;
                newPixels[i * width * 4 + j * 4 + 2] = Math.min(Math.max(pixels[i * width * 4 + j * 4 + 2], 0), 1) * 255;
                newPixels[i * width * 4 + j * 4 + 3] = Math.min(Math.max(pixels[i * width * 4 + j * 4 + 3], 0), 1) * 255;
            }
        }
        return newPixels;
    }
    static isSupportedComponentType(type) {
        if (type !== WebGlConstants.UNSIGNED_BYTE.value &&
            type !== WebGlConstants.UNSIGNED_SHORT_4_4_4_4.value &&
            type !== WebGlConstants.UNSIGNED_SHORT_5_5_5_1.value &&
            type !== WebGlConstants.UNSIGNED_SHORT_5_6_5.value &&
            type !== WebGlConstants.HALF_FLOAT.value &&
            type !== WebGlConstants.HALF_FLOAT_OES.value &&
            type !== WebGlConstants.FLOAT.value) {
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=readPixelsHelper.js.map

export default ReadPixelsHelper
