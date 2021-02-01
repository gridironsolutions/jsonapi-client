/**
 * Base Model for JSON:API classes
 */
export default class JsonApiModel {
    toString() {
        return '[object '.concat( this.constructor.name ).concat( ']' );
    }
}