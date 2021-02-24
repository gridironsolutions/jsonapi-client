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
            if ( ! this._type ) {
                throw new JsonApiArgumentError( "Subclass must specify its type by setting its _type property." );
            }

            if ( resource.type && resource.type !== this._type ) {
                throw new JsonApiArgumentError( "Resource is incompatible with this class" );
            }

            if ( ! resource.id ) {
                throw new JsonApiArgumentError( "Resource must have an id." );
            }

            this.#type = this._type;
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