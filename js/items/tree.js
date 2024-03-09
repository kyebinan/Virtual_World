class Tree{
    constructor(center, size, heightCoef = 0.3 ){
        this.center = center;
        this.size = size; // size of the base
        this.heightCoef = heightCoef;
    }

    draw(ctx, viewPoint){
        const diff = subtract(this.center, viewPoint)
        this.center.draw(ctx, {size: this.size, color:"green"})

        const top = add(this.center, scale(diff, this.heightCoef));
        new Segment(this.center, top).draw(ctx);
    }
}