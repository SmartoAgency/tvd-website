import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);




function shuffleCardForMobile() {
    if (window.screen.width > 1024) return;
    const periods = document.querySelectorAll('.history-content__period');
    periods.forEach((period) => {
        const columnToPut = period.querySelector('.history-content__list-column1');
        const cards = Array.from(period.querySelectorAll('[data-mobile-index]')).sort((a, b) => {
            return parseInt(a.getAttribute('data-mobile-index'), 10) - parseInt(b.getAttribute('data-mobile-index'), 10);
        });

        cards.forEach((card) => {
            columnToPut.insertAdjacentElement('beforeend', card);
        });

    })
}

shuffleCardForMobile();

console.log('History page script loaded');

function initHistoryCardsAnimation() {
    const DOTS_INTERVAL = 300;
    const SVG_WIDTH = 40;
    const animLineContainer = document.querySelector('[data-anim-line]');
    const height = animLineContainer.offsetHeight;
    
    console.log('Height of anim line container:', height);
    
    let pathD = `M0 0`;
    let path2D = `M${SVG_WIDTH} 0`;
    let pathForAnimation = `M0 0 `;
    let isParne = true;
    
    for (let index = DOTS_INTERVAL; index <= height; index += DOTS_INTERVAL) {
        if (isParne) {
            // вигин вправо
            pathD += `C 6 ${index - DOTS_INTERVAL * 0.5} ${SVG_WIDTH - 4} ${index - DOTS_INTERVAL * 0.5} ${SVG_WIDTH - 4} ${index} `;
            pathForAnimation += `C 6 ${index - DOTS_INTERVAL * 0.5} ${SVG_WIDTH - 4} ${index - DOTS_INTERVAL * 0.5} ${SVG_WIDTH - 4} ${index} `;
            path2D += `C ${SVG_WIDTH} ${index - DOTS_INTERVAL * 0.5} 1 ${index - DOTS_INTERVAL * 0.5} 1 ${index} `;
        } else {
            // вигин вліво
            pathD += `C ${SVG_WIDTH - 1} ${index - DOTS_INTERVAL * 0.5} 6 ${index - DOTS_INTERVAL * 0.5} 6 ${index} `;
            pathForAnimation += `C ${SVG_WIDTH - 1} ${index - DOTS_INTERVAL * 0.5} 6 ${index - DOTS_INTERVAL * 0.5} 6 ${index} `;
            path2D += `C 1 ${index - DOTS_INTERVAL * 0.5} ${SVG_WIDTH} ${index - DOTS_INTERVAL * 0.5} ${SVG_WIDTH} ${index} `;
        }
        isParne = !isParne;
    }
    
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${SVG_WIDTH} ${height}`);
    svg.setAttribute('fill', 'none');
    svg.classList.add('history-anim-line__svg');
    
    const createPath = (d, stroke, strokeWidth) => {
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('stroke', stroke);
        path.setAttribute('stroke-width', strokeWidth);
        return path;
    };
    
    svg.append(
        createPath(pathD, 'rgba(168, 168, 168, 0.2)', '1'),
        createPath(path2D, 'rgba(168, 168, 168, 0.2)', '1'),
        createPath(pathForAnimation, '#010B13', '2')
    );
    
    // create circle and add to svg
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', SVG_WIDTH / 2);
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', '4');
    circle.setAttribute('fill', '#010B13');
    svg.appendChild(circle);
    
    
    animLineContainer.appendChild(svg);
    
    // set stroke-dasharray and stroke-dashoffset for animation path
    const pathForAnimationElement = svg.querySelectorAll('path')[2];
    const animPathLength = pathForAnimationElement.getTotalLength();
    pathForAnimationElement.style.strokeDasharray = `0 ${animPathLength}`;
    // pathForAnimationElement.style.strokeDashoffset = 0;
    
    
    //scrollTrigger for animLineContainer
    
    const halfOfScreenMapToPathLength = animPathLength / 100 * (window.innerHeight * 100 / animPathLength);
    
    console.log('Half of screen mapped to path length:', halfOfScreenMapToPathLength);
    
    
    
    
    if (window.screen.width > 1024) { 
        gsap.to(circle, {
            scrollTrigger: {
                trigger: animLineContainer, // контейнер із твоїм SVG
                start: '0% 50%',
                end: `100% 50%`,
                scrub: true,
                // markers: false // прибери, коли не треба
            },
            motionPath: {
                path: pathForAnimationElement,
                align: pathForAnimationElement,
                alignOrigin: [0.5, 0.5],
                autoRotate: false
            },
            ease: "none"
        });
    
        gsap.timeline({
            scrollTrigger: {
                trigger: animLineContainer,
                scrub: true,
                // markers: false,
                start: '0% 50%',
                end: `100% 50%`,
                onUpdate: self => {
                    // pathForAnimationElement.style.strokeDasharray = `${animPathLength * self.progress - halfOfScreenMapToPathLength} ${animPathLength}`;
                    pathForAnimationElement.style.strokeDasharray = `${animPathLength * self.progress} ${animPathLength}`;
                }
            }
        })
    }
}


window.addEventListener('load', () => {
    initHistoryCardsAnimation();
});