/**
 * Base Model for JSON:API classes
 */
export default class JsonApiModel {
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
}