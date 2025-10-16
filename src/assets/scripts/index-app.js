import Headroom from 'headroom.js';
import { gsap } from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import './modules/form';
import { lenis } from './modules/scroll/leniscroll';
import { getUrlParam, pushSingleParam } from './modules/history/history';
import constructionHandler from './modules/constructionHandler';
import { createResponsiveTimeline, trackVisibility } from './modules/helpers/helpers';



gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.core.globals('ScrollTrigger', ScrollTrigger);
gsap.core.globals('SplitText', SplitText);



window.ScrollTrigger = ScrollTrigger;

const header = document.querySelector('.header');
const headroom = new Headroom(header, {
    offset: 100,
});
headroom.init();
header.headroom = headroom;

window.addEventListener('popup-opened', function (evt) {
    headroom.notTop();
    document.body.classList.add('popup-open');

});
window.addEventListener('popup-closed', function (evt) {
    headroom.notTop();
    document.body.classList.remove('popup-open');

});


constructionHandler();

//data-popup

function useState(initialValue) {
    let value = initialValue;
    const subscribers = [];

    function setValue(newValue) {
        value = newValue;
        subscribers.forEach((subscriber) => subscriber(value));
    }

    function getState() {
        return value;
    }

    function subscribe(callback) {
        subscribers.push(callback);
        return () => {
            const index = subscribers.indexOf(callback);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
        };
    }

    return [getState, setValue, subscribe];
}


const [formPopup, setFormPopup, useSetPopupEffect] = useState(false);

useSetPopupEffect(val => {
    const popup = document.querySelector('[data-popup]');
    popup.classList.toggle('active', val);
    document.body.classList.toggle('popup-open', val);
    if (val) {
        window.dispatchEvent(new Event('popup-opened'));
    }
});

document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-popup-call]');
    if (target) {
        setFormPopup(true);

    }
});
document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-popup-close]');
    if (target || evt.target.classList.contains('popup')) {
        setFormPopup(false);
    }
});


const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


window.addEventListener('resize', () => {
    if (window.screen.width < 1025) return;
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const [menuState, setMenuState, useSetMenuEffect] = useState(false);

useSetMenuEffect(val => {
    const menu = document.querySelector('[data-menu]');

    if (val) {
        document.querySelectorAll('[data-once-src]').forEach(el => {
            if (!el.getAttribute('src')) {
                el.setAttribute('src', el.getAttribute('data-once-src'));
                el.removeAttribute('data-once-src');
            }
        });
    }

    const tl = gsap.timeline({
        paused: true,
    })
    .fromTo('.menu__link', {
        autoAlpha: 0,
        x: 50,
    }, {
        autoAlpha: 1,
        x: 0,
        duration: 1.38,
        ease: "power4.out",
        clearProps: 'all',
        stagger: 0.1,
    })
    if (val) {
        const vh = window.innerHeight * 0.01;
        menu.classList.add('active', val);
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.body.classList.add('popup-open', val);
        window.dispatchEvent(new Event('popup-opened'));
        setTimeout(() => {
            tl.play();
        }, 250);
        
    } else {
        document.body.classList.remove('popup-open', val);
        window.dispatchEvent(new Event('popup-closed'));
        menu.addEventListener('animationend', function (evt) {
            menu.classList.remove('active');
            menu.classList.remove('closing');
        }, {
            once: true
        });

        menu.classList.add('closing');

    }

    document.querySelectorAll('.header').forEach(el => el.classList.toggle('on', val));
});

document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-menu-call]');

    if (target && menuState() === true) {
        setMenuState(false);
        return
    }

    if (target && menuState() === false) {
        setMenuState(true);
        return
    }
    if (evt.target.closest('[data-menu-close]') && menuState()) {
        setMenuState(false);
    }
});

document.querySelectorAll('.menu__link').forEach(el => {
    el.addEventListener('click', function (evt) {
        setMenuState(false);
    });
})

