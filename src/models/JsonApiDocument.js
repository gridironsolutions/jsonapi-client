import JsonApiModel from './JsonApiModel';
import JsonApiObject from './JsonApiObject';
import { ArgumentError } from '../errors';
import { JsonApiResource } from '.';

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
 * @param {Object} [model=JsonApiResource]
 */
export default class JsonApiDocument extends JsonApiModel {
    #jsonapi;
    #data;
    #errors;
    #meta;
    #links;
    #included;
    #isValid = false;
    #_deserialized = false;
    #resources;

    constructor( document, model = JsonApiResource ) {
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
        this.#deserialize( model );
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

    getResources() {
        return this.#resources;
    }

    #deserialize( model = JsonApiResource ) {
        if ( ! this.#errors && this.#data && ! this.#_deserialized ) {
            if ( Array.isArray( this.#data ) ) {
                this.#resources = this.#data.map( ( element ) => {
                    let resource;

                    if ( model ) {
                        resource = new model( element );
                    } else {
                        resource = new JsonApiResource( element );
                    }

                    return resource;
                });
            } else {
                if ( model ) {
                    this.#resources = new model( this.#data );
                } else {
                    this.#resources = new JsonApiResource( this.#data );
                }
            }

            this.#_deserialized = true;
        }

        return;
    }
}