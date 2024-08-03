import Container from '@/core/container';

import { Mesh, Box3, Vector3 } from 'three';

class Model<T = AnyObject> extends Container<T> {
    
    constructor (options: T) {
        super(options);
        let filterMethod;
        for (let attribute in options) {
            filterMethod = `filter_${attribute}`;
            if (typeof this[filterMethod] === 'function') {
                this[attribute] = this[filterMethod](options[attribute]);
            }
        }
        this.model = this.createModel();
        
        this.getRotation()
        return this;
    }
    
    
    set(name: string, value: any) {
        this[name] = value;
        this.model[name] = value;
        return this;
    }
    
    createModel(): Mesh {
        return new Mesh(this.geometry, this.material);
    }
    
    createGeometry() {
        return this.geometry;
    }
    
    createThreeMaterial() {
        return this.material;
    }
    
    getPosition(): Vector3 {
        
        if (!this.position) {
            this.position = new Vector3(0, 0, 0);
        } else if (Array.isArray(this.position)) {
            this.position = new Vector3(this.position[0] || 0, this.position[1] || 0, this.position[2] || 0);
        } else if(typeof this.position === 'object') {
            this.position = new Vector3(this.position.x || 0, this.position.y || 0, this.position.z || 0);
        }      
        
        return this.position;
    }
    
    setNewPosition(x: number, y?: number | null, z?: number | null) {
        
        if (typeof x === 'string') {
            this.body.position[x] = y;
        } else if (typeof x === 'object') {
            for (let p in ['x', 'y', 'z']) {
                if (typeof x[p] === 'number') {
                    this.body.position[p] = x[p];
                }
            }
        } else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' ) {
            this.body.position.set(x, y, z);
        }
        
        this.updatePosition();
    }
    
    getSize(object = null) {
        const box = new Box3().setFromObject(object || this.model);        
        return {
            width: (box.max.x - box.min.x) / 2,
            height: (box.max.y - box.min.y) / 2,
            depth: (box.max.z - box.min.z) / 2
        };
    }
    
    setPosition(x: number = 0, y?: number, z?: number) {
        const py = y || x;
        const pz = z || py;
        this.model.position.set(x, py, pz);
        return this;
    }
    
    setX(value: number): Model {
        this.model.position.x = value;
        return this;
    }
    
    setY(value: number): Model {
        this.model.position.y = value;
        return this;
    }
    
    setZ(value: number): Model {
        this.model.position.y = value;
        return this;
    }
    
    setXY(x: number, y: never): Model {
        this.model.position.x = x;
        this.model.position.y = y;
        return this;
    }
    
    setXZ(x: number, z: number): Model {
        this.model.position.x = x;
        this.model.position.z = z;
        return this;
    }
    
    setYZ(y: number, z: number): Model {
        this.model.position.y = y;
        this.model.position.z = z;
        return this;
    }
    
    setColor(color: string) {
        this.model.material.setColor(color);
    }
    
    setOpacity(opacity: number) {
        this.model.material.opacity = opacity;
    }
    
    setIncrease(props: Array<string>): Model {
        const $props = ['x', 'y', 'z'];
        for (let prop in $props) {
            if (props.hasOwnProperty($props[prop])) {
                this.model.position[$props[prop]] = props[prop];
            }
        }
        return this;
    } 
    
    increaseX(value: number): Model {
        this.model.position.x += value;
        return this;
    }
    
    increaseY(value: number): Model {
        this.model.position.y += value;
        return this;
    }
    
    increaseZ(value: number): Model {
        this.model.position.z += value;
        return this;
    }
    
    getRotation(): Vector3 {
        if (!this.rotation) {
            this.rotation = new Vector3(0, 0, 0);
        }
        
        if (Array.isArray(this.rotation)) {
            this.rotation = new Vector3(this.rotation[0] || 0, this.rotation[1] || 0, this.rotation[2] || 0);
        }        
        
        return this.rotation;
    }
    
    setNewRotation(x: number, y?: number, z?: number) {
        
        if (typeof x === 'string') {
            this.model.rotation[x] = y;
        } else if (typeof x === 'object') {
            for (let p in ['x', 'y', 'z']) {
                if (typeof x[p] === 'number') {
                    this.model.rotation[p] = x[p];
                }
            }
        } else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' ) {
            this.model.rotation.set(x, y, z);
        }
        
    }
    
    setRotation(x: number, y: number, z: number): Model {
        this.model.rotation.set(x, y, z);
        return this;
    }
    
    rotateX(value: number): Model {
        this.model.rotation.x = value;
        return this;
    }
    
    rotateY(value: number): Model {
        this.model.rotation.y = value;
        return this;
    }
    
    rotateZ(value: number): Model {
        this.model.rotation.z = value;
        return this;
    }
    
    rotateXY(x: number, y: number): Model {
        this.model.rotation.x = x;
        this.model.rotation.y = y;
        this.rotation.set(x, y, 0);
        return this;
    }
    
    rotateXZ(x: number, z: number): Model {
        this.model.rotation.x = x;
        this.model.rotation.z = z;
        this.rotation.set(x, 0, z);
        return this;
    }
    
    rotateYZ(y: number, z: number): Model {
        this.model.rotation.y = y;
        this.model.rotation.z = z;
        this.rotation.set(0, y, z);
        return this;
    }
    
    rotationX(value: number): Model {
        this.model.rotation.x += value;
        return this;
    }
    
    rotationY(value: number): Model {
        this.model.rotation.y += value;
        return this;
    }
    
    rotationZ(value: number): Model {
        this.model.rotation.z += value;
        return this;
    }
    
    update() {
        this.model.position.copy(this.body.position);
        return this;
    }
    
    updatePosition() {
        this.model.position.copy(this.body.position);
        return this;
    }
    
    updateQuaternion() {
        this.model.quaternion.copy(this.body.quaternion);
        return this;
    }
    
    updateRotation(props: Vector3D) {
        for(let i in VERTICES_PROPS) {
            const key = VERTICES_PROPS[i] as keyof Vector3D;
            if (props[key]) {
                this.model.rotation[key] = props[key];
            }
        }
    }
    
    
    
    build() {
        
    }
    
    clone() {
        return this.model.clone();
    }
    
    setGuiRotation() {
        for(let i in VERTICES_PROPS) {
            this.gui.add(this.model.rotation, VERTICES_PROPS[i], -2, 2, 0.001);
        }
    }
}

const VERTICES_PROPS = ['x', 'y', 'z'];
Model.prototype.zeroRotation = new Vector3(0,0,0);

export default Model;