class Node 
{ 
    constructor(x,y,r, ctx, data) 
    { 
        this.data = data; 
        this.left = null; 
        this.right = null; 
        this.x = x;
        this.y = y;
        this.r = r;
        this.ctx = ctx;
    }
    
    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI); 
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.strokeText(this.data, this.x, this.y);
    }

    getData(){
        return this.data;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getRadius(){
        return this.r;
    }
    leftCoordinate(x,y,r){
        return {cx: (x - (4*r)), cy: (y + (4*r))};
    }
    rightCoordinate(x,y,r){
        return {cx: (x + (3*r)), cy: (y + (3*r))};
    }
}
class Line {

    draw(x, y, toX, toY, r, ctx) {
      var moveToX = x;
      var moveToY = y + r;
      var lineToX = toX;
      var lineToY = toY - r;
      ctx.beginPath();
      ctx.moveTo(moveToX, moveToY);
      ctx.lineTo(lineToX, lineToY);
      ctx.stroke(); 
    };
} 


class BST
{ 
    constructor() 
    {  
        this.root = null;
        this.c = document.getElementById('my-canvas');
        this.ctx = this.c.getContext('2d');
        this.line = new Line();
    } 

    insert(data) 
    { 
        if(this.root === null){
            this.root = this.createNode(300, 30, 20, this.ctx,data); 
        }    
        else
            this.addNode(this.root, null, null, data); 
    }

    addNode(node, prevNode, coordinateCallback, data) 
    {
        if(node === null) {
            // This is either node.leftCoordinate or node.rightCoordinate
            var xy = coordinateCallback;
            var newNode = this.createNode(xy.cx, xy.cy, 25, prevNode.ctx, data);
            this.line.draw(prevNode.getX(), prevNode.getY(), xy.cx, xy.cy, prevNode.getRadius(), prevNode.ctx);
            return newNode; 
        } 
        else {
            if(data < node.getData()) {
              if(node.left === null){
                var xy = node.leftCoordinate(node.x,node.y,node.r);
                node.left = this.createNode(xy.cx, xy.cy, 25, node.ctx, data);
                this.line.draw(node.getX(), node.getY(), xy.cx, xy.cy, node.getRadius(), node.ctx);
                return;
              }
              else if(node.leftNode !== null){
                return this.addNode(node.left,node,node.leftCoordinate(node.x,node.y,node.r), data);
              }
            }
            else if(data > node.getData()){
              if(node.right === null){
                var xy = node.rightCoordinate(node.x,node.y,node.r);
                node.right = this.createNode(xy.cx, xy.cy, 25, node.ctx, data);
                this.line.draw(node.getX(), node.getY(), xy.cx, xy.cy, node.getRadius(), node.ctx);
                return;
              }
              else if(node.right !== null){
                return this.addNode(node.right,node,node.rightCoordinate(node.x,node.y,node.r), data);
              }
            }
            else {
              return null;
            }
        }
    }


    findMinNode(node) 
    { 
        if(node.left === null) 
            return node; 
        else
            return this.findMinNode(node.left); 
    } 
    
    
    // remove(data) 
    // { 
    //     this.root = this.dropNode(this.root, data); 
    // } 

    // dropNode(node, prevNode, coordinateCallback, data) 
    // { 
    //     if(node === null) 
    //         return null; 
    //     else if(key < node.data) 
    //     { 
    //         node.left = this.dropNode(node.left, key); 
    //         return node; 
    //     } 
    //     else if(key > node.data) 
    //     { 
    //         node.right = this.dropNode(node.right, key); 
    //         return node; 
    //     } 
    //     else
    //     { 
    //         if(node.left === null && node.right === null) 
    //         { 
    //             node = null; 
    //             return node; 
    //         } 
    
    //         if(node.left === null) 
    //         { 
    //             node = node.right; 
    //             return node; 
    //         } 
            
    //         else if(node.right === null) 
    //         { 
    //             node = node.left; 
    //             return node; 
    //         } 
    //         var aux = this.findMinNode(node.right); 
    //         node.data = aux.data; 
    
    //         node.right = this.dropNode(node.right, aux.data); 
    //         return node; 
    //     }
    // }
    createNode(x, y, r, ctx, data) {
        var newNode = new Node(x, y, r, ctx, data);
        newNode.draw();
        return newNode;
      }
}

