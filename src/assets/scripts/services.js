import Accordion from "accordion-js";



document.querySelectorAll('.services-block__text').forEach((el) => {
    if (el.querySelectorAll('.services-block__accordeon').length <= 1) {
        el.querySelectorAll('.services-block__accordeon').forEach(el => {
            el.classList.add('js-here-is-no-accordeon');
        })
        return;
    }
    new Accordion(el, {
        triggerClass: "ac-header",
        elementClass: 'services-block__accordeon',
        panelClass: "services-block__accordeon-content",
        showMultiple: true,
    });
})