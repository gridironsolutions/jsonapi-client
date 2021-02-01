import JsonApiClientError from './JsonApiClientError';

export default class JsonApiArgumentError extends JsonApiClientError {
    constructor( message, fileName, lineNumber ) {
        super( message, fileName, lineNumber );
        this.name = "JsonApiArgumentError";
    }
}