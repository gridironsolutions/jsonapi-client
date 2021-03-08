import JsonApiModel from './JsonApiModel';

/**
 * A JSON:API-compliant JSON:API object
 * 
 * @param {string} [version=1.0]
 * @param {Object} [meta]
 */
export default class JsonApiObject extends JsonApiModel {
    static #CURRENT_VERSION = '1.0';
    #version;
    #meta;

    constructor( version = this.#CURRENT_VERSION, meta ) {
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
}