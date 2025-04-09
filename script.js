// Demo Task List
const demoForm = document.querySelector('.demo-form');
const taskInput = demoForm.querySelector('input');
const addButton = demoForm.querySelector('button');
const demoContainer = document.querySelector('.demo-container');

// Create task list container
const taskList = document.createElement('div');
taskList.className = 'task-list';
demoContainer.appendChild(taskList);

// Add task functionality
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    }
});

function addTask(text) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    const taskText = document.createElement('span');
    taskText.textContent = text;
    
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = 'delete-button';
    
    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskText);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);
    
    taskList.appendChild(taskItem);
    
    // Add task completion functionality
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = '#6c757d';
        } else {
            taskText.style.textDecoration = 'none';
            taskText.style.color = '#333333';
        }
    });
    
    // Add delete functionality
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to feature cards on scroll
const featureCards = document.querySelectorAll('.feature-card');

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Contact form validation
const contactForm = document.querySelector('.contact-form');
const nameInput = contactForm.querySelector('input[type="text"]');
const emailInput = contactForm.querySelector('input[type="email"]');
const messageInput = contactForm.querySelector('textarea');
const submitButton = contactForm.querySelector('button');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Name validation
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Please enter your name');
        isValid = false;
    } else {
        removeError(nameInput);
    }
    
    // Email validation
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    } else {
        removeError(emailInput);
    }
    
    // Message validation
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Please enter your message');
        isValid = false;
    } else {
        removeError(messageInput);
    }
    
    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    }
});

function showError(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message') || document.createElement('small');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formControl.appendChild(errorMessage);
    input.classList.add('error');
}

function removeError(input) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add styles for task list
const style = document.createElement('style');
style.textContent = `
    .task-list {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .task-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
    }
    
    .task-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .task-item input[type="checkbox"] {
        width: 20px;
        height: 20px;
    }
    
    .delete-button {
        background: none;
        border: none;
        color: var(--secondary-color);
        cursor: pointer;
        padding: 0.5rem;
        transition: color 0.3s ease;
    }
    
    .delete-button:hover {
        color: var(--primary-color);
    }
    
    .error-message {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .error {
        border-color: #dc3545 !important;
    }
`;

document.head.appendChild(style);