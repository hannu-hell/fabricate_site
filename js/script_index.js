let slideIndex = 0; // Initialize the slide index

// Function to show images in the slideshow
function showSlides() {
    const slides = document.getElementsByClassName("slideshow")[0];
    const images = ["../images/footwear/1.jpg", "../images/footwear/6.jpg", "../images/footwear/10.jpg", "../images/footwear/12.jpg"]; // Add your image URLs here

    slides.innerHTML = ""; // Clear previous slides

    images.forEach(imageUrl => {
        const img = document.createElement("img");
        img.src = imageUrl;
        slides.appendChild(img);
    });

    slides.scrollTo({ left: slideIndex * slides.offsetWidth, behavior: "smooth" });
}

// Navigate to the previous slide
function prevSlide() {
    const slides = document.getElementsByClassName("slideshow")[0];
    if (slideIndex > 0) {
        slideIndex--;
        slides.scrollTo({ left: slideIndex * slides.offsetWidth, behavior: "smooth" });
    }
}

// Navigate to the next slide
function nextSlide() {
    const slides = document.getElementsByClassName("slideshow")[0];
    const maxIndex = slides.children.length - 1;

    if (slideIndex < maxIndex) {
        slideIndex++;
        slides.scrollTo({ left: slideIndex * slides.offsetWidth, behavior: "smooth" });
    }
}

// Call the function to show the initial slides
showSlides();


