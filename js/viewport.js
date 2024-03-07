class Viewport{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.zoom = 1;
        this.offset = new Point(0, 0);
        this.drag = {
            start : new Point(0, 0),
            end : new Point(0, 0),
            offset : new Point(0, 0),
            active : false
        };

        this.#addEventListeners();
    }

    getMouse(evt){
        return new Point(
            evt.offsetX * this.zoom,
            evt.offsetY * this.zoom
        );
    }

    #addEventListeners(){
        this.canvas.addEventListener("mousewheel", this.#handlerMouseWheel.bind(this));
        this.canvas.addEventListener("mousedown", this.#handlerMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.#handlerMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.#handlerMouseUp.bind(this));
    }

    #handlerMouseWheel(evt){
        const dir = Math.sign(evt.deltaY);
        const step = 0.1;
        this.zoom += dir*step;
        this.zoom = Math.max(1, Math.min(5, this.zoom));
    }

    #handlerMouseDown(evt){
        if (evt.button == 1){ // middle button
            this.drag.start = this.getMouse(evt);
            this.drag.active = true;
        }
    }

    #handlerMouseMove(evt){
        if (this.drag.active){
            this.drag.end = this.getMouse(evt);
            this.drag.offset = subtract(this.drag.end, this.drag.start);
        }
    }

    #handlerMouseUp(evt){
        if (this.drag.active){
            this.offset = add(this.offset, this.drag.offset);
            this.drag = {
                start : new Point(0, 0),
                end : new Point(0, 0),
                offset : new Point(0, 0),
                active : false
            };
        }
    }

    getOffset(){
        return add(this.offset, this.drag.offset);
    }
}