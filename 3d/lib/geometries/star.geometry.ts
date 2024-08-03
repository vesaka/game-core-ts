import { BufferGeometry, Float32BufferAttribute } from 'three';
class StarGeometry extends BufferGeometry {

    type: string;
    
    constructor(innerRadius: number = 1, outerRadius: number = 2, points: number = 5, depth: number = 1, thetaStart: number = 0) {
        super();
        
        this.type = 'StarGeometry';        
        const indices = [];
        const vertices = [
            0, 0, depth,
            0, 0, -depth
        ];
        const normals = [
            0, 0, 0,
            0, 0, 0
        ];
        const uvs = [
            0, 0, 0, 1
        ];
        
        const segments = points *2;
        const theta = Math.PI*2 / segments;
        
        for (let i = 0; i <= segments; i++) {
            const radius = 0 === i%2 ? outerRadius : innerRadius;
            const x = Math.cos(thetaStart + theta*i) * radius;
            const y = Math.sin(thetaStart + theta*i) * radius;
            vertices.push(x, y, 0);
    
            normals.push( 
                0, 0, 1
            );
            
            indices.push(
                    0, i + 2, i + 3,
                    1, i + 2, i + 3,
                    i + 3, i + 2, 0,
                    i + 3, i + 2, 1,
            );
    
            uvs.push(1, 1);
    
        }
        

        this.setIndex( indices );
        this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
        this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
        this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );
    }
    

    
}

export default StarGeometry;