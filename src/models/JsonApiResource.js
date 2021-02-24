import JsonApiModel from './JsonApiModel';
import UntypedResource from './UntypedResource';
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

    constructor( resource, type = UntypedResource ) {
        super();

        if ( resource ) {
            if ( ! type ) {
                throw new JsonApiArgumentError( "Subclass must provide a 'type' argument." );
            }

            if ( resource.type && resource.type !== type ) {
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
    static from( id, attributes ) {
        if ( ! id ) {
            throw new JsonApiArgumentError( "Must provide valid id." );
        }

        if ( ! attributes ) {
            throw new JsonApiArgumentError( "Must provide valid attributes." );
        }

        return new this({
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