import JsonApiModel from './JsonApiModel';
import { JsonApiArgumentError } from '../errors';

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
            throw new JsonApiArgumentError( "Provided resource is invalid." );
        }
    }

    /**
     * Build a new JsonApiResource
     * 
     * @param {string} type 
     * @param {string} id 
     * @param {Object} attributes 
     * 
     * @returns {JsonApiResource}
     */
    static from( type, id, attributes ) {
        if ( ! type || ! id || ! attributes ) {
            throw new JsonApiArgumentError( "Must provide valid type, id, and attributes." );
        }

        return new this({
            type,
            id,
            attributes
        });
    }

    toString() {
        let str = '[object '.concat( this.constructor.name );
        let id = '';

        // if this object has an id then prepare to append it to the object's class name
        if ( this.getId() ) {
            id = '#'.concat( this.getId() );
        }

        str = str.concat( id ).concat( ']' );

        return str;
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