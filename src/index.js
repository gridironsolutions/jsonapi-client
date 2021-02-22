import log from './utils/logger';
import axios from 'axios';
import JsonApiClientError, { JsonApiArgumentError } from './errors';
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
export default class JsonApiClient {
    #options;
    #baseUrl;

    constructor( options ) {
        //must be provided an options object
        if ( typeof options === 'undefined' ) {
            throw new JsonApiArgumentError( 'an options object must be passed as the first argument' );
        }

        //provided options must be an object
        if ( typeof options !== 'object' ) {
            throw new JsonApiArgumentError( 'first argument must be an object containing valid options' );
        }

        //must be provided a host or there is no API to connect to
        if ( ! options.host ) {
            throw new JsonApiArgumentError( 'no host specified' );
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

    /**
     * Fetch remote object and return it as a JsonApiDocument
     * 
     * @param {string} path 
     * @returns {Promise<JsonApiDocument>}
     */
    async get( path ) {
        let axiosOptions = {};
        this.#options.timeout ? axiosOptions.timeout = this.#options.timeout : 30000;
        if ( this.#options.auth ) {
            axiosOptions.auth = {
                username: this.#options.auth.username,
                password: this.#options.auth.password,
            };
        }
        
        let document = axios.get( this.#baseUrl.concat( path ), axiosOptions )
        .then( ( res ) => {
            let document = new JsonApiDocument( res.data );
            
            return document;
        })
        .catch( ( err ) => {
            if ( err.response ) {
                switch ( err.response.status ) {
                    case 401:
                        log.warn( 'Not authorized.');
                        break;
                    case 404:
                        log.warn( 'Unable to find object.' );
                        break;
                    case 500:
                        log.warn( 'Remote server returned an error.' );
                        break;
                    default:
                        log.warn( 'An unknown error occurred.' );
                        break;
                }
            } else if ( err.message && err.message.toLowerCase().startsWith( "timeout" ) ) {
                log.warn( 'Remote server was unreachable' );
            } else {
                log.warn( 'An unknown error occurred.' );
            }

            log.warn( err.message );
        })
        .finally( () => {
        });

        return document;
    }
}

export {
    JsonApiClient,
    JsonApiModel,
    JsonApiDocument,
    JsonApiObject,
    JsonApiError,
    JsonApiMeta,
    JsonApiResource,
    JsonApiClientError,
    JsonApiArgumentError,
};