// Data Storage
const DATA_KEY = 'yspData';

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
      image: 'https://via.placeholder.com/300x200?text=Community+Outreach',
      photos: []
    },
    {
      id: 2,
      title: 'Youth Leadership Training',
      description: 'Developing future leaders through comprehensive training and mentorship.',
      image: 'https://via.placeholder.com/300x200?text=Leadership+Training',
      photos: []
    },
    {
      id: 3,
      title: 'Environmental Conservation',
      description: 'Youth-led environmental initiatives and sustainability projects.',
      image: 'https://via.placeholder.com/300x200?text=Conservation',
      photos: []
    },
    {
      id: 4,
      title: 'Disaster Relief',
      description: 'Emergency response and relief support for affected communities.',
      image: 'https://via.placeholder.com/300x200?text=Disaster+Relief',
      photos: []
    }
  ],
  chapters: [
    { id: 1, name: 'Manila Chapter', location: 'Metro Manila' },
    { id: 2, name: 'Cebu Chapter', location: 'Cebu' },
    { id: 3, name: 'Davao Chapter', location: 'Davao' },
    { id: 4, name: 'Iloilo Chapter', location: 'Iloilo' }
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
      contactPhone: '0917-123-4567'
    },
    {
      id: 2,
      title: 'Feeding Program',
      date: '2025-02-20',
      time: '10:00 AM',
      location: 'Barangay Center',
      chapter: 'Cebu Chapter',
      contactPerson: 'Juan Reyes',
      contactPhone: '0917-234-5678'
    },
    {
      id: 3,
      title: 'Tree Planting Activity',
      date: '2025-03-01',
      time: '07:00 AM',
      location: 'Forest Reserve',
      chapter: 'Davao Chapter',
      contactPerson: 'Ana Cortez',
      contactPhone: '0917-345-6789'
    }
  ],
  contact: {
    email: 'phyouthservice@gmail.com',
    mobile: '0917 779 8413',
    facebook: 'https://www.facebook.com/YOUTHSERVICEPHILIPPINES'
  },
  currentUser: null
};

// Initialize Data
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

// Login/Logout Functions
function openLogin() {
  document.getElementById('loginModal').style.display = 'block';
}

function closeLogin() {
  document.getElementById('loginModal').style.display = 'none';
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

// Update Stats
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
  
  alert('Stats updated successfully!');
  document.getElementById('sprojects').value = '';
  document.getElementById('smembers').value = '';
}

// Add Program
function addProgram() {
  const title = document.getElementById('ptitle')?.value;
  const desc = document.getElementById('pdesc')?.value;
  const img = document.getElementById('pimg')?.value;
  
  if (!title || !desc || !img) {
    alert('Please fill in all fields.');
    return;
  }
  
  const data = getData();
  const newProgram = {
    id: Math.max(...data.programs.map(p => p.id), 0) + 1,
    title,
    description: desc,
    image: img,
    photos: []
  };
  
  data.programs.push(newProgram);
  saveData(data);
  
  alert('Program added successfully!');
  document.getElementById('ptitle').value = '';
  document.getElementById('pdesc').value = '';
  document.getElementById('pimg').value = '';
}

// Add Chapter
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
    location: location || ''
  };
  
  data.chapters.push(newChapter);
  saveData(data);
  
  alert('Chapter added successfully!');
  document.getElementById('cname').value = '';
  document.getElementById('clocation').value = '';
}

// Add Volunteer Event
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
    contactPhone: phone
  };
  
  data.volunteerEvents.push(newEvent);
  saveData(data);
  
  alert('Volunteer event added successfully!');
  document.getElementById('vtitle').value = '';
  document.getElementById('vdate').value = '';
  document.getElementById('vtime').value = '';
  document.getElementById('vlocation').value = '';
  document.getElementById('vchapter').value = '';
  document.getElementById('vcontact').value = '';
  document.getElementById('vphone').value = '';
}

function convertTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;
  return `${String(hour).padStart(2, '0')}:${minutes} ${ampm}`;
}

// Update Contact
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
  
  alert('Contact information updated successfully!');
  document.getElementById('cemail').value = '';
  document.getElementById('cmobile').value = '';
  document.getElementById('cfacebook').value = '';
}

// Render Functions
function renderPrograms(container, isCarousel = true) {
  const data = getData();
  const programsContainer = document.getElementById(container);
  if (!programsContainer) return;
  
  programsContainer.innerHTML = data.programs.map(program => `
    <div class="card">
      <img src="${program.image}" alt="${program.title}">
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
    <li style="padding:10px;background:#f0f0f0;margin:8px 0;border-radius:6px;">
      <strong>${chapter.name}</strong>${chapter.location ? ` - ${chapter.location}` : ''}
    </li>
  `).join('');
}

function renderVolunteerEvents(container = 'volunteerCalendar') {
  const data = getData();
  const eventsContainer = document.getElementById(container);
  if (!eventsContainer) return;
  
  eventsContainer.innerHTML = data.volunteerEvents.map(event => `
    <div class="event">
      <h4>${event.title}</h4>
      <p><strong>Date:</strong> ${formatDate(event.date)}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Chapter:</strong> ${event.chapter}</p>
      <p><strong>Contact:</strong> ${event.contactPerson}</p>
      <p><strong>Phone:</strong> <a href="tel:${event.contactPhone}">${event.contactPhone}</a></p>
    </div>
  `).join('');
}

function renderStats() {
  const data = getData();
  const projectsEl = document.getElementById('projects');
  const chaptersEl = document.getElementById('chapters');
  const membersEl = document.getElementById('members');
  
  if (projectsEl) projectsEl.textContent = data.stats.projects;
  if (chaptersEl) chaptersEl.textContent = data.stats.chapters;
  if (membersEl) membersEl.textContent = data.stats.members;
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize on page load
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
