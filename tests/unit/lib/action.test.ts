import { describe, it, expect, vi } from 'vitest';
import Action from '@/core/lib/action';

describe('Action', () => {
    it('should register a callback for a tag', () => {
        const callback = () => {};
        Action.on('test', callback);
        expect(Action.length('test')).toBe(1);
    });

    it('should emit an event and call the callback', () => {
        const callback = vi.fn();
        Action.on('test', callback);
        Action.emit('test', 'arg1', 'arg2');
        expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should remove callbacks for a tag', () => {
        const callback = () => {};
        Action.on('test', callback);
        Action.off('test');
        expect(Action.length('test')).toBe(0);
    });

    it('should clear all callbacks', () => {
        const callback = () => {};
        Action.on('test1', callback);
        Action.on('test2', callback);
        Action.clear();
        expect(Action.length('test1')).toBe(0);
        expect(Action.length('test2')).toBe(0);
    });

    it('should return the correct length of callbacks for a tag', () => {
        const callback1 = () => {};
        const callback2 = () => {};
        Action.on('test', callback1);
        Action.on('test', callback2);
        expect(Action.length('test')).toBe(2);
    });

    it('should splice callbacks for a tag', () => {
        const callback1 = () => {};
        const callback2 = () => {};
        Action.on('test', callback1);
        Action.on('test', callback2);
        Action.splice('test', 0, 1);
        expect(Action.length('test')).toBe(1);
    });
});
