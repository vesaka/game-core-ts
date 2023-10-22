import * as types from './lib/globals/types';

export {};

declare global {
    PROD: 'production';
    DEV: 'development';
    mode: 'development' | 'production'
}
