<br/>
<div align="center">
  <h1 align="center">BOOK ORGANIZER: Gestión de biblioteca</h1>
  <p align="center">
    A desktop application built with Electron and React to manage a local library, including books, students, and a loan tracking system.
  </p>
</div>

<br/>

> **Developer's Note:**
> This project is a snapshot of my learning journey and was one of my first major applications using Electron and TypeScript. It is presented in my portfolio to showcase the skills I developed in building complex UIs, managing local databases, and understanding desktop application architecture. While the core functionality is implemented, the project is not feature-complete and is built on an older tech stack (e.g., Node.js v16). It stands as a testament to my growth as a developer, and if I were to build it today, I would leverage my current experience to re-architect it with modern tools and practices.

<br/>

<div align="center">
  <img width="800" height="590" alt="{E3160850-3F15-4C9E-B464-C044C1B46A80}" src="https://github.com/user-attachments/assets/fdf9ef2e-b6a6-4b55-8be6-ff07d779656d" />
</div>

## ✨ Key Features

*   **Library Management:**
    *   Add new books with details like title, author, topic, and publisher.
    *   Dynamically add new authors, topics, or publishers via interactive modals.
    *   Add and manage a list of students.
*   **Loan Tracking System:**
    *   Loan available books to registered students with a set due date.
    *   View all currently loaned books and their status.
    *   Process book returns to make them available again in the library.
*   **Persistent Local Data:**
    *   All data is stored in a local SQLite database file, ensuring privacy and offline functionality.
*   **Data Consultation:**
    *   Read-only views to quickly check the status of all books ("Disponible" or "Prestado").
    *   View a complete history of all loans that have been made and returned.

## 🛠️ Tech Stack

*   **Desktop Framework:** Electron
*   **Frontend:** React, React Router
*   **UI Library:** Ant Design
*   **Language:** TypeScript
*   **Database:** SQLite (via `better-sqlite3`)
*   **Bundler:** Webpack
*   **Styling:** Sass (SCSS)
*   **Build Tools:** Electron Builder

## ⚙️ Application Workflow

The application is organized into three main sections accessible from the sidebar:

#### 1. Managing the Library (`Gestión de la Biblioteca`)
This is the primary section for data entry. It contains two tabs:
*   **"Ingresar Libros"**: A form to add new books. Fields like Author, Topic, and Publisher are dropdowns. A `+` button next to each opens a draggable modal, allowing you to add new entries to the database without leaving the form.
*   **"Ingresar Estudiantes"**: A simple form and table for adding and viewing student records.

#### 2. Handling Loans (`Gestión de Préstamos`)
This section manages the entire book lending process across three tabs:
*   **"Realizar Préstamo"**: Displays a list of all books and their availability. An action button opens a modal where you can select a student and set a due date to complete the loan.
*   **"Realizar Devolución"**: Shows all books currently on loan. A "Devolver" button confirms the return of a book.
*   **"Historial de Préstamos"**: After a book is returned, a permanent record of that transaction appears here, creating a complete loan history.

#### 3. Consulting Data (`Consultar Datos`)
This section provides read-only views for quick lookups:
*   **"Consultar Libros"**: A comprehensive table of all books and their current loan status.
*   **"Consultar Estudiantes"**: A simple table listing all registered students.

## 🌱 Challenges & Key Learnings

This project was a significant step in my development journey. The key challenges and takeaways were:

*   **Learning TypeScript Under Pressure**: As my first major TypeScript project, I navigated a steep learning curve. I initially relied heavily on `any` types but successfully built complex, interconnected React components, which solidified my understanding of typed JavaScript.
*   **Understanding Electron's Architecture**: I learned to manage the communication between Electron's `main` process (handling Node.js APIs, like file system access for the database) and the `renderer` process (running the React UI). This required implementing a preload script and using IPC channels for secure and efficient data flow.
*   **Direct Database and Filesystem Integration**: A major success was integrating the `better-sqlite3` native dependency and managing the creation and reading of the database file directly from the filesystem. This gave me hands-on experience with native Node.js modules in a desktop environment.

## 🚀 Getting Started (Local Development)

To run this project locally, you will need a specific version of Node.js due to the age of its native dependencies.

#### Prerequisites
*   **Node.js v16.x**. The `better-sqlite3@7.5.0` package is not compatible with newer Node versions. It is highly recommended to use a version manager like [NVM](https://github.com/nvm-sh/nvm) or [NVS](https://github.com/jasongin/nvs) to install and use the correct version.
    ```sh
    nvm install 16
    nvm use 16
    ```
*   **npm v8.x** (typically comes with Node v16)

#### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd your-repo-name
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Start the application in development mode:
    ```bash
    npm start
    ```

## 📦 Building the Application

To create a distributable `.exe` file for Windows, run the following command:

```bash
npm run package
```

The build process will compile the application, and the final executable will be available in the `/dist` directory.
