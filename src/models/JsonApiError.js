import JsonApiModel from './JsonApiModel';

/**
 * A JSON:API-compliant JSON:API object
 * 
 * @param {Object} jsonApiError
 * @param {string} [jsonApiError.id]
 * @param {Object} [jsonApiError.links]
 * @param {string} [jsonApiError.status]
 * @param {string} [jsonApiError.code]
 * @param {string} [jsonApiError.title]
 * @param {string} [jsonApiError.detail]
 * @param {Object} [jsonApiError.source]
 * @param {Object} [jsonApiError.meta]
 */
export default class JsonApiError extends JsonApiModel {
    #id;
    #links;
    #status;
    #code;
    #title;
    #detail;
    #source;
    #meta;
    
    constructor( jsonApiError ) {
        super();

        this.#id = jsonApiError.id;
        this.#links = jsonApiError.links;
        this.#status = jsonApiError.status;
        this.#code = jsonApiError.code;
        this.#title = jsonApiError.title;
        this.#detail = jsonApiError.detail;
        this.#source = jsonApiError.source;
        this.#meta = jsonApiError.meta;
    }

    getId() {
        return this.#id;
    }

    getLinks() {
        return this.#links;
    }

    getStatus() {
        return this.#status;
    }

    getCode() {
        return this.#code;
    }

    getTitle() {
        return this.#title;
    }

    getDetail() {
        return this.#detail;
    }

    getSource() {
        return this.#source;
    }

    getMeta() {
        return this.#meta;
    }

    toJSON() {
        return {
            id: this.#id,
            links: this.#links,
            status: this.#status,
            code: this.#code,
            title: this.#title,
            detail: this.#detail,
            source: this.#source,
            meta: this.#meta,
        };
    }
}