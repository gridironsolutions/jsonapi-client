import JsonApiModel from './JsonApiModel';
import JsonApiDocument from './JsonApiDocument';
import JsonApiClientError, { JsonApiArgumentError } from '../errors';

/**
 * A JSON:API-compliant resource object
 * 
 * @param {Object} resource
 * @param {string} [resource.type]
 * @param {string} [resource.id]
 * @param {Object} [resource.attributes]
 * @param {Object[]} [resource.included]
 */
export default class JsonApiResource extends JsonApiModel {
    #type;
    #id;
    #attributes;
    #included;

    constructor( resource ) {
        super();

        if ( resource ) {
            if ( ! this.constructor.type ) {
                throw new JsonApiArgumentError( "Implementing class must set a 'type' property." );
            }

            if ( resource.type && resource.type !== this.constructor.type ) {
                throw new JsonApiArgumentError( `Resource with type '${resource.type}' is incompatible with this '${this.constructor.type}' resource.` );
            }

            if ( ! resource.id ) {
                throw new JsonApiArgumentError( "Resource must have an id." );
            }

            this.#type = this.constructor.type;
            this.#id = resource.id;
            this.#attributes = resource.attributes;
            this.#included = resource.included;
        } else {
            throw new JsonApiArgumentError( "Provided resource is invalid." );
        }
    }

    /**
     * Build a new JsonApiResource from id, attributes, and included
     * 
     * @param {string} id 
     * @param {Object} attributes 
     * @param {Object[]} included 
     * 
     * @returns {JsonApiResource}
     */
    static from( id, attributes, included ) {
        if ( ! this.type ) {
            throw new JsonApiClientError( `'${this.name}' class does not define a static 'type'.` );
        }

        if ( ! id ) {
            throw new JsonApiArgumentError( "Must provide valid id." );
        }

        if ( ! attributes ) {
            throw new JsonApiArgumentError( `Must provide valid attributes for '${id}'.` );
        }

        return new this({
            type: this.type,
            id,
            attributes,
            included,
        });
    }

    /**
     * Build a new JsonApiResource from an array of objects with id, attributes, and included properties
     * 
     * @param {Object[]} [resources]
     * @param {string} resources[].id 
     * @param {Object} resources[].attributes 
     * @param {Object[]} included 
     * 
     * @returns {JsonApiResource}
     */
    static fromMultiple( resources ) {
        const typedResources = [];

        if ( ! this.type ) {
            throw new JsonApiClientError( `'${this.name}' class does not define a static 'type'.` );
        }

        if ( ! resources || ! Array.isArray( resources ) || resources?.length === 0 ) {
            throw new JsonApiClientError( "Must provide array of resources." );
        }

        for ( let i = 0; i < resources?.length; i++ ) {
            let resource = resources?.[i];

            if ( ! resource?.id ) {
                throw new JsonApiArgumentError( "Must provide valid id." );
            }
    
            if ( ! resource?.attributes ) {
                throw new JsonApiArgumentError( `Must provide valid attributes for '${resource?.id}'.` );
            }    

            let typedResource = new this({
                type: this.type,
                id: resource?.id,
                attributes: resource?.attributes,
                included: resource?.included,
            });

            if ( typedResource ) {
                typedResources.push( typedResource );
            } else {
                throw new JsonApiClientError( "An unknown error occurred." );
            }
        }

        return typedResources;
    }

    /**
     * Wrap this resource in a JsonApiDocument
     * 
     * @returns {JsonApiDocument}
     */
    toJsonApiDocument() {
        let document = new JsonApiDocument({
            data: {
                type: this.constructor.type,
                id: this.#id,
                attributes: this.#attributes,
                included: this.#included,
            }
        }, this.constructor );

        return document;
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

    getIncluded() {
        return this.#included;
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

    toJSON() {
        return {
            type: this.#type,
            id: this.#id,
            attributes: this.#attributes,
            included: this.#included,
        };
    }
}