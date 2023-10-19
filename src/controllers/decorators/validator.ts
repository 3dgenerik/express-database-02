import 'reflect-metadata'
import { AppFeatures } from '../../constants'

export const validator = (keys: string[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, key: string) => {
        Reflect.defineMetadata(AppFeatures.VALIDATOR, [...keys], target, key)
    }
}