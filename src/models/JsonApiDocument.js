import JsonApiModel from './JsonApiModel';
import JsonApiObject from './JsonApiObject';
import UntypedResource from './UntypedResource';
import { JsonApiArgumentError } from '../errors';
import JsonApiError from './JsonApiError';

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
 * @param {Object} [model=UntypedResource]
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
    #resourceType;

    constructor( document, model = UntypedResource ) {
        super();

        if ( ! document ) {
            throw new JsonApiArgumentError( "Provided document is invalid." );
        }

        if ( ! document.data && ! document.errors && ! document.meta ) {
            throw new JsonApiArgumentError( "Provided document is invalid. It must contain at least one of `data`, `errors`, or `meta`." );
        }

        if ( ! document.data && document.included ) {
            throw new JsonApiArgumentError( "Provided document is invalid. `data` must be present if `included` is present." );
        }

        this.#jsonapi = document.jsonapi ? document.jsonapi : new JsonApiObject();
        this.#data = document.data;
        this.#errors = document.errors;
        this.#meta = document.meta;
        this.#links = document.links;
        this.#included = document.included;
        this.#isValid = true;
        this.#deserialize( model );
        this.#resourceType = model.name;
    }

    getJsonApiObject() {
        return this.#jsonapi;
    }

    getData() {
        return this.#data;
    }

    getFirstError() {
        if ( Array.isArray( this.#errors ) && this.#errors.length > 0 ) {
            return this.#errors[0];
        }

        return null;
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

    getResourceType() {
        return this.#resourceType;
    }

    #deserialize( model = UntypedResource ) {
        if ( ! this.#errors && this.#data && ! this.#_deserialized ) {
            if ( Array.isArray( this.#data ) ) {
                this.#resources = this.#data.map( ( element ) => {
                    let resource;

                    resource = new model( element );

                    return resource;
                });
            } else {
                this.#resources = new model( this.#data );
            }

            this.#_deserialized = true;
        }

        return;
    }

    toJSON() {
        return {
            jsonapi: this.#jsonapi,
            data: this.#data,
            errors: this.#errors,
            meta: this.#meta,
            links: this.#links,
            included: this.#included,
        };
    }
}