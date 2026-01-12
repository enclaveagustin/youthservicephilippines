# Youth Service Philippines

A professional, modern web application for Youth Service Philippines dedicated to developing youth leaders through community service and engagement.

## ✨ Features

- **Professional Design** - Built on Bootstrap 5 with a clean, modern interface
- **Admin Dashboard** - Manage content and track organizational data
- **Multiple Sections**:
  - Programs showcase with service initiatives
  - Chapter management for regional coordination
  - Volunteer opportunities and sign-ups
  - Member profiles and directory
  - Contact information and support
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile devices
- **Local Data Storage** - No database setup required, uses browser localStorage
- **Authentication** - Admin login system with localStorage persistence

## 🚀 Quick Start

**Option 1: Open Live Site**
```
https://enclaveagustin.github.io/youthservicephilippines
```

**Option 2: Run Locally**
```bash
# Using Python
python -m http.server 8000
# Open http://localhost:8000

# Or use the included batch file (Windows)
serve.bat
```

## 📖 Main Pages

| Page | Purpose |
|------|---------|
| **Home** | Showcase programs, statistics, and call-to-action |
| **Programs** | Display all youth service programs and initiatives |
| **Membership** | Manage chapters and join information |
| **Volunteer** | Browse volunteer opportunities |
| **Contact** | Contact information and support form |
| **Members** | View member profiles and directory |
| **Admin** | Dashboard for managing organizational data |

## 🎨 Design & Theme

- **Color Scheme**: Professional green (#3b5d50) and accents
- **Typography**: Inter font family for modern, clean appearance
- **Icons**: Font Awesome 6.0 for consistent iconography
- **Images**: Free HD images from Unsplash (community/youth/leadership themed)
- **Framework**: Bootstrap 5.3.0 for responsive grid layout
- **Mobile First**: Fully responsive across all device sizes

## 🔐 Authentication

### Default Login Credentials
- **Admin Login**: `username: admin` | `password: admin`
- **Chapter Login**: `username: chapter` | `password: chapter`

Data persists in browser using `localStorage` - no server needed.

## 📁 Project Structure

```
youthservicephilippines/
├── index.html                 # Home page
├── programs.html              # Programs listing
├── membership.html            # Chapters & membership
├── volunteer.html             # Volunteer opportunities
├── contact.html               # Contact page
├── members.html               # Member directory
├── admin.html                 # Admin dashboard
├── README.md                  # This file
├── serve.bat                  # Windows local server script
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css  # Bootstrap 5 framework
│   │   ├── tiny-slider.css    # Image carousel
│   │   └── style.css          # Custom YSP styles
│   ├── js/
│   │   ├── bootstrap.bundle.min.js
│   │   ├── tiny-slider.js
│   │   └── main.js            # Authentication & data management
│   └── images/
│       ├── logo.svg           # YSP logo
│       ├── *.svg & *.png      # Icons and assets
│       └── *.jpg              # Gallery images
└── .git/                      # Version control
```

## 🔧 Admin Dashboard Features

Sign in as admin to access:

- **Dashboard Stats**: View member count, volunteer hours, active programs
- **Program Management**: Add, edit, or view service programs
- **Chapter Management**: Manage regional chapters
- **Member Insights**: View and filter member information
- **Activity Tracking**: Monitor volunteer participation

### Admin Login
1. Click "Sign In" in the top navigation
2. Enter `admin` / `admin`
3. Access full dashboard functionality

## 💾 Data Storage

All data is stored locally in your browser:
- **Technology**: Browser `localStorage` API
- **No Server Required**: Works completely offline
- **Data Persistence**: Information survives page refreshes and browser restarts
- **Easy Backup**: Data stored as JSON objects
- **User-Specific**: Each browser instance has separate data

### Data Structure
```javascript
// Stored in localStorage as:
{
  "users": [...],
  "programs": [...],
  "chapters": [...],
  "volunteers": [...],
  "members": [...]
}
```

## 🎯 Key Functions (main.js)

| Function | Purpose |
|----------|---------|
| `handleLogin()` | Process admin/chapter login |
| `renderPrograms()` | Display program cards with images |
| `renderChapters()` | List regional chapters |
| `getOptimizedImage()` | Serve high-quality images from Unsplash |
| `showNotification()` | Toast notifications for user feedback |
| `switchTab()` | Tab navigation in dashboard |

## 🖼️ Images

All images are optimized HD images from Unsplash:
- Youth leadership and community service themes
- Responsive sizing (600x400px, 500x350px)
- Fast loading with CDN delivery
- Professional quality

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🚀 Deployment

The site is deployed on GitHub Pages at:
```
https://enclaveagustin.github.io/youthservicephilippines
```

To update:
1. Make changes locally
2. Commit and push to GitHub
3. Changes appear automatically on GitHub Pages

## 📝 License

Youth Service Philippines © 2026 | All Rights Reserved

## 🤝 Contributing

To contribute:
1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## 📧 Contact

For questions or issues, please contact through the Contact page or reach out directly to the YSP team.
- Email: phyouthservice@gmail.com
- Phone: 0917 779 8413
- Facebook: [Youth Service Philippines](https://www.facebook.com/YOUTHSERVICEPHILIPPINES)


