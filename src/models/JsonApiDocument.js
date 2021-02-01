import JsonApiModel from './JsonApiModel';
import JsonApiObject from './JsonApiObject';
import { ArgumentError } from '../errors';

/**
 * A JSON:API-compliant document object
 * 
 * @param {Object} document
 * @param {Object} [document.jsonapi=JsonApiObject.#CURRENT_VERSION]
 * @param {Object|Object[]} [document.data]
 * @param {Object[]} [document.errors]
 * @param {Object} [document.meta]
 * @param {Object} [document.links]
 * @param {Object[]} [document.included]
 */
export default class JsonApiDocument extends JsonApiModel {
    #jsonapi;
    #data;
    #errors;
    #meta;
    #links;
    #included;
    #isValid = false;

    constructor( document ) {
        super();

        if ( ! document ) {
            throw new ArgumentError( "Provided document is invalid." );
        }

        if ( ! document.data && ! document.errors && ! document.meta ) {
            throw new ArgumentError( "Provided document is invalid. It must contain at least one of `data`, `errors`, or `meta`." );
        }

        if ( ! document.data && document.included ) {
            throw new ArgumentError( "Provided document is invalid. `data` must be present if `included` is present." );
        }

        this.#jsonapi = document.jsonapi ? document.jsonapi : new JsonApiObject();
        this.#data = document.data;
        this.#errors = document.errors;
        this.#meta = document.meta;
        this.#links = document.links;
        this.#included = document.included;
        this.#isValid = true;
    }

    getJsonApiObject() {
        return this.#jsonapi;
    }

    getData() {
        return this.#data;
    }

    getErrors() {
        return this.#errors;
    }

    hasErrors() {
        if ( ! this.#errors ) {
            return false;
        }

        return true;
    }

    getMeta() {
        return this.#meta;
    }

    getLinks() {
        return this.#links;
    }

    getIncluded() {
        return this.#included;
    }

    isValid() {
        return this.#isValid;
    }
}