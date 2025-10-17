// State Management
let userProfile = {
    spaceType: '',
    zipCode: '',
    experience: '',
    goals: [],
    progress: {
        plantsAdded: 0,
        projectsCompleted: 0,
        neighborsConnected: 0
    },
    reminders: []
};

// Load saved data from localStorage
function loadUserData() {
    const saved = localStorage.getItem('habitatConciergeData');
    if (saved) {
        userProfile = JSON.parse(saved);
        return true;
    }
    return false;
}

// Save data to localStorage
function saveUserData() {
    localStorage.setItem('habitatConciergeData', JSON.stringify(userProfile));
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    if (loadUserData()) {
        showDashboard();
    }
});

// Onboarding
function startOnboarding() {
    document.getElementById('welcome').classList.add('hidden');
    document.getElementById('onboarding').classList.remove('hidden');
}

document.getElementById('onboarding-form').addEventListener('submit', (e) => {
    e.preventDefault();
    userProfile.spaceType = document.getElementById('space-type').value;
    userProfile.zipCode = document.getElementById('zip-code').value;
    userProfile.experience = document.getElementById('experience').value;
    saveUserData();
    showDashboard();
});

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show requested section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
        
        // Load section-specific content
        if (sectionId === 'plants') loadPlants();
        if (sectionId === 'projects') loadProjects();
        if (sectionId === 'goals') loadGoals();
        if (sectionId === 'neighbors') loadNeighbors();
        if (sectionId === 'events') loadEvents();
    }
}

function showDashboard() {
    showSection('dashboard');
    updateDashboardInfo();
    updateProgressStats();
    updateReminders();
}

function updateDashboardInfo() {
    const spaceNames = {
        'balcony': 'Balcony',
        'patio': 'Patio',
        'small-yard': 'Small Yard',
        'backyard': 'Backyard',
        'large-property': 'Large Property',
        'community-space': 'Community Space'
    };
    
    const info = `${spaceNames[userProfile.spaceType]} | ZIP: ${userProfile.zipCode}`;
    document.querySelector('.user-space-info').textContent = info;
}

function updateProgressStats() {
    document.getElementById('plants-added').textContent = userProfile.progress.plantsAdded;
    document.getElementById('projects-completed').textContent = userProfile.progress.projectsCompleted;
    document.getElementById('neighbors-connected').textContent = userProfile.progress.neighborsConnected;
}

function updateReminders() {
    const remindersList = document.getElementById('reminders-list');
    
    if (userProfile.reminders.length === 0) {
        remindersList.innerHTML = '<p class="empty-state">No reminders set. Add some from your goals!</p>';
        return;
    }
    
    remindersList.innerHTML = userProfile.reminders.map((reminder, index) => `
        <div class="reminder-item">
            <div class="reminder-text">
                <strong>${reminder.title}</strong><br>
                <small>Due: ${reminder.date}</small>
            </div>
            <button onclick="dismissReminder(${index})">Done</button>
        </div>
    `).join('');
}

function dismissReminder(index) {
    userProfile.reminders.splice(index, 1);
    saveUserData();
    updateReminders();
}

// Native Plants
const nativePlants = [
    { name: 'Purple Coneflower', type: 'Perennial', benefits: 'Attracts butterflies and bees, drought-tolerant', region: 'all' },
    { name: 'Black-eyed Susan', type: 'Perennial', benefits: 'Pollinator favorite, easy to grow', region: 'all' },
    { name: 'Milkweed', type: 'Perennial', benefits: 'Essential for monarch butterflies', region: 'all' },
    { name: 'Wild Bergamot', type: 'Perennial', benefits: 'Attracts hummingbirds and butterflies', region: 'all' },
    { name: 'Little Bluestem', type: 'Grass', benefits: 'Native prairie grass, winter interest', region: 'all' },
    { name: 'Blue Flag Iris', type: 'Perennial', benefits: 'Wetland plant, beautiful blooms', region: 'all' },
    { name: 'Goldenrod', type: 'Perennial', benefits: 'Late-season pollinator food', region: 'all' },
    { name: 'Wild Lupine', type: 'Perennial', benefits: 'Nitrogen-fixing, butterfly host plant', region: 'all' },
    { name: 'Native Sunflower', type: 'Annual/Perennial', benefits: 'Birds and pollinators love it', region: 'all' },
    { name: 'Serviceberry', type: 'Shrub/Tree', benefits: 'Edible berries, spring flowers', region: 'all' },
    { name: 'Red Twig Dogwood', type: 'Shrub', benefits: 'Winter interest, bird habitat', region: 'all' },
    { name: 'Spicebush', type: 'Shrub', benefits: 'Butterfly host plant, aromatic', region: 'all' }
];

