import JsonApiModel from './JsonApiModel';
import { ArgumentError } from '../errors';

/**
 * A JSON:API-compliant resource object
 * 
 * @param {Object} resource
 * @param {string} [resource.type]
 * @param {string} [resource.id]
 * @param {Object} [resource.attributes]
 */
export default class JsonApiResource extends JsonApiModel {
    #type;
    #id;
    #attributes;

    constructor( resource ) {
        super();

        if ( resource ) {
            this.#type = resource.type;
            this.#id = resource.id;
            this.#attributes = resource.attributes;
        } else {
            throw new ArgumentError( "Provided resource is invalid." );
        }
    }

    getType() {
        return this.#type;
    }

    getId() {
        return this.#id;
    }

    getAttributes() {
        return this.#attributes;
    }
}