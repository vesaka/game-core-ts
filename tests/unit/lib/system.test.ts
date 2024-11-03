import { describe, it, expect } from 'vitest';
import System from '@/core/lib/system';

describe('System', () => {
    it('should create a new instance', () => {
        const system = new System();
        expect(system).toBeDefined();
    });

    it('should have a name property', () => {
        const system = new System();
        expect(system.name).toBeDefined();
    });

    it('should have a setup method', () => {
        const system = new System();
        expect(system.setup).toBeDefined();
        expect(typeof system.setup).toBe('function');
    });

    it('should have a boot method', () => {
        const system = new System();
        expect(system.boot).toBeDefined();
        expect(typeof system.boot).toBe('function');
    });

    it('should have empty name property', () => {
        const system = new System();
        expect(system.name).toBe('');
    });
});