import { describe, it, expect, vi } from 'vitest';
import * as util from '@/core/utils/string.util';
describe('string.util', () => {
    describe('ucfirst', () => {
        it('should capitalize the first letter of a string', () => {
            const result = util.ucfirst('hello');
            expect(result).toBe('Hello');
        });

        it('should return an empty string if input is empty', () => {
            const result = util.ucfirst('');
            expect(result).toBe('');
        });

        it('should handle single character strings', () => {
            const result = util.ucfirst('a');
            expect(result).toBe('A');
        });
    });

    describe('camelCase', () => {
        it('should convert a string to camelCase', () => {
            const result = util.camelCase('hello-world');
            expect(result).toBe('helloWorld');
        });

        it('should convert a string with snake case to camelCase', () => {
            const result = util.camelCase('hello_world');
            expect(result).toBe('helloWorld');
        });

        it('should convert a string with PascalCase to camelCase', () => {
            const result = util.camelCase('HelloWorld');
            expect(result).toBe('helloWorld');
        });

        it('should convert a string with kebab-case to camelCase', () => {
            const result = util.camelCase('hello-world');
            expect(result).toBe('helloWorld');
        });

        it('should handle strings with multiple spaces', () => {
            const result = util.camelCase('hello   world');
            expect(result).toBe('helloWorld');
        });

        it('should handle empty strings', () => {
            const result = util.camelCase('');
            expect(result).toBe('');
        });
    });

    describe('kebabCase', () => {
        it('should convert a string to kebab-case', () => {
            const result = util.kebabCase('hello world');
            expect(result).toBe('hello-world');
        });

        it('should handle strings with multiple spaces', () => {
            const result = util.kebabCase('hello   world');
            expect(result).toBe('hello-world');
        });

        it('should handle empty strings', () => {
            const result = util.kebabCase('');
            expect(result).toBe('');
        });
    });

    describe('snakeCase', () => {
        it('should convert a string with whitespaces to snake_case', () => {
            const result = util.snakeCase('hello world');
            expect(result).toBe('hello_world');
        });

        it('should handle strings with extra whitespaces', () => {
            const result = util.snakeCase('hello   world');
            expect(result).toBe('hello_world');
        });

        it('should convert a string with camelCase to snake_case', () => {
            const result = util.snakeCase('helloWorld');
            expect(result).toBe('hello_world');
        });

        it('should handle empty strings', () => {
            const result = util.snakeCase('');
            expect(result).toBe('');
        });
    });

    describe('pascalCase', () => {
        it('should convert a string to PascalCase', () => {
            const result = util.pascalCase('hello world');
            expect(result).toBe('HelloWorld');
        });

        it('should handle strings with multiple spaces', () => {
            const result = util.pascalCase('hello   world');
            expect(result).toBe('HelloWorld');
        });

        it('should convert a string with camelCase to PascalCase', () => {
            const result = util.pascalCase('helloWorld');
            expect(result).toBe('HelloWorld');
        });

        it('should convert kebab case to PascalCase', () => {
            const result = util.pascalCase('hello-world');
            expect(result).toBe('HelloWorld');
        });

        it('should convert snake case to PascalCase', () => {
            const result = util.pascalCase('hello_world');
            expect(result).toBe('HelloWorld');  
        });

        it('should handle empty strings', () => {
            const result = util.pascalCase('');
            expect(result).toBe('');
        });
    });

    describe('pluralize', () => {
        it('should pluralize words correctly', () => {
            const result = util.pluralize('child');
            expect(result).toBe('children');
        });

        it('should pluralize words ending with is', () => {
            const result = util.pluralize('analysis');
            expect(result).toBe('analyses');
        });

        it('should pluralize words ending with us', () => {
            const result = util.pluralize('cactus');
            expect(result).toBe('cacti');
        });

        it('should pluralize words ending with s', () => {
            const result = util.pluralize('dog');
            expect(result).toBe('dogs');
        });

        it('should pluralize words ending with es', () => {
            const result = util.pluralize('analysis');
            expect(result).toBe('analyses');
        });

        it('should pluralize words ending with o', () => {
            const result = util.pluralize('hero');
            expect(result).toBe('heroes');
        });

        it('should pluralize words ending with y', () => {
            const result = util.pluralize('baby');
            expect(result).toBe('babies');
        });

        it('should pluralize words ending with f', () => {
            const result = util.pluralize('wolf');
            expect(result).toBe('wolves');
        });

        it('should pluralize words ending with fe', () => {
            const result = util.pluralize('knife');
            expect(result).toBe('knives');
        });

        it('should pluralize words ending with on', () => {
            const result = util.pluralize('criterion');
            expect(result).toBe('criteria');
        });
    });

    describe('singularize', () => {
        it('should singularize words correctly', () => {
            const result = util.singularize('children');
            expect(result).toBe('child');
        });

        it('should singularize words ending with es', () => {
            const result = util.singularize('analyses');
            expect(result).toBe('analysis');
        });

        it('should singularize words ending with s', () => {
            const result = util.singularize('dogs');
            expect(result).toBe('dog');
        });

        it('should singularize words ending with o', () => {
            const result = util.singularize('heroes');
            expect(result).toBe('hero');
        });

        it('should singularize words ending with y', () => {
            const result = util.singularize('babies');
            expect(result).toBe('baby');
        });

        it('should singularize words ending with ves', () => {
            const result = util.singularize('knives');
            expect(result).toBe('knife');
        });

        it('should singularize words ending with on', () => {
            const result = util.singularize('criteria');
            expect(result).toBe('criterion');
        });
    });
});
