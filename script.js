const html = document.documentElement // Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle")
const sunIcon = document.getElementById("sun-icon")
const moonIcon = document.getElementById("moon-icon")

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light"

// Apply the saved theme on page load
if (currentTheme === "dark") {
  html.classList.add("dark")
  sunIcon.classList.remove("hidden")
  moonIcon.classList.add("hidden")
} else {
  html.classList.remove("dark")
  sunIcon.classList.add("hidden")
  moonIcon.classList.remove("hidden")
}

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  if (html.classList.contains("dark")) {
    // Switch to light mode
    html.classList.remove("dark")
    localStorage.setItem("theme", "light")
    sunIcon.classList.add("hidden")
    moonIcon.classList.remove("hidden")
  } else {
    // Switch to dark mode
    html.classList.add("dark")
    localStorage.setItem("theme", "dark")
    sunIcon.classList.remove("hidden")
    moonIcon.classList.add("hidden")
  }
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 100
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Scroll Animations using Intersection Observer
const observerOptions = {
  threshold: 0.05,
  rootMargin: "0px 0px -20px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
      entry.target.style.transition = "all 0.4s ease"

      // Add a small delay for staggered animations
      const delay = entry.target.dataset.delay || 0
      entry.target.style.transitionDelay = `${delay}ms`

      // Unobserve after animation
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all animated elements
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".feature-card, .scholar-card, .level-card, .book-card, .book-card-large, .approved-stage-card")

  elements.forEach((element, index) => {
    // element.dataset.delay = index * 50
    element.dataset.delay = 250
    observer.observe(element)
  })
}

// Header scroll effect
let lastScroll = 0
const header = document.querySelector("header")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  // Add shadow on scroll
  if (currentScroll > 10) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)"
  }

  lastScroll = currentScroll
})

// Parallax effect for decorative elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".animate-float")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    const yPos = -(scrolled * speed)
    element.style.transform = `translateY(${yPos}px)`
  })
})

// Fade in sections on scroll
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  {
    threshold: 0.1,
  }
)

// Observe fade-in elements
document.querySelectorAll(".fade-in").forEach((element) => {
  fadeInObserver.observe(element)
})

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll()

  // Add loading class to body
  document.body.classList.add("loaded")
})

// Keyboard navigation accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any open modals or menus
    const openElements = document.querySelectorAll('[data-open="true"]')
    openElements.forEach((el) => (el.dataset.open = "false"))
  }
})

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout
  return function executedFunction() {
    const context = this
    const args = arguments

    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

// Optimized scroll handler
const optimizedScroll = debounce(() => {
  // Your scroll handling code here
  console.log("Scroll event optimized")
})

window.addEventListener("scroll", optimizedScroll)

// Lazy loading for images (if needed in the future)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.classList.add("loaded")
          imageObserver.unobserve(img)
        }
      }
    })
  })

  const lazyImages = document.querySelectorAll("img[data-src]")
  lazyImages.forEach((img) => imageObserver.observe(img))
}

// Add hover effect sound (optional, commented out by default)
/*
const hoverSound = new Audio('path/to/hover-sound.mp3');
document.querySelectorAll('.feature-card, .book-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(e => console.log('Audio play prevented'));
    });
});
*/

// Console welcome message
console.log("%c🌿 Welcome to A Series in the Realm of Language, the Qur'an, and the Sunnah", "font-size: 16px; color: #2D6A4F; font-weight: bold;")
console.log("%cDeveloped with ❤️ for education", "font-size: 12px; color: #40916C;")

// Analytics tracking (placeholder - add your analytics code here)
function trackEvent(category, action, label) {
  // Example: Google Analytics tracking
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
    })
  }
  console.log(`Event tracked: ${category} - ${action} - ${label}`)
}

// Track button clicks
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
  button.addEventListener("click", function () {
    const buttonText = this.textContent.trim()
    trackEvent("Button", "Click", buttonText)
  })
})

// Easter egg: Konami code
let konamiCode = []
const konamiSequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.key)
  konamiCode = konamiCode.slice(-10)

  if (konamiCode.join("") === konamiSequence.join("")) {
    console.log("🎉 Konami code activated! May your learning journey be blessed!")
    document.body.style.animation = "rainbow 2s ease"
  }
})

// Service Worker registration (for PWA support - optional)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed'));
    });
}
*/

// Copy to clipboard functionality (if needed for sharing)
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Copied to clipboard!")
      // Show a toast notification
      showToast("تم النسخ إلى الحافظة")
    })
    .catch((err) => {
      console.error("Failed to copy:", err)
    })
}

// Simple toast notification
function showToast(message, duration = 3000) {
  const toast = document.createElement("div")
  toast.textContent = message
  toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #2D6A4F;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease"
    setTimeout(() => toast.remove(), 300)
  }, duration)
}

// Preload critical assets
const preloadImages = () => {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    const tempImg = new Image()
    tempImg.src = img.src
  })
}

// Call preload on load
window.addEventListener("load", preloadImages)

// Form validation (if forms are added later)
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll("input[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false
      input.classList.add("error")
    } else {
      input.classList.remove("error")
    }
  })

  return isValid
}

// Accessibility: Skip to main content
const skipLink = document.createElement("a")
skipLink.href = "#about"
skipLink.textContent = "Skip to main content"
skipLink.className = "skip-link"
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #2D6A4F;
    color: white;
    padding: 8px;
    z-index: 100;
    text-decoration: none;
`
skipLink.addEventListener("focus", () => {
  skipLink.style.top = "0"
})
skipLink.addEventListener("blur", () => {
  skipLink.style.top = "-40px"
})
document.body.insertBefore(skipLink, document.body.firstChild)
