class GraphEditor{
    constructor(canvas, graph){
        this.canvas = canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext("2d");
        this.mouse = null;
        this.selected = null;
        this.hovered  = null;
        this.dragging = false;

        this.#addEventListeners();
    }

    #addEventListeners(){
        // Event 1 
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));

        // Event 2
        this.canvas.addEventListener("mousemove", (evt) => {
            this.mouse = new Point(evt.offsetX, evt.offsetY);
            this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
            if (this.dragging == true){
                this.selected.x = this.mouse.x;
                this.selected.y = this.mouse.y;
            }
        } );
        // Event 3 
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
        // Event 4 
        this.canvas.addEventListener("mouseup", () => this.dragging = false);
    }

    #handleMouseDown(evt){
        if (evt.button == 2){ //right click
            if (this.selected){
                this.selected = null;
            } else if (this.hovered){
                this.#removePoint(this.hovered);
            }
        }
        if (evt.button == 0){// left click
            if (this.hovered){
                this.#selectPoint(this.hovered);
                this.selected = this.hovered;
                this.dragging = true;
                return;
            }
            this.graph.addPoint(this.mouse);
            this.#selectPoint(this.mouse);
            this.hovered = this.mouse;
        }
    }

    #selectPoint(point){
        if (this.selected){
            this.graph.tryAddSegment(new Segment(this.selected, point));
        }
        this.selected = point;
    }

    #removePoint(point){
        this.graph.removePoint(point);
        this.hovered = null;
        if (this.selected == point){
            this.selected = null;
        }
    }

    display(){
        this.graph.draw(this.ctx);
        if (this.hovered){
            this.hovered.draw(this.ctx, { fill: true})
        }
        if (this.selected){
            const intent = this.hovered ? this.hovered : this.mouse;
            new Segment(this.selected, intent).draw(ctx, {dash: [3,3]});
            this.selected.draw(this.ctx, { outline: true})
        }
    }
}