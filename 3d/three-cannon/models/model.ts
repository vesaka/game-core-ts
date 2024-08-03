import Container from '@/core/container';

import { Mesh, Box3 } from 'three';
import { Body, Box, Vec3, Material } from 'cannon-es';

const HALF_PI = Math.PI / 2;
class Model<T = AnyObject> extends Container<T> {
    
    static defaultMaterial = new Material('physics');

    constructor (options: T) {
        super(options);
        let filterMethod;
        for (let attribute in options) {
            filterMethod = `filter_${attribute}`;
            if (typeof this[filterMethod] === 'function') {
                this[attribute] = this[filterMethod](options[attribute]);
            }
        }
        this.body = this.createBody();
        this.model = this.createModel();
        
        this.getRotation()
        this.model.position.copy(this.body.position);
        return this;
    }
    
    
    set(name: string, value: any) {
        this[name] = value;
        this.model[name] = value;
        this.body[name] = value;
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
    
    createBody(): Body {
        const shape = this.createShape();
        if (!this.body) {
            this.body = new Body({
                mass: 0,
                position: this.getPosition(),
                material: this.createBodyMaterial(),
                shape
            });
        }
        
        this.body.addShape(shape);
        
        return this.body;
    }
    
    createBodyMaterial(): Material { 
        if (this.material) {
            return this.material;
        }
        return new Material('physics');
    }
    
    createShape() {
        if (!this.shape) {
            this.shape = new Box(new Vec3(0, 0, 0));
        }
        
        return this.shape;
    }
    
    getPosition(): Vec3 {
        
        if (!this.position) {
            this.position = new Vec3(0, 0, 0);
        } else if (Array.isArray(this.position)) {
            this.position = new Vec3(this.position[0] || 0, this.position[1] || 0, this.position[2] || 0);
        } else if(typeof this.position === 'object') {
            this.position = new Vec3(this.position.x || 0, this.position.y || 0, this.position.z || 0);
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
    
    setPosition(x = 0, y = 0, z = 0) {
        this.body.position.set(x, y, z);
        this.model.position.copy(this.body.position);
        return this;
    }
    
    setX(value: number): Model {
        this.body.position.x = value;
        this.updatePosition();
        return this;
    }
    
    setY(value: number): Model {
        this.body.position.y = value;
        this.updatePosition();
        return this;
    }
    
    setZ(value: number): Model {
        this.body.position.y = value;
        this.updatePosition();
        return this;
    }
    
    setXY(x: number, y: never): Model {
        this.body.position.x = x;
        this.body.position.y = y;
        this.updatePosition();
        return this;
    }
    
    setXZ(x: number, z: number): Model {
        this.body.position.x = x;
        this.body.position.z = z;
        this.updatePosition();
        return this;
    }
    
    setYZ(y: number, z: number): Model {
        this.body.position.y = y;
        this.body.position.z = z;
        this.updatePosition();
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
                this.body.position[$props[prop]] = props[prop];
            }
        }
        this.updatePosition();
        return this;
    } 
    
    increaseX(value: number): Model {
        this.body.position.x += value;
        this.updatePosition();
        return this;
    }
    
    increaseY(value: number): Model {
        this.body.position.y += value;
        this.updatePosition();
        return this;
    }
    
    increaseZ(value: number): Model {
        this.body.position.z += value;
        this.updatePosition();
        return this;
    }
    
    getRotation(): Vec3 {
        if (!this.rotation) {
            this.rotation = new Vec3(0, 0, 0);
        }
        
        if (Array.isArray(this.rotation)) {
            this.rotation = new Vec3(this.rotation[0] || 0, this.rotation[1] || 0, this.rotation[2] || 0);
        }        
        
        return this.rotation;
    }
    
    setNewRotation(x: number, y?: number, z?: number) {
        
        if (typeof x === 'string') {
            this.body.quaternion[x] = y;
        } else if (typeof x === 'object') {
            for (let p in ['x', 'y', 'z']) {
                if (typeof x[p] === 'number') {
                    this.body.quaternion[p] = x[p];
                }
            }
        } else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' ) {
            this.body.quaternion.set(x, y, z);
        }
        
    }
    
    setRotation(x: number, y: number, z: number): Model {
        this.model.rotation.set(x, y, z);
        this.body.quaternion.setFromAxisAngle(new Vec3(x, y, z), HALF_PI);
        //this.model.quaternion.copy(this.body.quaternion);
        return this;
    }
    
    rotateX(value: number): Model {
        this.model.rotation.x = value;
        this.body.quaternion.setFromAxisAngle(new Vec3(value, 0, 0), HALF_PI);
        return this;
    }
    
    rotateY(value: number): Model {
        this.model.rotation.y = value;
        this.body.quaternion.setFromAxisAngle(new Vec3(0, value, 0), HALF_PI);
        return this;
    }
    
    rotateZ(value: number): Model {
        this.model.rotation.z = value;
        this.body.quaternion.setFromAxisAngle(new Vec3(0, 0, value), HALF_PI);
        return this;
    }
    
    rotateXY(x: number, y: number): Model {
        this.model.rotation.x = x;
        this.model.rotation.y = y;
        this.rotation.set(x, y, 0);
        this.body.quaternion.setFromAxisAngle(this.rotation, HALF_PI);
        return this;
    }
    
    rotateXZ(x: number, z: number): Model {
        this.model.rotation.x = x;
        this.model.rotation.z = z;
        this.rotation.set(x, 0, z);
        this.body.quaternion.setFromAxisAngle(this.rotation, HALF_PI);
        return this;
    }
    
    rotateYZ(y: number, z: number): Model {
        this.model.rotation.y = y;
        this.model.rotation.z = z;
        this.rotation.set(0, y, z);
        this.body.quaternion.setFromAxisAngle(this.rotation, HALF_PI);
        return this;
    }
    
    rotationX(value: number): Model {
        this.model.rotation.x += value;
        this.body.quaternion.setFromAxisAngle(new Vec3(this.model.rotation.x, 0, 0), HALF_PI);
        return this;
    }
    
    rotationY(value: number): Model {
        this.model.rotation.y += value;
        this.body.quaternion.setFromAxisAngle(new Vec3(0, this.model.rotation.y, 0), HALF_PI);
        return this;
    }
    
    rotationZ(value: number): Model {
        this.model.rotation.z += value;
        this.body.quaternion.setFromAxisAngle(new Vec3(0, 0, this.model.rotation.z), HALF_PI);
        return this;
    }
    
    update() {
        this.model.position.copy(this.body.position);
        this.model.quaternion.copy(this.body.quaternion);
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
        this.body.quaternion.setFromAxisAngle(new Vec3(this.model.rotation.x, this.model.rotation.y, this.model.rotation.z), HALF_PI);
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
Model.prototype.zeroRotation = new Vec3(0,0,0);

export default Model;