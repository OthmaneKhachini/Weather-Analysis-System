# Weather Data Analysis System — Project README

> **An interactive Single Page Application (SPA) for meteorological data management, search, and dynamic visualization built with Vue 3 and Chart.js.**

---

## 🚀 Project Overview

The **Weather Data Analysis System** is a professional, high-performance web application designed to manage, analyze, and visualize meteorological records. Developed as a comprehensive frontend engineering project, it combines foundational vanilla JavaScript DOM manipulation with modern progressive framework architecture (Vue 3 Composition API). 

The application utilizes a deterministic dataset of **exactly 929 records** and features robust local data persistence via `localStorage`, fully validated CRUD workflows, real-time filtering, and reactive charts.

---

## ✨ Key Features

* **Interactive Home Dashboard**: High-level system summaries showcasing total records tracked, cities monitored, and average temperatures alongside dynamic hero visuals.
* **Full CRUD Data Management**: A structured data table with a fully validated form supporting record creation, editing, and deletion with confirmation prompts.
* **Advanced Search & Filtering**: Multi-criteria query engine supporting text search (City, Condition, Date), numeric range filters (Temperature, Humidity, AQI), and sorting (Ascending/Descending).
* **Dynamic Data Visualization**: Powered by Chart.js featuring Line, Bar, and Doughnut charts that update in real-time when filtering datasets.
* **Responsive Dark Glassmorphism UI**: Crafted with custom CSS variables, Flexbox, CSS Grid, backdrop blurs, and smooth micro-interactions across mobile, tablet, and desktop viewports.

---

## 📐 Custom Business Rules

To simulate real-world meteorological data constraints and data integrity requirements, the system strictly enforces three custom rules:
1. **Temperature Boundary Validation**: Constrains temperature inputs between **-30°C and 60°C** during creation/editing; invalid entries halt transactions and trigger error alerts.
2. **Air Quality Alerts**: Automatically flags table rows with a `.poor-aqi` highlight and appends a warning badge whenever the **Air Quality Index (AQI) exceeds 200**.
3. **Heavy Rain Warnings**: Dynamically renders a **"Heavy Rain Alert"** badge next to rainfall records exceeding **100mm**.

---

## 🛠️ Technology Stack

* **Core Framework**: Vue 3 (Composition API) & Vue Router
* **Build Tool**: Vite
* **Data Visualization**: Chart.js
* **Styling**: Vanilla CSS (CSS Variables, Flexbox, Grid, Glassmorphism)
* **Data Persistence**: Browser `localStorage`
* **Architecture Utilities**: Dedicated `domUtils.js` for native DOM manipulation and `DataService.js` for deterministic mock data generation and state management

---

## ⚙️ Getting Started & Installation

### Prerequisites
Ensure you have **Node.js** installed on your machine.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/OthmaneKhachini/Weather-Analysis-System.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Weather-Analysis-System
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📅 Development Roadmap

* **Week 1 (Planning & Setup):** Scope definition, rubric alignment, Vite + Vue 3 initialization, and implementation of `DataService.js` with deterministic 929-record generation.
* **Week 2 (Core UI & Navigation):** Developed glassmorphic `style.css`, Vue Router setup, Home dashboard summary widgets, and `domUtils.js` for vanilla DOM event management.
* **Week 3 (Data Management & Business Logic):** Built full CRUD workflows in `DataManagement.vue`, integrated the 3 custom business rules, and implemented search/filtering in `Search.vue`.
* **Week 4 (Visualization & Finalization):** Integrated Chart.js visualizations in `Statistics.vue`, resolved chart reactivity bugs during LocalStorage mutations, and finalized project documentation.