export class JsonApiClientError extends Error {
    constructor( message, fileName, lineNumber ) {
        super( message, fileName, lineNumber );
        this.name = 'JsonApiClientError';
    }
}