document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-menu-close]');
    if (evt.target.closest('[data-menu-call]')) {
        return;
    }
    if (target || evt.target.classList.contains('menu')) {
        setMenuState(false);
    }
});

const [callbackPopupOpen, setCallbackPopupOpen, useSetCallbackPopupEffect] = useState(false);

useSetCallbackPopupEffect(val => {
    const popup = document.querySelector('[data-callback-popup]');
    document.body.classList.toggle('popup-open', val);
    if (!val && popup.querySelector('[data-success]')) {
        popup.querySelector('[data-success]').remove();
    }
    if (val) {
        popup.classList.add('active', val);
        window.dispatchEvent(new Event('popup-opened'));
    } else {
        popup.addEventListener('animationend', function (evt) {
            popup.classList.remove('active');
            popup.classList.remove('closing');
        }, {
            once: true
        });
        popup.classList.add('closing');
    }
});

document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-callback-popup-call]');
    if (target) {
        setCallbackPopupOpen(true);
    }
});
document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-callback-popup-close]');
    if (target || evt.target.classList.contains('popup')) {
        setCallbackPopupOpen(false);
    }
});
/** Mobile callback popup */





document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-up-arrow]');
    if (!target) return;
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('.down-arrow');
    if (!target) return;
    const toSCroll = target.closest('.page__content').children[1];
    toSCroll.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
})

window.addEventListener('load',function(evt){
    document.querySelectorAll('[data-split-lines-new-animation]').forEach((el) => {
        let split = SplitText.create(el, { 
            type: "lines", 
            mask: 'lines', 
            linesClass: "line", 
            position: "absolute",
            reduceWhiteSpace: false,
        });
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                once: true,
                start: '50% bottom',
            }
        })
            .fromTo(split.lines, {
                y: 100,
            }, {
                y: 0,
                duration: 1.25,
                ease: "power4.out",
                stagger: {
                    amount: 0.25,
                }
            })
            .add(() => {
                split.revert();
            })
    })
});


function pageLoaderAnimation() {
    const tl = gsap.timeline({
        paused: true,
    });
    tl.fromTo('.inner-front-screen__bg, .inner-front-screen__title', {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    }, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.5,
        ease: "power4.out",
    }, '<')
    tl.fromTo('.header>*', {
        autoAlpha: 0,
        y: -20,
    }, {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
    }, '<+50%')
    tl.fromTo('.breadcrumbs>*, .title-decor', {
        autoAlpha: 0,
        y: -20,
    }, {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
        clearProps: 'all',
    }, '<')
    tl.fromTo(`.page__content>:nth-child(2)`, {
        autoAlpha: 0,
        y: -50
    }, {
        autoAlpha: 1,
        y: 0,
        duration: 2,
        ease: "power4.out",
        stagger: 0.1,
    }, '<')
    
    window.addEventListener('loaderFinished', function(evt){
        
    
        document.querySelector('[data-styles-for-loader]').remove();
        tl.play();
    
    });
}

pageLoaderAnimation();

window.addEventListener('load', function(evt){
    gsap.timeline({
        scrollTrigger: {
            once: true,
            trigger: '.contact-screen',
            
            onEnter: () => {
                document.querySelectorAll('[data-form-screen-src]').forEach(el => {
                    el.setAttribute('src', el.getAttribute('data-form-screen-src'));
                    el.removeAttribute('data-form-screen-src');
                    console.log('ENTER');
                    
                });
            }
        }
    })
    
    trackVisibility('[data-form-screen-video]', (action, entry) => {
        const video = entry;
        if (action === 'enter') {
            video.play();
        } else {
            video.pause();
        }
    });

    twoCirclesImageAnimation();
});




function twoCirclesImageAnimation() {
    document.querySelectorAll('[data-home-left-images]').forEach((el) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: true,
                start: '20% bottom',
                end: '100% bottom',
            }
        })
            .from(el.children[1], { x: 0 }, 0)
    })
}
