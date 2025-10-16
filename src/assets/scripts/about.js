import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import Swiper, { FreeMode, Navigation } from "swiper";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);


function block1CardsAnimation() {
    //.about-block1__card-wrapper
    if (window.screen.width < 1025) return;
    const container = document.querySelector('.about-block1__cards');
    const cards = document.querySelectorAll('.about-block1__card-wrapper');
    if (!cards.length) return;
    const thirdElement = cards[2];

    cards.forEach((el) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                scrub: true,
                trigger: container,
                start: '50% 100%',
                end: '150% 100%',
                markers: false
            }
        });
        tl.from(el.querySelector('.about-block1__card'), {
            rotate: 0,
            x: () => {
                //discaner the third element
                if (window.innerWidth < 1024) return 0;
                if (el === thirdElement) {
                    return 0;
                }
                // Calculate the horizontal delta between the third element and the current element
                const thirdRect = thirdElement.getBoundingClientRect();
                const currentRect = el.getBoundingClientRect();
                return thirdRect.left - currentRect.left;
            }
        })

        if (window.innerWidth >= 1024) {

            tl.from(el, {
                rotate: 0,
                y: 0
            }, '<')
        }
    });
}

function block1MobileSlider() {
    if (window.screen.width > 600) return;
    const slider = new Swiper('[data-block1-mobile-slider]', {
        slidesPerView: 1.1,
        modules: [Navigation],
        navigation: {
            nextEl: '[data-about-block1-slider-next]',
            prevEl: '[data-about-block1-slider-prev]',
        }
    });
}
block1MobileSlider();

block1CardsAnimation();



function aboutBlock2Animation() {
    gsap.timeline({
        scrollTrigger: {
            trigger: '.about-block2',
            scrub: true,
            markers: false
        }
    })
    .fromTo('.about-block2__bg', {
        y: -100,

    }, {
        y: 100,
        ease: 'none',
    }, '<')
    .fromTo('.about-block2__bg img', {
        scale: 1,

    }, {
        scale: 1.05,
        ease: 'none',
    }, '<');

}

aboutBlock2Animation();

function block3CardsAnimation() {
    //.about-block1__card-wrapper
    if (window.screen.width < 601) return;
    const container = document.querySelector('.about-block3__cards');
    const cards = document.querySelectorAll('.about-block3__card-wrapper');
    if (!cards.length) return;
    const thirdElement = cards[2];

    cards.forEach((el) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                scrub: true,
                trigger: container,
                start: '50% 100%',
                end: '150% 100%',
                markers: false
            }
        });
        tl.from(el.querySelector('.about-block3__card'), {
            rotate: 0,
            // x: () => {
            //     //discaner the third element
            //     if (el === thirdElement) {
            //         return 0;
            //     }
            //     // Calculate the horizontal delta between the third element and the current element
            //     const thirdRect = thirdElement.getBoundingClientRect();
            //     const currentRect = el.getBoundingClientRect();
            //     return thirdRect.left - currentRect.left;
            // }
        })
        .from(el, {
            rotate: 0,
            y: 0
        }, '<')
    });
}

block3CardsAnimation();

function block3MobileSlider() {
    if (window.screen.width > 600) return;
    const slider = new Swiper('[data-block3-mobile-slider]', {
        slidesPerView: 1.1,
        modules: [Navigation],
        navigation: {
            nextEl: '[data-block3-mobile-slider-next]',
            prevEl: '[data-block3-mobile-slider-prev]',
        }
    });
}

block3MobileSlider();

function aboutBlock4Animation() {
    gsap.timeline({
        scrollTrigger: {
            trigger: '.about-block4',
            scrub: true,
            markers: false
        }
    })
    .fromTo('.about-block4__bg', {
        y: -100,

    }, {
        y: 100,
        ease: 'none',
    }, '<')
    .fromTo('.about-block4__bg img', {
        scale: 1,

    }, {
        scale: 1.05,
        ease: 'none',
    }, '<');

}

aboutBlock4Animation();


function aboutBlock6Animation() {
    gsap.timeline({
        scrollTrigger: {
            trigger: '.about-block6',
            scrub: true,
            markers: false
        }
    })
    .fromTo('.about-block6__bg', {
        y: -100,

    }, {
        y: 100,
        ease: 'none',
    }, '<')
    .fromTo('.about-block6__bg img', {
        scale: 1,

    }, {
        scale: 1.05,
        ease: 'none',
    }, '<');

}


