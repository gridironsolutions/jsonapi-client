import JsonApiResource from './JsonApiResource';

export default class UntypedResource extends JsonApiResource {
    constructor( resource ) {
        super( resource, 'untypedresource' );
    }
}