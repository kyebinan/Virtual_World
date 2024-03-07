class GraphEditor{
    constructor(canvas, graph){
        this.canvas = canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext("2d");
        this.selected = null;
        this.horvered = null;

        this.#addEventListeners();
    }

    #addEventListeners(){
        // Event 1 
        this.canvas.addEventListener("mousedown", (evt) => {
            const mouse = new Point(evt.offsetX, evt.offsetY);
            this.horvered = getNearestPoint(mouse, this.graph.points, 10);
            if (this.horvered){
                this.selected = this.horvered;
                return;
            }
            this.graph.addPoint(mouse);
            this.selected = mouse;
        } )

        // Event 2
        this.canvas.addEventListener("mousemove", (evt) => {
            const mouse = new Point(evt.offsetX, evt.offsetY);
            this.horvered = getNearestPoint(mouse, this.graph.points, 10);
            
        } )
    }

    display(){
        this.graph.draw(this.ctx);
        if (this.horvered){
            this.horvered.draw(this.ctx, { fill: true})
        }
        if (this.selected){
            this.selected.draw(this.ctx, { outline: true})
        }
    }
}