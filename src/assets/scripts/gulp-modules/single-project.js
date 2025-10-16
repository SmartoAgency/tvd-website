import $ from 'jquery';
import Swiper, { EffectFade, Navigation } from 'swiper';

import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import '../modules/gallery/gallerySlider';
import { createResponsiveTimeline, debounceResize, trackVisibility } from '../modules/helpers/helpers';

gsap.registerPlugin(ScrollTrigger, CustomEase);

window.ScrollTrigger2 = ScrollTrigger;



function homeNewsSlider() {
    const slider = new Swiper('[data-home-news-slider]', {
        modules: [Navigation],
        slidesPerView: 3,
        spaceBetween: 40,
        navigation: {
            nextEl: '[data-home-news-slider-next]',
            prevEl: '[data-home-news-slider-prev]',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            601: {
                slidesPerView: 1.2,
            },
            1025: {
                slidesPerView: 3,
            }
        }
    });
}

homeNewsSlider();

function singleProjectSlider() {
    document.querySelector('[data-single-projects-slider-all]').textContent = padNumber(document.querySelectorAll('[data-single-projects-slider] .swiper-slide').length);

    const slider = new Swiper('[data-single-projects-slider]', {
        modules: [Navigation],
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '[data-single-projects-slider-next]',
            prevEl: '[data-single-projects-slider-prev]',
        }
    });

    function padNumber(num) {
        return num < 10 ? `0${num}` : num;
    }

    slider.on('slideChange', function (swiper) {
        const currentSlide = padNumber(swiper.realIndex + 1);
        document.querySelector('[data-single-projects-slider-current]').textContent = currentSlide;
    })
}

singleProjectSlider();