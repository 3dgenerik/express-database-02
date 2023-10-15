export const enum AppMethods {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put'

}

export const enum AppFeatures {
    PATH = 'path',
    METHOD = 'method',
    VALIDATOR = 'validator',
    MIDDLEWARE = 'middleware',
}

export const enum AppRoutePaths {
    CONTROLLER = '/api',
    ENDPOINTS = '/books',
}

export interface IBody {
    id?: number,
    name: string,
    author: string,
    
}
