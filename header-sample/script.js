let options = {
    root: document.querySelector('.contents'),
    threshold: [0.1, 0]
}

let observer = new IntersectionObserver((entries) => {
    const intersectionRatio = entries && entries[0] ? entries[0].intersectionRatio : null
    if( intersectionRatio === 0 ) {
        document.querySelector('.header').classList.add('on')
    } else {
        document.querySelector('.header').classList.remove('on')
    }
}, options);



let target = document.querySelector('.banner');
observer.observe(target);
