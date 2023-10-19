import 'reflect-metadata';
import { RouteApp } from '../../RouteApp';
import { AppFeatures, AppMethods, AppRoutePaths} from '../../constants';

export const controller = (prefixRoute: AppRoutePaths) => {
    const router = RouteApp.getInstance();
    return (target: Function) => {
        const targetPrototypeNames = Object.getOwnPropertyNames(
            target.prototype,
        );
        for (const key of targetPrototypeNames) {
            const path = Reflect.getMetadata(
                AppFeatures.PATH,
                target.prototype,
                key,
            );
            const method = Reflect.getMetadata(
                AppFeatures.METHOD,
                target.prototype,
                key,
            ) as AppMethods;

            // const validate = Reflect.getMetadata(AppFeatures.VALIDATOR, target.prototype, key) || []

            const middlewares = Reflect.getMetadata(
                AppFeatures.MIDDLEWARE,
                target.prototype,
                key
            ) || []

            if(path && method){
                router[method](`${prefixRoute}${path}`, [...middlewares], target.prototype[key])
            }
        }
    };
};
