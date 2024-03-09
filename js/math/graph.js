class Graph{
    constructor(points = [], segments = []){
        this.points = points;
        this.segments = segments;
    }

    static load(info){
        const points = info.points.map((i) => new Point(i.x, i.y));
        const segments = info.segments.map((i) => new Segment(
            points.find((p) => p.equals(i.p1)),
            points.find((p) => p.equals(i.p2))
        ));
        
        return new Graph(points, segments);
    }

    hash(){
        return JSON.stringify(this);
    }

    tryAddPoint(point){
        if(!this.containsPoint(point)){
            this.addPoint(point);
            return true;
        }
        return false;
    }

    addPoint(point){
        this.points.push(point);
    }

    containsPoint(point){
        return this.points.find((p) => p.equals(point));
    }

    removePoint(point){
        const segs = this.getSegmentsWidthPoint(point);
        for (const seg of segs){
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(point), 1);
    }


    tryAddSegment(seg){
        if (!this.containsSegment(seg) && seg.p1 != seg.p2){
            this.addSegment(seg);
            return true;
        }
        return false;
    }

    addSegment(seg){
        this.segments.push(seg);
    }

    containsSegment(seg){
        return this.segments.find((s)=> s.equals(seg));
    }

    removeSegment(seg){
        this.segments.splice(this.segments.indexOf(seg), 1);
    }
    getSegmentsWidthPoint(point){
        const segs = [];
        for (const seg of this.segments){
            if (seg.includes(point)){
                segs.push(seg);
            }
        }
        return segs;
    }

    dispose(){
        this.points.length = 0;
        this.segments.length = 0;
    }

    draw(ctx){
        for(const seg of this.segments){
            seg.draw(ctx);
        }

        for(const point of this.points){
            point.draw(ctx);
        }
    }
}