function loadPlants() {
    const plantsList = document.getElementById('plants-list');
    
    plantsList.innerHTML = nativePlants.map(plant => `
        <div class="plant-card">
            <h3>${plant.name}</h3>
            <span class="plant-type">${plant.type}</span>
            <p class="plant-benefits">🌱 ${plant.benefits}</p>
            <button class="btn-primary" onclick="addPlant('${plant.name}')">Add to My Garden</button>
        </div>
    `).join('');
    
    // Add search functionality
    document.getElementById('plant-search').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = nativePlants.filter(plant => 
            plant.name.toLowerCase().includes(searchTerm) ||
            plant.benefits.toLowerCase().includes(searchTerm)
        );
        
        plantsList.innerHTML = filtered.map(plant => `
            <div class="plant-card">
                <h3>${plant.name}</h3>
                <span class="plant-type">${plant.type}</span>
                <p class="plant-benefits">🌱 ${plant.benefits}</p>
                <button class="btn-primary" onclick="addPlant('${plant.name}')">Add to My Garden</button>
            </div>
        `).join('');
    });
}

function addPlant(plantName) {
    userProfile.progress.plantsAdded++;
    saveUserData();
    alert(`🎉 ${plantName} added to your garden! Keep up the great work!`);
    updateProgressStats();
}

// Projects
const projects = [
    {
        title: 'Container Butterfly Garden',
        difficulty: 'easy',
        time: '2-3 hours',
        description: 'Create a pollinator-friendly container garden perfect for balconies or patios.',
        steps: ['Choose 3-5 large containers', 'Add quality potting mix', 'Plant nectar-rich flowers', 'Add a shallow water dish']
    },
    {
        title: 'Native Plant Garden Bed',
        difficulty: 'medium',
        time: '1-2 days',
        description: 'Transform a lawn area into a thriving native plant garden.',
        steps: ['Remove grass/sod', 'Amend soil with compost', 'Plant native species in groups', 'Mulch and water']
    },
    {
        title: 'Bird-Friendly Shrub Border',
        difficulty: 'medium',
        time: '1 day',
        description: 'Create a protective habitat border with native shrubs.',
        steps: ['Plan layout', 'Prepare planting holes', 'Plant native shrubs', 'Mulch base']
    },
    {
        title: 'Pollinator Meadow',
        difficulty: 'advanced',
        time: '2-3 days',
        description: 'Convert a large area into a diverse pollinator meadow.',
        steps: ['Remove existing vegetation', 'Prepare soil', 'Sow native wildflower mix', 'Maintain first year']
    },
    {
        title: 'Rain Garden',
        difficulty: 'advanced',
        time: '2-3 days',
        description: 'Create a depression garden that captures and filters rainwater.',
        steps: ['Identify low spot', 'Dig basin', 'Add amended soil', 'Plant water-tolerant natives']
    },
    {
        title: 'Window Box Habitat',
        difficulty: 'easy',
        time: '1 hour',
        description: 'Even the smallest space can support wildlife!',
        steps: ['Mount window box securely', 'Fill with soil', 'Plant compact natives', 'Add small water source']
    }
];

let currentFilter = 'all';

function loadProjects() {
    displayProjects(projects);
}

function filterProjects(difficulty) {
    currentFilter = difficulty;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const filtered = difficulty === 'all' 
        ? projects 
        : projects.filter(p => p.difficulty === difficulty);
    
    displayProjects(filtered);
}

