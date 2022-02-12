import { useEffect } from "react";

export default function StarField({...props}) {

    let STAR_COUNT = 0;
    let stars = [];

    const STAR_COLOR = '#fff';
    const scale = 1;
    const STAR_SIZE = 3;
    const STAR_MIN_SCALE = 0.2;
    const OVERFLOW_THRESHOLD = 50;
    const velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

    let pointerX, pointerY;
    let width, height;
    let touchInput = false;
    let context, canvas;

    useEffect(() => {
        if (!window) {
            return;
        }

        canvas  = document.querySelector('canvas.starfield');
        STAR_COUNT = (canvas.offsetWidth + canvas.offsetHeight) / 8;
        context = canvas.getContext('2d');

        generate();
        resize();
        step();

        window.onresize = resize;
        window.onmousemove = onMouseMove;
        canvas.ontouchmove = onTouchMove;
        canvas.ontouchend = onMouseLeave;
        document.onmouseleave = onMouseLeave;

    }, []);

    const generate = () => {
        for(let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: 0,
                y: 0,
                z: STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE )
            });
        }
    };

    const step = () => {
        context.clearRect(0, 0, width, height);
        update();
        render();
        requestAnimationFrame(step);
    }

    const resize = () => {
        scale  = window.devicePixelRatio || 1;
        width  = canvas.offsetWidth * scale;
        height = canvas.offsetHeight * scale;
        canvas.width = width;
        canvas.height = height;
        stars.forEach( placeStar );
    }

    const update = () => {
        velocity.tx *= 0.96;
        velocity.ty *= 0.96;
      
        velocity.x += (velocity.tx - velocity.x) * 0.8;
        velocity.y += (velocity.ty - velocity.y) * 0.8;
      
        stars.forEach( (star) => {
            star.x += velocity.x * star.z;
            star.y += velocity.y * star.z;
      
            star.x += ( star.x - width/2 ) * velocity.z * star.z;
            star.y += ( star.y - height/2 ) * velocity.z * star.z;
            star.z += velocity.z;
        
            if( star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD ) {
                recycleStar( star );
            }
        });
    }

    const placeStar = (star) => {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
    }

    const recycleStar = (star) => {
        let direction = 'z';
      
        let vx = Math.abs(velocity.x),
            vy = Math.abs(velocity.y);
      
        if( vx > 1 || vy > 1 ) {
            let axis;
      
            if( vx > vy ) {
                axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
            } else {
                axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
            }
      
            if( axis === 'h' ) {
                direction = velocity.x > 0 ? 'l' : 'r';
            } else {
                direction = velocity.y > 0 ? 't' : 'b';
            }
        }
        
        star.z = STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE );
      
        if( direction === 'z' ) {
            star.z = 0.1;
            star.x = Math.random() * width;
            star.y = Math.random() * height;
        } else if( direction === 'l' ) {
            star.x = -OVERFLOW_THRESHOLD;
            star.y = height * Math.random();
        } else if( direction === 'r' ) {
            star.x = width + OVERFLOW_THRESHOLD;
            star.y = height * Math.random();
        } else if( direction === 't' ) {
            star.x = width * Math.random();
            star.y = -OVERFLOW_THRESHOLD;
        } else if( direction === 'b' ) {
            star.x = width * Math.random();
            star.y = height + OVERFLOW_THRESHOLD;
        }
    }

    const render = () => {
        stars.forEach((star) => {
            context.beginPath();
            context.lineCap = 'round';
            context.lineWidth = STAR_SIZE * star.z * scale;
            context.globalAlpha = 0.5 + 0.5*Math.random();
            context.strokeStyle = STAR_COLOR;
        
            context.beginPath();
            context.moveTo( star.x, star.y );
        
            var tailX = velocity.x * 2,
                tailY = velocity.y * 2;
        
            // stroke() wont work on an invisible line
            if( Math.abs( tailX ) < 0.1 ) tailX = 0.5;
            if( Math.abs( tailY ) < 0.1 ) tailY = 0.5;
        
            context.lineTo( star.x, star.y );
            context.stroke();
        });
    }
      
    const movePointer = ( x, y ) => {
        if(typeof pointerX === 'number' && typeof pointerY === 'number' ) {
            let ox = x - pointerX,
                oy = y - pointerY;
      
            velocity.tx = velocity.tx + ( ox / 8*scale ) * ( touchInput ? 1 : -1 );
            velocity.ty = velocity.ty + ( oy / 8*scale ) * ( touchInput ? 1 : -1 );
        }
      
        pointerX = x;
        pointerY = y;
    }
      
    const onMouseMove = (event) => {
        touchInput = false;
        movePointer(event.clientX, event.clientY);
    }
      
    const onTouchMove = (event) => {
        touchInput = true;
        movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
        event.preventDefault();
    }
      
    const onMouseLeave = () => {
        pointerX = null;
        pointerY = null;
    }

    return (<canvas className="starfield"></canvas>)
}