function aboutBlock5MobileSlider() {
    if (window.screen.width > 600) return;
    const container = document.querySelector('.about-block5__list');
    const items = document.querySelectorAll('.about-block5__item, .about-block5__card');
    container.insertAdjacentHTML('afterbegin', `
        <div class="swiper-container">
            <div class="swiper-wrapper">
            </div>
        </div>    
    `);
    items.forEach((el) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.appendChild(el);
        container.querySelector('.swiper-wrapper').appendChild(slide);
    });

    const slider = new Swiper(container.querySelector('.swiper-container'), {
        slidesPerView: 1,
        modules: [Navigation],
        navigation: {
            nextEl: '[data-block5-mobile-slider-next]',
            prevEl: '[data-block5-mobile-slider-prev]',
        }
    });
    
}
aboutBlock5MobileSlider();

aboutBlock6Animation();

function block7Anim() {
    document.querySelectorAll('.about-block7__item-img-wrap').forEach((el) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: '50% bottom',
                once: true,
            }
        });
        tl.fromTo(el.querySelector('.about-block7__item-img'), {
            scale: 1.1,
        }, {
            scale: 1,
            ease: 'none',
        })
        .fromTo(el.querySelector('.about-block7__item-img-cover'), {
            opacity: 1,
        }, {
            opacity: 0,
            ease: 'none',
        }, '<');
    });

}

block7Anim();


function homeProjectsSlider() {
    const slider = new Swiper('[data-home-projects-slider]', {
        modules: [Navigation, FreeMode],
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: '[data-home-projects-slider-next]',
            prevEl: '[data-home-projects-slider-prev]',
        }
    });

    document.querySelectorAll('[data-home-projects-slide]').forEach((el, index) => {

        const tl = gsap.timeline({
            paused: true,
            once: true,
        })
            .fromTo(
                el.querySelector('.about-block8__img-wrapper-cover'),
                { autoAlpha: 1 },
                { autoAlpha: 0, ease: 'power2.out', duration: 1 })
            .fromTo(
                el.querySelector('img'),
                {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                    scale: 1.05,
                },

                {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                    ease: 'power2.out',
                    scale: 1,
                    duration: 1
                }, '<+0.2')
            .add(() => {
                el.classList.add('animation-complete');
            })

        //intersection observer once
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    tl.play();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(el, {
            threshold: 0.85
        });
    })
}

homeProjectsSlider();

function sportSectionAnimation() {
    //about-block-sport__bg
    if (window.screen.width < 1024) return;
    gsap.timeline({
        scrollTrigger: {
            trigger: '.about-block-sport',
            scrub: true,
            markers: false
        }
    })
    .fromTo('.about-block-sport__bg', {
        y: -100,

    }, {
        y: 100,
        ease: 'none',
    }, '<')
    .fromTo('.about-block-sport__bg img', {
        scale: 1,

    }, {
        scale: 1.15,
        ease: 'none',
    }, '<');

}
sportSectionAnimation();

function aboutBlock9Slider() {
    const slider = new Swiper('[data-about-sport-awards-slider]', {
        slidesPerView: 'auto',
        modules: [Navigation, FreeMode],
        freeMode: true,
        spaceBetween: 20,
        navigation: {
            nextEl: '[data-about-sport-awards-slider-next]',
            prevEl: '[data-about-sport-awards-slider-prev]',
        }
    });

    document.querySelectorAll('[data-about-sport-awards-slide]').forEach((el, index) => {

        const tl = gsap.timeline({
            paused: true,
            once: true,
        })
            .fromTo(
                el.querySelector('.about-block9__img-wrapper-cover'),
                { autoAlpha: 1 },
                { autoAlpha: 0, ease: 'power2.out', duration: 1 })
            .fromTo(
                el.querySelector('img'),
                {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                    scale: 1.05,
                },

                {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                    ease: 'power2.out',
                    scale: 1,
                    duration: 1
                }, '<+0.2')
            .add(() => {
                el.classList.add('animation-complete');
            })

        //intersection observer once
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    tl.play();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(el, {
            threshold: 0.85
        });
    })
}

aboutBlock9Slider();

const logo = document.querySelector('.header__logo svg path');
const path = document.querySelector('.about-block-sport__img-player path');
if (logo && path) {
    // Removed pathDataToBezier usage as MorphSVGPlugin does not provide this method.
    // If you need to morph between paths, you can use morphSVG directly in the gsap.to() call.
    // Example: morphSVG: { shape: logo }
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-block-sport',
            start: '100% bottom',
            end: '110% bottom',
            scrub: true,
            markers: false,
        }
    });
    tl.to(path, {
        duration: 1,
        ease: 'none',
        morphSVG: {
            shape: logo,
            shapeIndex: 0
        },
        transformOrigin: '50% 50%'
    })
}
