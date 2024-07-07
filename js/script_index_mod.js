let slideIndex1 = 0;
let slideIndex2 = 0;

function prevSlide(index) {
    const slides = document.querySelector(`.slides${index}`);
    const slideIndex = index === 1 ? slideIndex1 : slideIndex2;

    if (slideIndex > 0) {
        slideIndex--;
    }

    slides.scrollTo({ left: slideIndex * slides.offsetWidth, behavior: "smooth" });

    if (index === 1) {
        slideIndex1 = slideIndex;
    } else {
        slideIndex2 = slideIndex;
    }
}

function nextSlide(index) {
    const slides = document.querySelector(`.slides${index}`);
    const slideIndex = index === 1 ? slideIndex1 : slideIndex2;
    const totalSlides = slides.children.length - 1;

    if (slideIndex < totalSlides) {
        slideIndex++;
    }

    slides.scrollTo({ left: slideIndex * slides.offsetWidth, behavior: "smooth" });

    if (index === 1) {
        slideIndex1 = slideIndex;
    } else {
        slideIndex2 = slideIndex;
    }
}

function showSlides() {
    showSlidesForIndex(1);
    showSlidesForIndex(2);
}

function showSlidesForIndex(index) {
    const slides = document.querySelector(`.slides${index}`);
    const images = getImagesForSlideshow(index);

    slides.innerHTML = "";

    images.forEach((imageUrl) => {
        const img = document.createElement("img");
        img.src = imageUrl;
        slides.appendChild(img);
    });

    const slideIndex = index === 1 ? slideIndex1 : slideIndex2;
    slides.scrollTo({ left: slideIndex * slides.offsetWidth, behavior: "smooth" });
}

function getImagesForSlideshow(index) {
    if (index === 1) {
        return ["../images/footwear/1.jpg", "../images/footwear/2.jpg", "../images/footwear/3.jpg"];
    } else if (index === 2) {
        return ["../images/footwear/4.jpg", "../images/footwear/5.jpg", "../images/footwear/6.jpg"];
    }
}

showSlides();
