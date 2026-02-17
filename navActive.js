const navLinks = document.querySelectorAll(".nav-link")

navLinks.forEach(link => {
    // console.log(link)
    if(link.href === window.location.href) {
        link.classList.add("bg-primary", "text-white")
    }
})