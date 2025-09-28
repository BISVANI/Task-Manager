import './style.css'

// Task Manager Application
class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.currentView = 'home';
    this.editingTaskId = null;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-action]')) {
        const action = e.target.dataset.action;
        const taskId = e.target.dataset.taskId;
        
        switch (action) {
          case 'show-home':
            this.showHome();
            break;
          case 'show-login':
            this.showLogin();
            break;
          case 'show-signup':
            this.showSignup();
            break;
          case 'show-dashboard':
            this.showDashboard();
            break;
          case 'add-task':
            this.addTask();
            break;
          case 'logout':
            this.logout();
            break;
          case 'show-dashboard':
            this.showDashboard();
            break;
          case 'show-add-task':
            this.showAddTask();
            break;
          case 'add-task':
            this.addTask();
            break;
          case 'edit-task':
            this.editTask(taskId);
            break;
          case 'delete-task':
            this.deleteTask(taskId);
            break;
          case 'toggle-complete':
            this.toggleComplete(taskId);
            break;
          case 'cancel-edit':
            this.showDashboard();
            break;
          case 'login':
            this.handleLogin();
            break;
          case 'signup':
            this.handleSignup();
            break;
        }
      }
    });

    document.addEventListener('submit', (e) => {
      if (e.target.matches('#task-form')) {
        e.preventDefault();
        if (this.editingTaskId) {
          this.updateTask();
        } else {
          this.addTask();
        }
      } else if (e.target.matches('#login-form')) {
        e.preventDefault();
        this.handleLogin();
      } else if (e.target.matches('#signup-form')) {
        e.preventDefault();
        this.handleSignup();
      } else if (e.target.matches('#task-form')) {
        e.preventDefault();
        this.addTask();
      }
    });
  }

  render() {
    const app = document.getElementById('app');
    
    switch (this.currentView) {
      case 'home':
        app.innerHTML = this.renderHome();
        break;
      case 'login':
        app.innerHTML = this.renderLogin();
        break;
      case 'signup':
        app.innerHTML = this.renderSignup();
        break;
      case 'dashboard':
        app.innerHTML = this.renderDashboard();
        break;
      case 'add-task':
        app.innerHTML = this.renderAddTask();
        break;
      case 'edit-task':
        app.innerHTML = this.renderEditTask();
        break;
    }
  }

  renderHome() {
    return `
      <div class="home-container">
        <div class="home-content">
          <h1 class="home-title">Welcome to My Task Manager</h1>
          <div class="home-buttons">
            <button class="btn btn-primary btn-large" data-action="show-login">Login</button>
            <button class="btn btn-primary btn-large" data-action="show-signup">Signup</button>
            <button class="btn btn-primary btn-large" data-action="show-dashboard">Go to Dashboard</button>
          </div>
        </div>
      </div>
    `;
  }

  renderLogin() {
    return `
      <div class="auth-container">
        <div class="auth-content">
          <h1 class="auth-title">Login</h1>
          <form id="login-form" class="auth-form">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" name="email" class="form-input" required placeholder="Enter your email">
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input type="password" id="password" name="password" class="form-input" required placeholder="Enter your password">
            </div>
            
            <button type="submit" class="btn btn-primary btn-large btn-full">Login</button>
          </form>
          
          <div class="auth-links">
            <p>Don't have an account? <a href="#" data-action="show-signup" class="auth-link">Sign up</a></p>
            <p><a href="#" data-action="show-home" class="auth-link">← Back to Home</a></p>
          </div>
        </div>
      </div>
    `;
  }

  renderSignup() {
    return `
      <div class="auth-container">
        <div class="auth-content">
          <h1 class="auth-title">Create Account</h1>
          <form id="signup-form" class="auth-form">
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input type="text" id="name" name="name" class="form-input" required placeholder="Enter your full name">
            </div>
            
            <div class="form-group">
              <label for="signup-email" class="form-label">Email</label>
              <input type="email" id="signup-email" name="email" class="form-input" required placeholder="Enter your email">
            </div>
            
            <div class="form-group">
              <label for="signup-password" class="form-label">Password</label>
              <input type="password" id="signup-password" name="password" class="form-input" required placeholder="Create a password">
            </div>
            
            <button type="submit" class="btn btn-primary btn-large btn-full">Sign Up</button>
          </form>
          
          <div class="auth-links">
            <p>Already have an account? <a href="#" data-action="show-login" class="auth-link">Login</a></p>
            <p><a href="#" data-action="show-home" class="auth-link">← Back to Home</a></p>
          </div>
        </div>
      </div>
    `;
  }

  renderDashboard() {
    return `
      <div class="dashboard-container">
        <div class="dashboard-content">
          <h1 class="dashboard-title">Your Tasks</h1>
          
          <div class="task-list-container">
            <ul class="task-list">
              ${this.tasks.map(task => `<li class="task-item">${task}</li>`).join('')}
            </ul>
          </div>
          
          <form id="task-form" class="task-form">
            <div class="task-input-group">
              <div class="form-group">
                <label for="new-task" class="form-label">New Task</label>
                <input type="text" id="new-task" name="new-task" class="form-input" required placeholder="Enter a new task">
              </div>
              <button type="submit" class="btn btn-primary btn-large">Add Task</button>
            </div>
          </form>
          
          <div class="dashboard-actions">
            <button class="btn btn-secondary btn-large" data-action="logout">Logout</button>
          </div>
        </div>
      </div>
    `;
  }
  renderNavigation() {
    return `
      <nav class="nav">
        <div class="nav-container">
          <a href="#" class="nav-brand" data-action="show-dashboard">Task Manager</a>
          <ul class="nav-links">
            <li><a href="#" class="nav-link ${this.currentView === 'dashboard' ? 'active' : ''}" data-action="show-dashboard">Dashboard</a></li>
            <li><a href="#" class="nav-link ${this.currentView === 'add-task' ? 'active' : ''}" data-action="show-add-task">Add Task</a></li>
          </ul>
        </div>
      </nav>
    `;
  }

  renderDashboard() {
    const completedTasks = this.tasks.filter(task => task.completed).length;
    const pendingTasks = this.tasks.filter(task => !task.completed).length;
    const highPriorityTasks = this.tasks.filter(task => task.priority === 'high' && !task.completed).length;

    return `
      ${this.renderNavigation()}
      
      <div class="hero">
        <div class="container">
          <h1>Task Manager Dashboard</h1>
          <p class="text-muted">Stay organized and productive with your personal task management system</p>
        </div>
      </div>

      <div class="container">
        <div class="card">
          <div class="flex justify-between align-center mb-0">
            <h2>Task Overview</h2>
            <button class="btn btn-primary" data-action="show-add-task">Add New Task</button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg); margin-bottom: var(--spacing-xl);">
          <div class="card text-center">
            <h3 style="color: var(--primary-button); font-size: 2rem; margin-bottom: var(--spacing-sm);">${this.tasks.length}</h3>
            <p class="text-muted mb-0">Total Tasks</p>
          </div>
          <div class="card text-center">
            <h3 style="color: #28a745; font-size: 2rem; margin-bottom: var(--spacing-sm);">${completedTasks}</h3>
            <p class="text-muted mb-0">Completed</p>
          </div>
          <div class="card text-center">
            <h3 style="color: #ffc107; font-size: 2rem; margin-bottom: var(--spacing-sm);">${pendingTasks}</h3>
            <p class="text-muted mb-0">Pending</p>
          </div>
          <div class="card text-center">
            <h3 style="color: #dc3545; font-size: 2rem; margin-bottom: var(--spacing-sm);">${highPriorityTasks}</h3>
            <p class="text-muted mb-0">High Priority</p>
          </div>
        </div>

        <div class="card">
          <h2>Your Tasks</h2>
          ${this.tasks.length === 0 ? 
            `<div class="text-center" style="padding: var(--spacing-2xl);">
              <p class="text-muted" style="font-size: 1.125rem;">No tasks yet. Create your first task to get started!</p>
              <button class="btn btn-primary mt-lg" data-action="show-add-task">Create First Task</button>
            </div>` :
            `<ul class="task-list">
              ${this.tasks.map(task => this.renderTaskItem(task)).join('')}
            </ul>`
          }
        </div>
      </div>

      ${this.renderFooter()}
    `;
  }

  renderTaskItem(task) {
    const priorityClass = `priority-${task.priority}`;
    const completedClass = task.completed ? 'task-completed' : '';
    const statusBadge = task.completed ? 'completed' : (task.status || 'pending');

    return `
      <li class="task-item ${priorityClass} ${completedClass}">
        <div class="task-content">
          <div class="task-title">${task.title}</div>
          ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
          <div class="task-meta">
            <span class="status-badge status-${statusBadge}">${statusBadge}</span>
            <span>Priority: ${task.priority}</span>
            <span>Due: ${task.dueDate || 'No due date'}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="btn btn-sm btn-secondary" data-action="toggle-complete" data-task-id="${task.id}">
            ${task.completed ? 'Undo' : 'Complete'}
          </button>
          <button class="btn btn-sm btn-primary" data-action="edit-task" data-task-id="${task.id}">Edit</button>
          <button class="btn btn-sm btn-danger" data-action="delete-task" data-task-id="${task.id}">Delete</button>
        </div>
      </li>
    `;
  }

  renderAddTask() {
    return `
      ${this.renderNavigation()}
      
      <div class="hero">
        <div class="container-form">
          <h1>Add New Task</h1>
          <p class="text-muted">Create a new task to stay organized and productive</p>
        </div>
      </div>

      <div class="container-form">
        <div class="card">
          <form id="task-form">
            <div class="form-group">
              <label for="title" class="form-label">Task Title *</label>
              <input type="text" id="title" name="title" class="form-input" required placeholder="Enter task title">
            </div>

            <div class="form-group">
              <label for="description" class="form-label">Description</label>
              <textarea id="description" name="description" class="form-textarea" placeholder="Enter task description (optional)"></textarea>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg);">
              <div class="form-group">
                <label for="priority" class="form-label">Priority</label>
                <select id="priority" name="priority" class="form-select">
                  <option value="low">Low</option>
                  <option value="medium" selected>Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div class="form-group">
                <label for="status" class="form-label">Status</label>
                <select id="status" name="status" class="form-select">
                  <option value="pending" selected>Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div class="form-group">
                <label for="dueDate" class="form-label">Due Date</label>
                <input type="date" id="dueDate" name="dueDate" class="form-input">
              </div>
            </div>

            <div class="flex gap-md mt-lg">
              <button type="submit" class="btn btn-primary">Create Task</button>
              <button type="button" class="btn btn-secondary" data-action="show-dashboard">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      ${this.renderFooter()}
    `;
  }

  renderEditTask() {
    const task = this.tasks.find(t => t.id === this.editingTaskId);
    if (!task) return this.renderDashboard();

    return `
      ${this.renderNavigation()}
      
      <div class="hero">
        <div class="container-form">
          <h1>Edit Task</h1>
          <p class="text-muted">Update your task details</p>
        </div>
      </div>

      <div class="container-form">
        <div class="card">
          <form id="task-form">
            <div class="form-group">
              <label for="title" class="form-label">Task Title *</label>
              <input type="text" id="title" name="title" class="form-input" required value="${task.title}">
            </div>

            <div class="form-group">
              <label for="description" class="form-label">Description</label>
              <textarea id="description" name="description" class="form-textarea">${task.description || ''}</textarea>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg);">
              <div class="form-group">
                <label for="priority" class="form-label">Priority</label>
                <select id="priority" name="priority" class="form-select">
                  <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                  <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                  <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
                </select>
              </div>

              <div class="form-group">
                <label for="status" class="form-label">Status</label>
                <select id="status" name="status" class="form-select">
                  <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
                  <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                  <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
              </div>

              <div class="form-group">
                <label for="dueDate" class="form-label">Due Date</label>
                <input type="date" id="dueDate" name="dueDate" class="form-input" value="${task.dueDate || ''}">
              </div>
            </div>

            <div class="flex gap-md mt-lg">
              <button type="submit" class="btn btn-primary">Update Task</button>
              <button type="button" class="btn btn-secondary" data-action="show-dashboard">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      ${this.renderFooter()}
    `;
  }

  renderFooter() {
    return `
      <footer class="footer">
        <div class="footer-content">
          <p class="footer-text">© 2025 Task Manager. Built with modern web technologies.</p>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Privacy Policy</a></li>
            <li><a href="#" class="footer-link">Terms of Service</a></li>
            <li><a href="#" class="footer-link">Support</a></li>
            <li><a href="#" class="footer-link">About</a></li>
          </ul>
        </div>
      </footer>
    `;
  }

  showHome() {
    this.currentView = 'home';
    this.editingTaskId = null;
    this.render();
  }

  showLogin() {
    this.currentView = 'login';
    this.editingTaskId = null;
    this.render();
  }

  showSignup() {
    this.currentView = 'signup';
    this.editingTaskId = null;
    this.render();
  }
  showDashboard() {
    this.currentView = 'dashboard';
    this.render();
  }

  showDashboard() {
    this.currentView = 'dashboard';
    this.editingTaskId = null;
    this.render();
  }

  showAddTask() {
    this.currentView = 'add-task';
    this.editingTaskId = null;
    this.render();
  }

  addTask() {
    const form = document.getElementById('task-form');
    const formData = new FormData(form);
    
    const task = {
      id: Date.now().toString(),
      title: formData.get('title'),
      description: formData.get('description'),
      priority: formData.get('priority'),
      status: formData.get('status'),
      dueDate: formData.get('dueDate'),
      completed: formData.get('status') === 'completed',
      createdAt: new Date().toISOString()
    };

    this.tasks.push(task);
    this.saveTasks();
    this.showDashboard();
  }

  editTask(taskId) {
    this.editingTaskId = taskId;
    this.currentView = 'edit-task';
    this.render();
  }

  updateTask() {
    const form = document.getElementById('task-form');
    const formData = new FormData(form);
    
    const taskIndex = this.tasks.findIndex(t => t.id === this.editingTaskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        title: formData.get('title'),
        description: formData.get('description'),
        priority: formData.get('priority'),
        status: formData.get('status'),
        dueDate: formData.get('dueDate'),
        completed: formData.get('status') === 'completed',
        updatedAt: new Date().toISOString()
      };
      
      this.saveTasks();
      this.showDashboard();
    }
  }

  deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      this.saveTasks();
      this.render();
    }
  }

  toggleComplete(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      task.status = task.completed ? 'completed' : 'pending';
      this.saveTasks();
      this.render();
    }
  }

  handleLogin() {
    const form = document.getElementById('login-form');
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simple validation - in a real app, this would connect to a backend
    if (email && password) {
      console.log('Login attempt:', { email, password });
      // For demo purposes, redirect to dashboard
      this.showDashboard();
    }
  }

  handleSignup() {
    const form = document.getElementById('signup-form');
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simple validation - in a real app, this would connect to a backend
    if (name && email && password) {
      console.log('Signup attempt:', { name, email, password });
      // For demo purposes, redirect to dashboard
      this.showDashboard();
    }
  }

  addTask() {
    const form = document.getElementById('task-form');
    const formData = new FormData(form);
    const newTask = formData.get('new-task');
    
    if (newTask && newTask.trim()) {
      this.tasks.push(newTask.trim());
      form.reset();
      this.render();
    }
  }

  logout() {
    this.tasks = ['Finish homework', 'Call John', 'Buy groceries']; // Reset to default tasks
    this.showHome();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new TaskManager();
});