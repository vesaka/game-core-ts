import { fixed } from '@/core/utils/math.util';

class Grid {

    protected width: number = 100;
    protected height: number = 100;
    protected rows: number = 5;
    protected columns: number = 5;
    protected slots: Slots2dMap = {};
    protected count: number = 0;
    protected offset: Vector2D = {
        x: 0,
        y: 0
    };

    constructor(options: GridOptions) {
        this.width = options.size.width ;
        this.height = options.size.height;
        this.rows = options.rows;
        this.columns = options.columns;

        this.count = this.rows * this.columns;

        if (typeof options.offset === 'number') {
            this.offset = {
                x: options.offset,
                y: options.offset
            };
        } else if (typeof options.offset === 'object') {
            this.offset = options.offset;
        }
        
        this.width -= this.offset.x * 2;
        this.height -= this.offset.y * 2;
        this.generateSlots();
        return this;
    }

    generateSlots() {
        const {rows, columns, width, height, offset} = this;
        const cellWidth = fixed(width / columns);
        const cellHeight = fixed(height / rows);
        
        for (let x = 0; x < rows; x++) {
            if (!this.slots[x]) {
                this.slots[x] = {};
            }
            
            for (let y = 0; y < columns; y++) {
                this.slots[x][y] = {
                    x, y,
                    ax: offset.x + fixed(y * cellWidth), ay: offset.y + fixed(x * cellHeight),
                    bx: offset.x + fixed((y + 1) * cellWidth), by: offset.y + fixed(x * cellHeight),
                    cx: offset.x + fixed(y * cellWidth), cy: offset.y + fixed((x + 1) * cellHeight),
                    dx: offset.x + fixed((y + 1) * cellWidth), dy: offset.y + fixed((x + 1) * cellHeight),
                    width: cellWidth,
                    height: cellHeight,
                    available: true,
                    locked: false
                };
            }
        }
    }

    bookSlot(x: number, y: NumberOr<null> = null) {
        if (!y) {
            x = x % this.columns;
            y = Math.floor(x / this.columns);
        }

        if (this.slots[x][y]) {
            this.slots[x][y].available = false;
        }

        return this;
    }

    releaseSlot(x: number, y: NumberOr<null> = null) {
        if (!y) {
            x = x % this.columns;
            y = Math.floor(x / this.columns);
        }
        if (this.slots[x][y]) {
            this.slots[x][y].available = true;
        }

        return this;
    }

    eachSlot(callback: Function) {
        const {slots} = this;
        for (let x in slots) {
            for (let y in slots[x]) {
                callback(slots[x][y], x, y);
            }
        }
    }

    eachEdgeSlot(callback: Function) {
        const {slots, rows, columns} = this;
        const [lastX, lastY] = [rows - 1, columns - 1];
        for (let x = 0; x < rows; x++) {
            callback(slots[x][0]);
        }
        
        for (let y = 1; y < columns; y++) {
            callback(slots[rows-1][y]);
        }

        for (let x = lastX-1; x >= 0; x--) {
            callback(slots[x][columns-1]);
        }

        for (let y = lastY-1; y > 0; y--) {
            callback(slots[0][y]);
        }
    }

    firstSlot(callback: Function) {
        const {slots} = this;
        let result;

        for (let x in slots) {
            for (let y in slots[x]) {
                result = callback(slots[x][y]);
                if (true === result) {
                    return slots[x][y];
                }
            }
        }

        return null;
    }

    findSlotByPoint(point: Vector2D) {
        const {x, y} = point;
        let result = null;
        this.eachSlot((slot: Slot) => {
            if (x >= slot.ax && x <= slot.bx && y >= slot.ay && y <= slot.cy) {
                result = slot;
                return true;
            }
        });

        return result;
    }
    
    countAvailableSlots() {
        let freeSlots = 0;
        this.eachSlot(({available, locked}: Slot) => {
            freeSlots += Number(true === available && false === locked);
        });
        return freeSlots;
    }

    filterSlots(callback: Function) {
        const slots: Array<Slot> = [];
        this.eachSlot((slot: Slot) => {
            if (true === callback(slot)) {
                slots.push(slot);
            }
        });
        return slots;
    }

    get total() {
        return this.rows * this.columns;
    }

    get slotSize() {
        const { width, height } = this.slots[0][0];
        return { width, height };
    }

}

export default Grid;