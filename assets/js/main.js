// ===== DATA STORAGE =====
const DATA_KEY = 'yspData';

// Optimized image service with gradient fallbacks
const IMAGE_GRADIENTS = {
  'Community Outreach': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'Youth Leadership Training': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'Environmental Conservation': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'Disaster Relief': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
};

// Image URLs from multiple sources with fallbacks
const getOptimizedImage = (title) => {
  const images = {
    'Community Outreach': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    'Youth Leadership Training': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    'Environmental Conservation': 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=400&h=300&fit=crop',
    'Disaster Relief': 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=400&h=300&fit=crop',
  };
  return images[title] || generatePlaceholderImage(title);
};

// Generate SVG placeholder with gradient
const generatePlaceholderImage = (title) => {
  const gradient = IMAGE_GRADIENTS[title] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  const colors = {
    'Community Outreach': '#667eea',
    'Youth Leadership Training': '#f5576c',
    'Environmental Conservation': '#00f2fe',
    'Disaster Relief': '#fee140',
  };
  const color = colors[title] || '#f97316';
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${encodeURIComponent(color)};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${encodeURIComponent(adjustColor(color, -30))};stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad)'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.3em'%3E${encodeURIComponent(title)}%3C/text%3E%3C/svg%3E`;
};

const adjustColor = (color, percent) => {
  const num = parseInt(color.replace('#',''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt)).toString(16).padStart(2, '0');
  const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt)).toString(16).padStart(2, '0');
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt)).toString(16).padStart(2, '0');
  return '#' + (R + G + B).toUpperCase();
};

const defaultData = {
  stats: {
    projects: 12,
    chapters: 8,
    members: 450
  },
  programs: [
    {
      id: 1,
      title: 'Community Outreach',
      description: 'Building stronger communities through volunteer service and mentorship programs.',
      image: getOptimizedImage('Community Outreach'),
      photos: []
    },
    {
      id: 2,
      title: 'Youth Leadership Training',
      description: 'Developing future leaders through comprehensive training and mentorship.',
      image: getOptimizedImage('Youth Leadership Training'),
      photos: []
    },
    {
      id: 3,
      title: 'Environmental Conservation',
      description: 'Youth-led environmental initiatives and sustainability projects.',
      image: getOptimizedImage('Environmental Conservation'),
      photos: []
    },
    {
      id: 4,
      title: 'Disaster Relief',
      description: 'Emergency response and relief support for affected communities.',
      image: getOptimizedImage('Disaster Relief'),
      photos: []
    }
  ],
  chapters: [
    { id: 1, name: 'Manila Chapter', location: 'Metro Manila', icon: '🏙️' },
    { id: 2, name: 'Cebu Chapter', location: 'Cebu', icon: '🏝️' },
    { id: 3, name: 'Davao Chapter', location: 'Davao', icon: '🌳' },
    { id: 4, name: 'Iloilo Chapter', location: 'Iloilo', icon: '🌊' }
  ],
  volunteerEvents: [
    {
      id: 1,
      title: 'Beach Cleanup Drive',
      date: '2025-02-15',
      time: '08:00 AM',
      location: 'Manila Bay',
      chapter: 'Manila Chapter',
      contactPerson: 'Maria Santos',
      contactPhone: '0917-123-4567',
      icon: '🌊'
    },
    {
      id: 2,
      title: 'Feeding Program',
      date: '2025-02-20',
      time: '10:00 AM',
      location: 'Barangay Center',
      chapter: 'Cebu Chapter',
      contactPerson: 'Juan Reyes',
      contactPhone: '0917-234-5678',
      icon: '🍽️'
    },
    {
      id: 3,
      title: 'Tree Planting Activity',
      date: '2025-03-01',
      time: '07:00 AM',
      location: 'Forest Reserve',
      chapter: 'Davao Chapter',
      contactPerson: 'Ana Cortez',
      contactPhone: '0917-345-6789',
      icon: '🌱'
    }
  ],
  contact: {
    email: 'phyouthservice@gmail.com',
    mobile: '0917 779 8413',
    facebook: 'https://www.facebook.com/YOUTHSERVICEPHILIPPINES'
  },
  currentUser: null
};

// ===== DATA MANAGEMENT =====
function initData() {
  const stored = localStorage.getItem(DATA_KEY);
  if (!stored) {
    localStorage.setItem(DATA_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(stored);
}

function getData() {
  return JSON.parse(localStorage.getItem(DATA_KEY)) || defaultData;
}

function saveData(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

// ===== AUTHENTICATION =====
function openLogin() {
  document.getElementById('loginModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeLogin() {
  document.getElementById('loginModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function login(role) {
  const data = getData();
  data.currentUser = role;
  saveData(data);
  closeLogin();
  if (role === 'admin') {
    window.location.href = 'admin.html';
  } else if (role === 'chapter') {
    alert('Chapter Head login: You can now manage your chapter.');
  }
}

function logout() {
  const data = getData();
  data.currentUser = null;
  saveData(data);
  window.location.href = 'index.html';
}

function checkAuth() {
  const data = getData();
  if (!data.currentUser) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('loginModal');
  if (modal && event.target === modal) {
    closeLogin();
  }
});

// ===== ADMIN FUNCTIONS =====
function updateStats() {
  const projects = document.getElementById('sprojects')?.value;
  const members = document.getElementById('smembers')?.value;
  
  if (!projects && !members) {
    alert('Please enter at least one field.');
    return;
  }
  
  const data = getData();
  if (projects) data.stats.projects = parseInt(projects);
  if (members) data.stats.members = parseInt(members);
  saveData(data);
  
  showNotification('Stats updated successfully! ✓', 'success');
  document.getElementById('sprojects').value = '';
  document.getElementById('smembers').value = '';
  setTimeout(() => renderStats(), 500);
}

function addProgram() {
  const title = document.getElementById('ptitle')?.value;
  const desc = document.getElementById('pdesc')?.value;
  const img = document.getElementById('pimg')?.value;
  
  if (!title || !desc) {
    alert('Please fill in title and description.');
    return;
  }
  
  const data = getData();
  const newProgram = {
    id: Math.max(...data.programs.map(p => p.id), 0) + 1,
    title,
    description: desc,
    image: img || getOptimizedImage(title),
    photos: []
  };
  
  data.programs.push(newProgram);
  saveData(data);
  
  showNotification('Program added successfully! ✓', 'success');
  document.getElementById('ptitle').value = '';
  document.getElementById('pdesc').value = '';
  document.getElementById('pimg').value = '';
}

function addChapter() {
  const name = document.getElementById('cname')?.value;
  const location = document.getElementById('clocation')?.value;
  
  if (!name) {
    alert('Please enter a chapter name.');
    return;
  }
  
  const data = getData();
  const newChapter = {
    id: Math.max(...data.chapters.map(c => c.id), 0) + 1,
    name,
    location: location || '',
    icon: getChapterIcon(location)
  };
  
  data.chapters.push(newChapter);
  saveData(data);
  
  showNotification('Chapter added successfully! ✓', 'success');
  document.getElementById('cname').value = '';
  document.getElementById('clocation').value = '';
}

function getChapterIcon(location) {
  const icons = {
    'Manila': '🏙️',
    'Cebu': '🏝️',
    'Davao': '🌳',
    'Iloilo': '🌊',
  };
  for (let key in icons) {
    if (location && location.includes(key)) return icons[key];
  }
  return '📍';
}

function addVolunteerEvent() {
  const title = document.getElementById('vtitle')?.value;
  const date = document.getElementById('vdate')?.value;
  const time = document.getElementById('vtime')?.value;
  const location = document.getElementById('vlocation')?.value;
  const chapter = document.getElementById('vchapter')?.value;
  const contact = document.getElementById('vcontact')?.value;
  const phone = document.getElementById('vphone')?.value;
  
  if (!title || !date || !time || !location || !chapter || !contact || !phone) {
    alert('Please fill in all fields.');
    return;
  }
  
  const data = getData();
  const newEvent = {
    id: Math.max(...data.volunteerEvents.map(e => e.id), 0) + 1,
    title,
    date,
    time: convertTime(time),
    location,
    chapter,
    contactPerson: contact,
    contactPhone: phone,
    icon: getEventIcon(title)
  };
  
  data.volunteerEvents.push(newEvent);
  saveData(data);
  
  showNotification('Volunteer event added successfully! ✓', 'success');
  document.getElementById('vtitle').value = '';
  document.getElementById('vdate').value = '';
  document.getElementById('vtime').value = '';
  document.getElementById('vlocation').value = '';
  document.getElementById('vchapter').value = '';
  document.getElementById('vcontact').value = '';
  document.getElementById('vphone').value = '';
}

function getEventIcon(title) {
  const icons = {
    'Beach': '🌊',
    'Cleanup': '🧹',
    'Feeding': '🍽️',
    'Plant': '🌱',
    'Tree': '🌳',
    'Food': '🍽️',
    'Clean': '🧹',
  };
  for (let key in icons) {
    if (title.includes(key)) return icons[key];
  }
  return '🎯';
}

function convertTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;
  return `${String(hour).padStart(2, '0')}:${minutes} ${ampm}`;
}

function updateContact() {
  const email = document.getElementById('cemail')?.value;
  const mobile = document.getElementById('cmobile')?.value;
  const facebook = document.getElementById('cfacebook')?.value;
  
  if (!email && !mobile && !facebook) {
    alert('Please enter at least one field.');
    return;
  }
  
  const data = getData();
  if (email) data.contact.email = email;
  if (mobile) data.contact.mobile = mobile;
  if (facebook) data.contact.facebook = facebook;
  saveData(data);
  
  showNotification('Contact information updated successfully! ✓', 'success');
  document.getElementById('cemail').value = '';
  document.getElementById('cmobile').value = '';
  document.getElementById('cfacebook').value = '';
}

// ===== RENDER FUNCTIONS =====
function renderPrograms(container = 'programList') {
  const data = getData();
  const programsContainer = document.getElementById(container);
  if (!programsContainer) return;
  
  programsContainer.innerHTML = data.programs.map(program => `
    <div class="card">
      <img src="${program.image}" alt="${program.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Arial%22 font-size=%2216%22 fill=%22%23999%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImage not available%3C/text%3E%3C/svg%3E'">
      <div class="card-content">
        <h3>${program.title}</h3>
        <p>${program.description}</p>
      </div>
    </div>
  `).join('');
}

function renderChapters(container = 'chapterList') {
  const data = getData();
  const chaptersContainer = document.getElementById(container);
  if (!chaptersContainer) return;
  
  chaptersContainer.innerHTML = data.chapters.map(chapter => `
    <li>
      <strong>${chapter.icon || '📍'} ${chapter.name}</strong>${chapter.location ? ` - ${chapter.location}` : ''}
    </li>
  `).join('');
}

function renderVolunteerEvents(container = 'volunteerCalendar') {
  const data = getData();
  const eventsContainer = document.getElementById(container);
  if (!eventsContainer) return;
  
  if (data.volunteerEvents.length === 0) {
    eventsContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No volunteer events scheduled yet.</p>';
    return;
  }
  
  eventsContainer.innerHTML = data.volunteerEvents.map(event => `
    <div class="event">
      <h4>${event.icon || '🎯'} ${event.title}</h4>
      <p><strong>📅 Date:</strong> ${formatDate(event.date)}</p>
      <p><strong>⏰ Time:</strong> ${event.time}</p>
      <p><strong>📍 Location:</strong> ${event.location}</p>
      <p><strong>🏢 Chapter:</strong> ${event.chapter}</p>
      <p><strong>👤 Contact:</strong> ${event.contactPerson}</p>
      <p><strong>📱 Phone:</strong> <a href="tel:${event.contactPhone.replace(/\s/g, '')}">${event.contactPhone}</a></p>
    </div>
  `).join('');
}

function renderStats() {
  const data = getData();
  const projectsEl = document.getElementById('projects');
  const chaptersEl = document.getElementById('chapters');
  const membersEl = document.getElementById('members');
  
  if (projectsEl) {
    projectsEl.textContent = data.stats.projects;
    animateCounter(projectsEl, 0, data.stats.projects, 1000);
  }
  if (chaptersEl) {
    chaptersEl.textContent = data.stats.chapters;
    animateCounter(chaptersEl, 0, data.stats.chapters, 1000);
  }
  if (membersEl) {
    membersEl.textContent = data.stats.members;
    animateCounter(membersEl, 0, data.stats.members, 1000);
  }
}

function animateCounter(element, start, end, duration) {
  const increment = end / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = end;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 2000;
    animation: slideIn 0.3s ease;
    font-weight: 600;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initData();
  renderStats();
  renderPrograms('programList');
  renderChapters('chapterList');
  renderVolunteerEvents('volunteerCalendar');
  
  // Check auth for admin page
  if (window.location.pathname.includes('admin.html')) {
    checkAuth();
  }
});
