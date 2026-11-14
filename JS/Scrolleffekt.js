/* Felles scrolleffekt for forsiden, Om- og Galleri-siden.
   Elementer med klassen "reveal" glir inn og tones opp når de kommer inn i bildet.
   Lastes i <head> slik at "js"-klassen settes før siden tegnes (unngår blinking). */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
    const elementer = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        elementer.forEach((el) => el.classList.add("synlig"));
        return;
    }

    const observer = new IntersectionObserver((oppforinger) => {
        let forsinkelse = 0;
        oppforinger.forEach((oppforing) => {
            if (!oppforing.isIntersecting) return;
            const el = oppforing.target;
            // Elementer som kommer inn samtidig, vises litt etter hverandre
            el.style.transitionDelay = forsinkelse + "ms";
            forsinkelse += 120;
            el.classList.add("synlig");
            // Fjern forsinkelsen etterpå, så hover-effekter reagerer umiddelbart
            el.addEventListener("transitionend", () => {
                el.style.transitionDelay = "";
            }, { once: true });
            observer.unobserve(el);
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    elementer.forEach((el) => observer.observe(el));
});
