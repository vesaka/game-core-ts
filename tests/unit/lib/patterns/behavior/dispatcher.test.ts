import { describe, it, expect } from 'vitest';
import Dispatcher from '@/core/lib/patterns/behavior/dispatcher';

class MockHandler {
    constructor(public params: string[]) {}
}

class TestDispatcher extends Dispatcher<MockHandler> {
    createMap() {
        return {
            'mock': MockHandler,
            'default': MockHandler
        };
    }
}

describe('Dispatcher', () => {
    it('should create an instance of Dispatcher', () => {
        const dispatcher = TestDispatcher.instance;
        expect(dispatcher).toBeInstanceOf(TestDispatcher);
    });

    it('should return a handler from the map', () => {
        const dispatcher = new TestDispatcher();
        const handler = dispatcher.get('mock');
        expect(handler).toBe(MockHandler);
    });

    it('should return the default handler if the specified handler is not found', () => {
        const dispatcher = new TestDispatcher();
        const handler = dispatcher.get('nonexistent');
        expect(handler).toBe(MockHandler);
    });

    it('should execute each command with the correct handler', () => {
        const dispatcher = new TestDispatcher();
        const commands = ['mock param1', 'nonexistent param2'];
        const results: MockHandler[] = [];

        dispatcher.each(commands, (instance: MockHandler) => {
            results.push(instance);
        });

        expect(results.length).toBe(2);
        expect(results[0].params).toEqual(['param1']);
        expect(results[1].params).toEqual(['nonexistent', 'param2']);
    });

    it('should return true if some commands pass the callback', () => {
        const dispatcher = new TestDispatcher();
        const commands = ['mock param1', 'nonexistent param2'];

        const result = dispatcher.some(commands, (instance: MockHandler) => {
            return instance.params.includes('param1');
        });

        expect(result).toBe(true);
    });

    it('should return false if no commands pass the callback', () => {
        const dispatcher = new TestDispatcher();
        const commands = ['mock param1', 'nonexistent param2'];

        const result = dispatcher.some(commands, (instance: MockHandler) => {
            return instance.params.includes('param3');
        });

        expect(result).toBe(false);
    });

    it('should return true if every command passes the callback', () => {
        const dispatcher = new TestDispatcher();
        const commands = ['mock param1', 'nonexistent param2'];

        const result = dispatcher.every(commands, (instance: MockHandler) => {
            return instance.params.length > 0;
        });

        expect(result).toBe(true);
    });

    it('should return false if any command fails the callback', () => {
        const dispatcher = new TestDispatcher();
        const commands = ['mock param1', 'nonexistent'];

        const result = dispatcher.every(commands, (instance: MockHandler) => {
            return instance.params.length > 1;
        });

        expect(result).toBe(false);
    });
});