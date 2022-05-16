<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [JsonApiClient][1]
    -   [Parameters][2]
    -   [getOptions][3]
    -   [get][4]
        -   [Parameters][5]
    -   [patch][6]
        -   [Parameters][7]
    -   [patchMultiple][8]
        -   [Parameters][9]
-   [JsonApiDocument][10]
    -   [Parameters][11]
-   [JsonApiError][12]
    -   [Parameters][13]
-   [JsonApiMeta][14]
-   [JsonApiModel][15]
-   [JsonApiObject][16]
    -   [Parameters][17]
-   [JsonApiResource][18]
    -   [Parameters][19]
    -   [toJsonApiDocument][20]
    -   [from][21]
        -   [Parameters][22]
    -   [fromMultiple][23]
        -   [Parameters][24]

## JsonApiClient

JSON:API Client

### Parameters

-   `options` **[Object][25]** Configuration options
    -   `options.host` **[string][26]** Remote API host
    -   `options.https` **[string][26]** Is protocol HTTPS or HTTP? (optional, default `true`)
    -   `options.port` **[number][27]** Remote API port (optional, default `443`)
    -   `options.basepath` **[string][26]?** The root path of the API
    -   `options.debug` **[boolean][28]** Enable debugging (optional, default `false`)

### getOptions

Get client options

Returns **[Object][25]** 

### get

Fetch remote object and return it as a JsonApiDocument

#### Parameters

-   `path` **[string][26]** 
-   `model` **[Object][25]**  (optional, default `UntypedResource`)

Returns **[Promise][29]&lt;[JsonApiDocument][30]>** 

### patch

Update remote object

#### Parameters

-   `path` **[string][26]** 
-   `resource` **[Object][25]** 

### patchMultiple

Update remote objects

#### Parameters

-   `path` **[string][26]** 
-   `resources` **[Array][31]&lt;[Object][25]>** 
-   `model` **[Object][25]**  (optional, default `UntypedResource`)

## JsonApiDocument

**Extends JsonApiModel**

A JSON:API-compliant document object

### Parameters

-   `document` **[Object][25]** 
    -   `document.jsonapi` **[Object][25]**  (optional, default `JsonApiObject.#CURRENT_VERSION`)
    -   `document.data` **([Object][25] \| [Array][31]&lt;[Object][25]>)?** 
    -   `document.errors` **[Array][31]&lt;[Object][25]>?** 
    -   `document.meta` **[Object][25]?** 
    -   `document.links` **[Object][25]?** 
    -   `document.included` **[Array][31]&lt;[Object][25]>?** 
-   `model` **[Object][25]**  (optional, default `UntypedResource`)

## JsonApiError

**Extends JsonApiModel**

A JSON:API-compliant JSON:API object

### Parameters

-   `jsonApiError` **[Object][25]** 
    -   `jsonApiError.id` **[string][26]?** 
    -   `jsonApiError.links` **[Object][25]?** 
    -   `jsonApiError.status` **[string][26]?** 
    -   `jsonApiError.code` **[string][26]?** 
    -   `jsonApiError.title` **[string][26]?** 
    -   `jsonApiError.detail` **[string][26]?** 
    -   `jsonApiError.source` **[Object][25]?** 
    -   `jsonApiError.meta` **[Object][25]?** 

## JsonApiMeta

**Extends JsonApiModel**

A JSON:API-compliant meta object

## JsonApiModel

Base Model for JSON:API classes

## JsonApiObject

**Extends JsonApiModel**

A JSON:API-compliant JSON:API object

### Parameters

-   `version` **[string][26]**  (optional, default `JsonApiObject.#CURRENT_VERSION`)
-   `meta` **[Object][25]?** 

## JsonApiResource

**Extends JsonApiModel**

A JSON:API-compliant resource object

### Parameters

-   `resource` **[Object][25]** 
    -   `resource.type` **[string][26]?** 
    -   `resource.id` **[string][26]?** 
    -   `resource.attributes` **[Object][25]?** 
    -   `resource.included` **[Array][31]&lt;[Object][25]>?** 

### toJsonApiDocument

Wrap this resource in a JsonApiDocument

Returns **[JsonApiDocument][30]** 

### from

Build a new JsonApiResource from id, attributes, and included

#### Parameters

-   `id` **[string][26]** 
-   `attributes` **[Object][25]** 
-   `included` **[Array][31]&lt;[Object][25]>** 

Returns **[JsonApiResource][32]** 

### fromMultiple

Build a new JsonApiResource from an array of objects with id, attributes, and included properties

#### Parameters

-   `resources` **[Array][31]&lt;[Object][25]>?** 
    -   `resources[].id` **[string][26]** 
    -   `resources[].attributes` **[Object][25]** 
-   `included` **[Array][31]&lt;[Object][25]>** 

Returns **[JsonApiResource][32]** 

[1]: #jsonapiclient

[2]: #parameters

[3]: #getoptions

[4]: #get

[5]: #parameters-1

[6]: #patch

[7]: #parameters-2

[8]: #patchmultiple

[9]: #parameters-3

[10]: #jsonapidocument

[11]: #parameters-4

[12]: #jsonapierror

[13]: #parameters-5

[14]: #jsonapimeta

[15]: #jsonapimodel

[16]: #jsonapiobject

[17]: #parameters-6

[18]: #jsonapiresource

[19]: #parameters-7

[20]: #tojsonapidocument

[21]: #from

[22]: #parameters-8

[23]: #frommultiple

[24]: #parameters-9

[25]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[26]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[27]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[28]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[29]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[30]: #jsonapidocument

[31]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[32]: #jsonapiresource
