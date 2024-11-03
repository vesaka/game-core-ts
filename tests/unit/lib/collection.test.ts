import { describe, it, expect, beforeEach } from 'vitest';
import Collection from '@/core/lib/collection';

interface IBook {
    getTitle(): string;
    getAuthor(): string;
}
class Book implements IBook {
    protected title: string;
    protected author: string;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }
}

describe('Collection', () => {
    let collection: Collection;
    const seed = () => {
        collection.setup({
            def: { key: 'item1' },
            types: { 
                book: {
                    title: 'Book Title',
                    author: 'Book Author'
                },
                magazine: {
                    title: 'Magazine Title',
                    publisher: 'Magazine Publisher'
                },
                document: {
                    title: 'Document Title',
                    issuer: 'Document Issuer'
                }
            }
        });

        collection.buildItems();
    }
    beforeEach(() => {
        collection = new Collection<KeyAttributeConfig,IBook>();
        collection.setCatalogue({
            book: Book
        });
    })
    it('should initialize with default values', () => {
        expect(collection.all()).toEqual([]);
        expect(collection.count()).toBe(0);
    });

    it('should add items to the collection', () => {
        collection.add({ key: 'item1' });
        expect(collection.count()).toBe(1);
        expect(collection.get(0)).toEqual({ key: 'item1' });
    });

    it('should remove items from the collection', () => {
        collection.add({ key: 'item1' });
        collection.add({ key: 'item2' });
        collection.remove(0);
        expect(collection.count()).toBe(1);
        expect(collection.get(0)).toEqual({ key: 'item2' });
    });

    it('should find an item by condition', () => {
        collection.add({ key: 'item1', value: 10 });
        collection.add({ key: 'item2', value: 20 });
        const item = collection.find((item: any) => item.value === 20);
        expect(item).toEqual({ key: 'item2', value: 20 });
    });

    it('should calculate the sum of a property', () => {
        collection.add({ key: 'item1', value: 10 });
        collection.add({ key: 'item2', value: 20 });
        const sum = collection.sum('value');
        expect(sum).toBe(30);
    });

    it('should return unique items based on a property', () => {
        collection.add({ key: 'item1', value: 10 });
        collection.add({ key: 'item2', value: 20 });
        collection.add({ key: 'item3', value: 10 });
        const uniqueItems = collection.unique('value');
        expect(uniqueItems).toEqual([10, 20]);
    });

    it('should shuffle items in the collection', () => {
        collection.add({ key: 'item1' });
        collection.add({ key: 'item2' });
        collection.add({ key: 'item3' });
        const originalItems = collection.all().slice();
        collection.shuffle();
        let shuffled = originalItems.reduce((acc: boolean, item: any, index: number) => {
            return acc && item === collection.find((item: any) => item.key === originalItems[index].key);
        }, true);
 
        expect(shuffled).toBe(true);
    });

    it('should clear all items in the collection', () => {
        collection.add({ key: 'item1' });
        collection.add({ key: 'item2' });
        collection.clear();
        expect(collection.count()).toBe(0);
    });

    it('should return the first item in the collection', () => {
        collection.add({ key: 'item1' });
        collection.add({ key: 'item2' });
        const firstItem = collection.first();
        expect(firstItem).toEqual({ key: 'item1' });
    });

    it('should return the first item by given condition', () => {
        collection.add({ key: 'item1', value: 10 });
        collection.add({ key: 'item2', value: 20 });
        const firstItem = collection.first((item: any) => item.value === 20);
        expect(firstItem).toEqual({ key: 'item2', value: 20 });
    });

    it('should count items by given condition', () => {
        collection.add({ key: 'item1', value: 10 });
        collection.add({ key: 'item2', value: 20 });
        const count = collection.count((item: any) => item.value > 10);
        expect(count).toBe(1);
    });

    it('should setup items in the collection', () => {
        collection.setup([{ key: 'item1' }, { key: 'item2' }]);
        expect(collection.count()).toBe(2);
    })

    it('should build items by given default config and types', () => {
        seed();
        expect(collection.count()).toBe(3);
        expect(collection.count((item: any) => !item.key)).toBe(3);
    })

    it('should caculumate the average of a property', () => {
        collection.add({ key: 'item1', value: 10 });
        collection.add({ key: 'item2', value: 20 });
        const average = collection.average('value');
        expect(average).toBe(15);
    });

    it('should find the minimum value of a property', () => {
        collection.add({ key: 'item1', value: 10 });
        collection.add({ key: 'item2', value: 20 });
        collection.add({ key: 'item3', value: 5 });
        const min = collection.min('value');
        expect(min).toBe(5);
    });

    it('should find the maximum value of a property', () => {
        collection.add({ key: 'item1', value: 10 });
        collection.add({ key: 'item2', value: 20 });
        collection.add({ key: 'item3', value: 5 });
        const max = collection.max('value');
        expect(max).toBe(20);
    });

    it ('should return null if no item is found when looking for minimum value', () => {
        const item = collection.min('value');
        expect(item).toBeNull();
    });

    it ('should return null if no item is found when looking for maximum value', () => {
        const item = collection.max('value');
        expect(item).toBeNull();
    });

    it ('should slice the collection', () => {
        collection.add({ key: 'item1' });
        collection.add({ key: 'item2' });
        collection.add({ key: 'item3' });
        collection.add({ key: 'item4' });
        const sliced = collection.slice(1, 3);
        expect(sliced.count()).toBe(2);
    });
 

});