function displayProjects(projectsList) {
    const container = document.getElementById('projects-list');
    
    container.innerHTML = projectsList.map((project, index) => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <span class="difficulty-badge ${project.difficulty}">${project.difficulty}</span>
            <p>${project.description}</p>
            <p class="project-time">⏱️ ${project.time}</p>
            <button class="btn-primary" onclick="viewProject(${index})">View Steps</button>
        </div>
    `).join('');
}

function viewProject(index) {
    const project = projects[index];
    const steps = project.steps.map((step, i) => `${i + 1}. ${step}`).join('\n');
    
    if (confirm(`${project.title}\n\n${project.description}\n\nSteps:\n${steps}\n\nMark this project as completed?`)) {
        userProfile.progress.projectsCompleted++;
        saveUserData();
        alert('🎉 Project completed! Great work on your habitat restoration!');
        updateProgressStats();
    }
}

// Goals
function loadGoals() {
    displayGoals();
}

document.getElementById('goal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('goal-title').value;
    const deadline = document.getElementById('goal-deadline').value;
    const reminder = document.getElementById('goal-reminder').checked;
    
    const goal = {
        id: Date.now(),
        title,
        deadline,
        completed: false,
        reminder
    };
    
    userProfile.goals.push(goal);
    
    if (reminder) {
        userProfile.reminders.push({
            id: goal.id,
            title: goal.title,
            date: goal.deadline
        });
    }
    
    saveUserData();
    displayGoals();
    updateReminders();
    
    // Reset form
    e.target.reset();
});

function displayGoals() {
    const goalsList = document.getElementById('goals-list');
    
    if (userProfile.goals.length === 0) {
        goalsList.innerHTML = '<p class="empty-state">No goals yet. Create your first one above!</p>';
        return;
    }
    
    goalsList.innerHTML = userProfile.goals.map(goal => `
        <div class="goal-item ${goal.completed ? 'completed' : ''}">
            <h4>${goal.completed ? '✓ ' : ''}${goal.title}</h4>
            <p class="goal-deadline">Target: ${goal.deadline}</p>
            <div class="goal-actions">
                ${!goal.completed ? `<button onclick="completeGoal(${goal.id})">Complete</button>` : ''}
                <button onclick="deleteGoal(${goal.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function completeGoal(goalId) {
    const goal = userProfile.goals.find(g => g.id === goalId);
    if (goal) {
        goal.completed = true;
        // Remove associated reminder
        userProfile.reminders = userProfile.reminders.filter(r => r.id !== goalId);
        saveUserData();
        displayGoals();
        updateReminders();
        alert('🎉 Goal completed! You\'re making great progress!');
    }
}

function deleteGoal(goalId) {
    if (confirm('Are you sure you want to delete this goal?')) {
        userProfile.goals = userProfile.goals.filter(g => g.id !== goalId);
        userProfile.reminders = userProfile.reminders.filter(r => r.id !== goalId);
        saveUserData();
        displayGoals();
        updateReminders();
    }
}

// Neighbors & Mentors
const sampleNeighbors = [
    { name: 'Sarah M.', location: '0.5 miles away', avatar: '👩‍🌾', projects: 'Pollinator garden' },
    { name: 'Mike T.', location: '0.8 miles away', avatar: '👨‍🌾', projects: 'Native trees' },
    { name: 'Jamie L.', location: '1.2 miles away', avatar: '🧑‍🌾', projects: 'Rain garden' },
    { name: 'Alex P.', location: '1.5 miles away', avatar: '👤', projects: 'Meadow restoration' }
];

const sampleMentors = [
    { name: 'Dr. Emily Green', expertise: 'Native plant specialist', avatar: '👩‍🏫', experience: '15 years' },
    { name: 'Robert Chen', expertise: 'Wildlife habitat design', avatar: '👨‍🏫', experience: '10 years' },
    { name: 'Maria Garcia', expertise: 'Pollinator gardens', avatar: '👩‍🔬', experience: '8 years' }
];

function loadNeighbors() {
    const neighborsList = document.getElementById('neighbors-list');
    const mentorsList = document.getElementById('mentors-list');
    
    neighborsList.innerHTML = sampleNeighbors.map(neighbor => `
        <div class="neighbor-card">
            <div class="avatar">${neighbor.avatar}</div>
            <h4>${neighbor.name}</h4>
            <p class="location">📍 ${neighbor.location}</p>
            <p>Working on: ${neighbor.projects}</p>
            <button onclick="connectWithNeighbor('${neighbor.name}')">Connect</button>
        </div>
    `).join('');
    
    mentorsList.innerHTML = sampleMentors.map(mentor => `
        <div class="mentor-card">
            <div class="avatar">${mentor.avatar}</div>
            <h4>${mentor.name}</h4>
            <p class="expertise">🎓 ${mentor.expertise}</p>
            <p>${mentor.experience} experience</p>
            <button onclick="connectWithMentor('${mentor.name}')">Request Mentorship</button>
        </div>
    `).join('');
}

function connectWithNeighbor(name) {
    userProfile.progress.neighborsConnected++;
    saveUserData();
    alert(`🤝 Connection request sent to ${name}! They'll be notified and can reach out to you.`);
    updateProgressStats();
}

function connectWithMentor(name) {
    alert(`📧 Mentorship request sent to ${name}! They'll review your profile and get in touch soon.`);
}

// Events
const sampleEvents = [
    {
        date: { day: 15, month: 'Nov' },
        title: 'Native Plant Workshop',
        type: 'workshop',
        location: 'Community Center',
        description: 'Learn about selecting and planting native species'
    },
    {
        date: { day: 22, month: 'Nov' },
        title: 'Community Planting Day',
        type: 'planting',
        location: 'Central Park',
        description: 'Join us for a community habitat restoration event'
    },
    {
        date: { day: 6, month: 'Dec' },
        title: 'Garden Tour: Native Habitats',
        type: 'tour',
        location: 'Various locations',
        description: 'Tour local successful habitat restoration projects'
    },
    {
        date: { day: 13, month: 'Dec' },
        title: 'Pollinator Garden Design',
        type: 'workshop',
        location: 'Library',
        description: 'Design your own pollinator-friendly garden'
    }
];

let currentEventFilter = 'all';

function loadEvents() {
    displayEvents(sampleEvents);
}

function filterEvents(type) {
    currentEventFilter = type;
    
    // Update filter buttons
    document.querySelectorAll('#events .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const filtered = type === 'all' 
        ? sampleEvents 
        : sampleEvents.filter(e => e.type === type);
    
    displayEvents(filtered);
}

function displayEvents(eventsList) {
    const container = document.getElementById('events-list');
    
    container.innerHTML = eventsList.map(event => `
        <div class="event-card">
            <div class="event-date">
                <div class="day">${event.date.day}</div>
                <div class="month">${event.date.month}</div>
            </div>
            <div class="event-info">
                <h3>${event.title}</h3>
                <span class="event-type">${event.type}</span>
                <p>${event.description}</p>
                <p class="event-location">📍 ${event.location}</p>
            </div>
            <div class="event-actions">
                <button onclick="registerEvent('${event.title}')">Register</button>
            </div>
        </div>
    `).join('');
}

function registerEvent(eventTitle) {
    alert(`✅ You're registered for "${eventTitle}"! Check your email for details and reminders.`);
}

// Resources
function showGuide(guideType) {
    const guides = {
        'native-plants': 'Native Plants Selection Guide\n\nLearn how to choose the right native plants for your region, soil type, and sunlight conditions.',
        'soil-health': 'Soil Health Basics\n\nDiscover how to build healthy soil that supports thriving native plants and beneficial organisms.',
        'wildlife-friendly': 'Creating Wildlife-Friendly Spaces\n\nTips for making your habitat attractive and safe for birds, butterflies, and beneficial insects.'
    };
    
    alert(guides[guideType] || 'Guide content coming soon!');
}

function openTool(toolType) {
    const tools = {
        'space-calculator': 'Space Planning Calculator\n\nThis tool helps you calculate how many plants you can fit in your space and suggests optimal layouts.',
        'plant-selector': 'Native Plant Selector Tool\n\nAnswer a few questions about your space and get personalized native plant recommendations.',
        'cost-estimator': 'Project Cost Estimator\n\nEstimate the cost of your habitat restoration project including plants, materials, and tools.',
        'impact-tracker': 'Wildlife Impact Tracker\n\nTrack the wildlife visiting your habitat and see the impact of your restoration efforts.'
    };
    
    alert(tools[toolType] || 'Tool coming soon!');
}
