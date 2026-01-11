# FixIT.core — Neural Interface 🖥️

FixIT.core is a high-performance diagnostic interface built with React and Vite. It features a futuristic, glassmorphic design system ("Neural UI") optimized for hardware and software troubleshooting protocols.

# ✨ Interface Features

* Neural Glassmorphism: High-end backdrop blurs (glass-panel), iris protection filters, and animated borders.

* Dynamic Theming: Seamless transition between DARK_VOID and LIGHT_LINK modes.

* Adaptive Components:

* Sidebar: Protocol tracking and theme management.

* Chatbot: Initiate protocols via natural language input with a LucideMessageSquare interface.

* Diagnostic Cards: Interactive decision-based troubleshooting steps.

* Particle System: Performance-optimized HTML5 Canvas background that reacts to system state.

# 🚀 Local Development

## 1. Prerequisites

* Ensure you have the following installed:

* Node.js (v18.0.0 or higher)

* npm or yarn

## 2. Installation

Navigate to your project directory and install the dependencies:
```

npm install
```

## 3. Execution

Start the Vite development server:

```

npm run dev
```

Once started, the application will be accessible at:
👉 http://localhost:5173

# 📁 Project Architecture
```

src/
├── components/         # Core UI logic
│   ├── Sidebar.jsx     # Navigation & Theme Toggle
│   ├── Chatbot.jsx     # Protocol Initiation UI (uploaded)
│   ├── DiagnosticCard.jsx # Neural Analysis Module
│   └── Gauge.jsx       # Confidence level visualization
├── Styles/             # Component-specific & Global CSS
│   ├── GlobalStyles.css
│   ├── SideBarStyles.css
│   └── DiagnosticCardStyles.css
└── App.jsx             # Main State Controller & Canvas Engine
```

# 🔧 Configuration

The application is configured to communicate with the FastAPI backend. Update the API_BASE_URL in your main logic file if your port differs:
```

const API_BASE_URL = "http://localhost:8000";
```


# 🛠️ Tech Stack

* Framework: React 18

* Build Tool: Vite

* Icons: Lucide React

* Styling: Tailwind CSS & CSS3 Modules

# 📜 Available Scripts

* Command

* Action

  ` npm run dev`

* Starts the development server with Hot Module Replacement (HMR).

` npm run build `

* Compiles the production-ready application in the /dist folder.

` npm run preview `

Locally previews the production build.
