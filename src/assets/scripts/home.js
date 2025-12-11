import Swiper, { Autoplay, Mousewheel, Navigation } from 'swiper';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";
import { pad, trackVisibility, useState } from './modules/helpers/helpers';
// const header = document.querySelector('.header');

// const headroom = new Headroom(header, {});
// headroom.init();

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.core.globals('ScrollTrigger', ScrollTrigger);
gsap.core.globals('SplitText', SplitText);



Swiper.use([Mousewheel, Navigation, Autoplay]);

document.querySelectorAll('.down-arrow').forEach((el) => {
    el.addEventListener('click', (evt) => {
        evt.preventDefault();
        document.querySelector('.screen2').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
})



function frontScreenSlider() {
    const DELAY = 5000;
    const ANIMATION_DURATION = 1000;
    const slider = new Swiper('[data-front-screen-slider]', {
        direction: window.innerWidth > 1024 ? 'vertical' : 'horizontal',
        loop: true,
        autoplay: { delay: DELAY, disableOnInteraction: false },
        speed: ANIMATION_DURATION,
    });

    slider.on('slideChange', function () {
        console.log('slide CHANGE', slider.realIndex);
        
        document.querySelectorAll('[data-front-screen-slider-line]').forEach((el,index) => {
            el.classList.remove('active');

            const lineIndex = parseInt(el.getAttribute('data-front-screen-slider-line'), 10);
            if (index > slider.realIndex) {
                el.classList.remove('active');
            }
            el.classList.toggle('no-animation', index < slider.realIndex);
            if (slider.realIndex === lineIndex) {
                el.classList.add('active');
            }
        });
    });
    document.querySelectorAll('[data-front-screen-slider-line]').forEach((el) => {
        el.style.setProperty('--line-time', `${DELAY / 1000}s`);
        el.addEventListener('click', (evt) => {
            const lineIndex = parseInt(el.getAttribute('data-front-screen-slider-line'), 10);
            slider.slideToLoop(lineIndex);
        });
    });

    document.querySelector('[data-front-screen-slider-line]').classList.add('active');
}
frontScreenSlider();



function fillTextAnimation() {
    document.querySelectorAll('[data-fill-text-animation]').forEach((el) => {
        const textContent = el.textContent;
        el.style.position = 'relative';
        el.style.zIndex = '1';
        el.textContent = '';
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('fill-text-animation__wrapper');
        textWrapper.textContent = textContent;
        el.appendChild(textWrapper);
        const clone = textWrapper.cloneNode(true);
        clone.classList.add('fill-text-animation__clone');
        el.appendChild(clone);
        gsap.set(clone, {
            position: 'absolute',
            top: 0,
            left: 0,
            color: 'var(--color-black)',
        });
        const splitTextOriginal = new SplitText(textWrapper, { type: "words", linesClass: "line" });
        const splitTextCloned = new SplitText(clone, { type: "words", linesClass: "line" });
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                end: 'bottom 80%',
                scrub: true,
            }
        })
            .fromTo(splitTextCloned.words, { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.05, ease: 'none' }, 0);

    })
}


window.addEventListener('DOMContentLoaded', function (evt) {
    fillTextAnimation();
});

function homeProjectsSlider() {
    const slider = new Swiper('[data-home-projects-slider]', {
        slidesPerView: 4.3,
        spaceBetween: 20,
        simulateTouch: true,
        draggable: true,
        navigation: {
            nextEl: '[data-home-projects-slider-next]',
            prevEl: '[data-home-projects-slider-prev]',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.66,
            },
            1025: {
                slidesPerView: 4.3,
            },
        }
    });

    document.querySelectorAll('[data-home-projects-slide]').forEach((el, index) => {

        const tl = gsap.timeline({
            paused: true,
            once: true,
        })
            .fromTo(
                el.querySelector('.home-projects__img-wrapper-cover'),
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


function homeServicesItemsAnimation() {
    //data-home-services-item
    document.querySelectorAll('[data-home-services-item]').forEach((el) => {
        const tl = gsap.timeline({
            paused: true,
            once: true,
        });
        tl.fromTo(
            el.querySelector('.home-services__item-cover'),
            { autoAlpha: 1 },
            { autoAlpha: 0, ease: 'power2.out', duration: 1 })
            .fromTo(
                el.querySelector('.home-services__item-img-wrapper img'),
                {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                    scale: 1.25,
                },
                {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                    ease: 'power2.out',
                    scale: 1,
                    duration: 1, clearProps: 'all',
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
            threshold: 1
        });
    })
}

homeServicesItemsAnimation();

function homePartnersSlider() {
    const slider = new Swiper('[data-home-partners-slider]', {
        slidesPerView: 6,
        spaceBetween: 20,
        navigation: {
            nextEl: '[data-home-partners-slider-next]',
            prevEl: '[data-home-partners-slider-prev]',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            601: {
                slidesPerView: 2.5,
                spaceBetween: 0
            },
            1025: {
                slidesPerView: 6,
            },
        }
    });
}

homePartnersSlider();


function homeNewsSlider() {
    const slider = new Swiper('[data-home-news-slider]', {
        slidesPerView: 3,
        spaceBetween: 40,
        navigation: {
            nextEl: '[data-home-news-slider-next]',
            prevEl: '[data-home-news-slider-prev]',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            601: {
                slidesPerView: 1.2,
            },
            1025: {
                slidesPerView: 3,
            },
        }
    });
}

homeNewsSlider();