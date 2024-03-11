class CrossingEditor{
    constructor(viewport, world){
        this.viewport = viewport;
        this.world = world;

        this.canvas = viewport.canvas;
        this.ctx = this.canvas.getContext("2d");

        this.mouse = null;
        this.intent = null;

        this.markings = world.markings;
    }

    enable(){
        this.#addEventListeners();
    }

    disable(){
        this.#removeEventListeners();
    }

    #addEventListeners(){
        this.boundMouseDown = this.#handleMouseDown.bind(this);
        this.boundMouseMove = this.#handleMouseMove.bind(this);
        this.boundContextMenu = (evt) => evt.preventDefault();
        // Event 1 
        this.canvas.addEventListener("mousedown", this.boundMouseDown);
        // Event 2
        this.canvas.addEventListener("mousemove", this.boundMouseMove);
        // Event 3 
        this.canvas.addEventListener("contextmenu", this.boundContextMenu);
        
    }

    #removeEventListeners(){
        // Event 1 
        this.canvas.removeEventListener("mousedown", this.boundMouseDown);
        // Event 2
        this.canvas.removeEventListener("mousemove", this.boundMouseMove);
        // Event 3
        this.canvas.removeEventListener("contextmenu", this.boundContextMenu);
        
    }

    #handleMouseMove(evt){
        this.mouse = this.viewport.getMouse(evt, true);
        const seg = getNearestSegment(
            this.mouse, 
            this.world.graph.segments, 
            10 * this.viewport.zoom
        );
        if (seg){
            const proj = seg.projectPoint(this.mouse);
            if (proj.offset >= 0 && proj.offset <= 1){
                this.intent = new Crossing(
                    proj.point,
                    seg.directionVector(),
                    this.world.roadWidth ,
                    this.world.roadWidth / 2 
                );
            } else {
                this.intent = null;
            }
        } else {
            this.intent = null;
        }
    }

    #handleMouseDown(evt){
        if (evt.button == 0){
            if (this.intent){
                this.markings.push(this.intent)
            }
        }
        if (evt.button == 2){
            for (let i = 0; i < this.markings.length; i++){
                const poly = this.markings[i].poly;
                if (poly.containsPoint(this.mouse)){
                    this.markings.splice(i, 1);
                    return;
                }
            }
        }
    }

    display(){
        if (this.intent){
            this.intent.draw(this.ctx);
        }
    }
}
