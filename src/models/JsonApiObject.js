import JsonApiModel from './JsonApiModel';

/**
 * A JSON:API-compliant JSON:API object
 * 
 * @param {string} [version=JsonApiObject.#CURRENT_VERSION]
 * @param {Object} [meta]
 */
export default class JsonApiObject extends JsonApiModel {
    static #CURRENT_VERSION = '1.0';
    #version;
    #meta;

    constructor( version = JsonApiObject.#CURRENT_VERSION, meta ) {
        super();
        
        this.#version = version;
        this.#meta = meta;
    }

    getVersion() {
        return this.#version;
    }

    getMeta() {
        return this.#meta;
    }

    toJSON() {
        return {
            version: this.#version,
            meta: this.#meta,
        };
    }
}