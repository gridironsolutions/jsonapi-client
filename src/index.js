import log from './utils/logger';
import { ArgumentError } from './errors';
import axios from 'axios';
import JsonApiModel, {
    JsonApiDocument,
    JsonApiObject,
    JsonApiError,
    JsonApiMeta,
    JsonApiResource
} from './models';

/**
 * JSON:API Client
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.host - Remote API host
 * @param {string} [options.https=true] - Is protocol HTTPS or HTTP?
 * @param {number} [options.port=443] - Remote API port
 * @param {string} [options.basepath=] - The root path of the API
 * @param {number} [optoins.timeout=30000] - Client timeout in milliseconds
 */
class JsonApiClient {
    #options;
    #baseUrl;

    constructor( options ) {
        //must be provided an options object
        if ( typeof options === 'undefined' ) {
            throw new ArgumentError( 'an options object must be passed as the first argument' );
        }

        //provided options must be an object
        if ( typeof options !== 'object' ) {
            throw new ArgumentError( 'first argument must be an object containing valid options' );
        }

        //must be provided a host or there is no API to connect to
        if ( ! options.host ) {
            throw new ArgumentError( 'no host specified' );
        }
        
        //set default options and allow to be overridden with provided options
        this.#options = {
            https: true,
            port: 443,
            basePath: '',
            timeout: 30000,
            ...options
        };

        //assemble options into baseUrl
        this.#baseUrl = `${(this.#options.https ? 'https' : 'http')}://${this.#options.host}:${this.#options.port}/${this.#options.basePath}`;
    }

    /**
     * Get client options
     * 
     * @returns {Object}
     */
    getOptions() {
        let options = JSON.parse( JSON.stringify( this.#options ) );

        if ( options.hasOwnProperty( 'auth' ) ) {
            delete options.auth.password;
            options.auth.passwordRedacted = true;
        }

        return options;
    }
}

export default JsonApiClient;
export {
    JsonApiModel,
    JsonApiDocument,
    JsonApiObject,
    JsonApiError,
    JsonApiMeta,
    JsonApiResource
};