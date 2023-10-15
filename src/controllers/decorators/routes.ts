import 'reflect-metadata';
import { AppFeatures, AppMethods } from '../../constants';

const routesWrapes = (method: AppMethods) => {
    return (path: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (target: any, key: string) => {
            Reflect.defineMetadata(AppFeatures.PATH, path, target, key);
            Reflect.defineMetadata(AppFeatures.METHOD, method, target, key);
        };
    };
};

export const get = routesWrapes(AppMethods.GET);
export const post = routesWrapes(AppMethods.POST);
export const del = routesWrapes(AppMethods.DELETE);
export const put = routesWrapes(AppMethods.PUT);
