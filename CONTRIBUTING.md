# 🤝 Contributing to SkillUp Tracker

Thank you for your interest in contributing to **SkillUp Tracker**! This project is part of [GirlScript Summer of Code 2025](https://gssoc.girlscript.tech/) and welcomes contributors of all experience levels. Whether you're a beginner or an experienced developer, there's a place for you here! 🎉

---

## 📋 Table of Contents

1. [Getting Started](#-getting-started)
2. [Ways to Contribute](#-ways-to-contribute)
3. [Development Setup](#-development-setup)
4. [Pull Request Process](#-pull-request-process)
5. [Coding Guidelines](#-coding-guidelines)
6. [Issue Guidelines](#-issue-guidelines)
7. [Community Guidelines](#-community-guidelines)
8. [Recognition](#-recognition)

---

## 🚀 Getting Started

Before you start contributing, please:

1. ⭐ **Star this repository** to show your support
2. 🍴 **Fork the repository** to your GitHub account
3. 📖 **Read our [Code of Conduct](CODE_OF_CONDUCT.md)**
4. 🔍 **Browse through existing [Issues](../../issues)** to find something that interests you
5. 💬 **Join our community discussions** for questions and collaboration

---

## 🛠️ Ways to Contribute

### 🐛 Bug Reports
- Report bugs using GitHub Issues
- Include screenshots, error messages, and steps to reproduce
- Use the bug report template when available

### 💡 Feature Requests
- Suggest new features through GitHub Issues
- Explain the use case and expected behavior
- Check if the feature aligns with project goals

### 💻 Code Contributions
- Fix bugs and implement new features
- Improve existing code quality and performance
- Add unit tests for new functionality

### 📚 Documentation
- Improve README, API docs, or code comments
- Write tutorials or guides
- Fix typos or unclear explanations

### 🎨 UI/UX Improvements
- Enhance the user interface design
- Improve user experience and accessibility
- Add responsive design features

---

## 🔧 Development Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

### 1️⃣ Fork and Clone
```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/skillup-tracker.git
cd skillup-tracker
```

### 2️⃣ Set Up Backend
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with required variables
# DATABASE_URL=mongodb://localhost:27017/skillup-tracker
# JWT_SECRET=your_jwt_secret_here
# PORT=5000

# Start the backend server
npm start
```

### 3️⃣ Set Up Frontend
```bash
# Navigate to client directory (in a new terminal)
cd client

# Install dependencies
npm install

# Start the React development server
npm start
```

### 4️⃣ Verify Setup
- Backend should run on `http://localhost:5000`
- Frontend should run on `http://localhost:3000`
- Ensure both servers are running without errors

---

## 🔄 Pull Request Process

### 1️⃣ Create a Branch
```bash
# Create and switch to a new feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

### 2️⃣ Make Changes
- Write clean, well-documented code
- Follow the coding guidelines below
- Test your changes thoroughly
- Commit with meaningful messages

### 3️⃣ Commit Guidelines
```bash
# Use conventional commit format
git commit -m "feat: add user dashboard analytics"
git commit -m "fix: resolve login authentication issue"
git commit -m "docs: update API documentation"
git commit -m "style: improve responsive design"
```

**Commit Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: UI/CSS changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### 4️⃣ Push and Create PR
```bash
# Push your branch to your fork
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
# Use the PR template and fill in all sections
```

### 5️⃣ PR Requirements
- ✅ Descriptive title and detailed description
- ✅ Link related issues using `Closes #issue-number`
- ✅ Screenshots for UI changes
- ✅ All tests passing
- ✅ No merge conflicts
- ✅ Code review approval from maintainers

---

## 📝 Coding Guidelines

### JavaScript/React
- Use **ES6+** features and modern JavaScript
- Follow **functional programming** patterns where possible
- Use **React Hooks** instead of class components
- Implement proper **error handling** and loading states

### Code Style
- Use **2 spaces** for indentation
- Use **semicolons** at the end of statements
- Use **camelCase** for variables and functions
- Use **PascalCase** for React components
- Keep functions small and focused (max 20-30 lines)

### File Organization
```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # API calls
├── contexts/           # React contexts
└── styles/             # CSS/styling files
```

### API Development
- Use **RESTful** conventions
- Implement proper **error handling** with meaningful messages
- Add **input validation** and **sanitization**
- Include **JSDoc** comments for functions
- Follow **MVC** pattern in backend structure

---

## 📋 Issue Guidelines

### Creating Issues
- **Search existing issues** before creating new ones
- Use **descriptive titles** and detailed descriptions
- Add **appropriate labels** (bug, feature, enhancement, etc.)
- Include **screenshots** for UI-related issues
- Provide **reproduction steps** for bugs


### Working on Issues
- **Comment on the issue** before starting work and after being assigned
- **Ask questions** if requirements are unclear
- **Update progress** regularly in comments
- **Link your PR** when you submit it

---

## 🌟 Community Guidelines

### Be Respectful
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
- Be patient with beginners and help them learn
- Provide constructive feedback in reviews
- Celebrate others' contributions

### Communication
- Use **clear and descriptive language**
- Be **responsive** to comments and reviews
- **Ask for help** when you're stuck
- **Share knowledge** and help others

### Quality Standards
- **Test your code** before submitting
- **Write meaningful commit messages**
- **Document complex logic** with comments
- **Follow established patterns** in the codebase

---

## ❓ Need Help?

If you have questions or need assistance:

1. 📖 Check the [README.md](README.md) for project overview
2. 🔍 Search through existing [Issues](../../issues) and [Discussions](../../discussions)
3. 💬 Create a new [Discussion](../../discussions) for general questions
4. 🐛 Create an [Issue](../../issues/new) for bugs or feature requests
5. 📧 Reach out to maintainers (contact info in README)

---

## 📄 License

By contributing to SkillUp Tracker, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

**Happy Contributing! 🎉**

Let's build something amazing together! Your contributions make this project better for everyone in the learning community. 

---

*Made with ❤️ by the SkillUp Tracker community*
