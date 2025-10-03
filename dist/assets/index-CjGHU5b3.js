(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();class n{constructor(){this.tasks=JSON.parse(localStorage.getItem("tasks"))||[],this.currentView="home",this.editingTaskId=null,this.init()}init(){this.render(),this.bindEvents()}bindEvents(){document.addEventListener("click",t=>{if(t.target.matches("[data-action]")){const e=t.target.dataset.action,a=t.target.dataset.taskId;switch(e){case"show-home":this.showHome();break;case"show-login":this.showLogin();break;case"show-signup":this.showSignup();break;case"show-dashboard":this.showDashboard();break;case"add-task":this.addTask();break;case"logout":this.logout();break;case"show-dashboard":this.showDashboard();break;case"show-add-task":this.showAddTask();break;case"add-task":this.addTask();break;case"edit-task":this.editTask(a);break;case"delete-task":this.deleteTask(a);break;case"toggle-complete":this.toggleComplete(a);break;case"cancel-edit":this.showDashboard();break;case"login":this.handleLogin();break;case"signup":this.handleSignup();break}}}),document.addEventListener("submit",t=>{t.target.matches("#task-form")?(t.preventDefault(),this.editingTaskId?this.updateTask():this.addTask()):t.target.matches("#login-form")?(t.preventDefault(),this.handleLogin()):t.target.matches("#signup-form")?(t.preventDefault(),this.handleSignup()):t.target.matches("#task-form")&&(t.preventDefault(),this.addTask())})}render(){const t=document.getElementById("app");switch(this.currentView){case"home":t.innerHTML=this.renderHome();break;case"login":t.innerHTML=this.renderLogin();break;case"signup":t.innerHTML=this.renderSignup();break;case"dashboard":t.innerHTML=this.renderDashboard();break;case"add-task":t.innerHTML=this.renderAddTask();break;case"edit-task":t.innerHTML=this.renderEditTask();break}}renderHome(){return`
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
    `}renderLogin(){return`
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
    `}renderSignup(){return`
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
    `}renderDashboard(){return`
      <div class="dashboard-container">
        <div class="dashboard-content">
          <h1 class="dashboard-title">Your Tasks</h1>
          
          <div class="task-list-container">
            <ul class="task-list">
              ${this.tasks.map(t=>`<li class="task-item">${t}</li>`).join("")}
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
    `}renderNavigation(){return`
      <nav class="nav">
        <div class="nav-container">
          <a href="#" class="nav-brand" data-action="show-dashboard">Task Manager</a>
          <ul class="nav-links">
            <li><a href="#" class="nav-link ${this.currentView==="dashboard"?"active":""}" data-action="show-dashboard">Dashboard</a></li>
            <li><a href="#" class="nav-link ${this.currentView==="add-task"?"active":""}" data-action="show-add-task">Add Task</a></li>
          </ul>
        </div>
      </nav>
    `}renderDashboard(){const t=this.tasks.filter(s=>s.completed).length,e=this.tasks.filter(s=>!s.completed).length,a=this.tasks.filter(s=>s.priority==="high"&&!s.completed).length;return`
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
            <h3 style="color: #28a745; font-size: 2rem; margin-bottom: var(--spacing-sm);">${t}</h3>
            <p class="text-muted mb-0">Completed</p>
          </div>
          <div class="card text-center">
            <h3 style="color: #ffc107; font-size: 2rem; margin-bottom: var(--spacing-sm);">${e}</h3>
            <p class="text-muted mb-0">Pending</p>
          </div>
          <div class="card text-center">
            <h3 style="color: #dc3545; font-size: 2rem; margin-bottom: var(--spacing-sm);">${a}</h3>
            <p class="text-muted mb-0">High Priority</p>
          </div>
        </div>

        <div class="card">
          <h2>Your Tasks</h2>
          ${this.tasks.length===0?`<div class="text-center" style="padding: var(--spacing-2xl);">
              <p class="text-muted" style="font-size: 1.125rem;">No tasks yet. Create your first task to get started!</p>
              <button class="btn btn-primary mt-lg" data-action="show-add-task">Create First Task</button>
            </div>`:`<ul class="task-list">
              ${this.tasks.map(s=>this.renderTaskItem(s)).join("")}
            </ul>`}
        </div>
      </div>

      ${this.renderFooter()}
    `}renderTaskItem(t){const e=`priority-${t.priority}`,a=t.completed?"task-completed":"",s=t.completed?"completed":t.status||"pending";return`
      <li class="task-item ${e} ${a}">
        <div class="task-content">
          <div class="task-title">${t.title}</div>
          ${t.description?`<div class="task-description">${t.description}</div>`:""}
          <div class="task-meta">
            <span class="status-badge status-${s}">${s}</span>
            <span>Priority: ${t.priority}</span>
            <span>Due: ${t.dueDate||"No due date"}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="btn btn-sm btn-secondary" data-action="toggle-complete" data-task-id="${t.id}">
            ${t.completed?"Undo":"Complete"}
          </button>
          <button class="btn btn-sm btn-primary" data-action="edit-task" data-task-id="${t.id}">Edit</button>
          <button class="btn btn-sm btn-danger" data-action="delete-task" data-task-id="${t.id}">Delete</button>
        </div>
      </li>
    `}renderAddTask(){return`
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
    `}renderEditTask(){const t=this.tasks.find(e=>e.id===this.editingTaskId);return t?`
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
              <input type="text" id="title" name="title" class="form-input" required value="${t.title}">
            </div>

            <div class="form-group">
              <label for="description" class="form-label">Description</label>
              <textarea id="description" name="description" class="form-textarea">${t.description||""}</textarea>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg);">
              <div class="form-group">
                <label for="priority" class="form-label">Priority</label>
                <select id="priority" name="priority" class="form-select">
                  <option value="low" ${t.priority==="low"?"selected":""}>Low</option>
                  <option value="medium" ${t.priority==="medium"?"selected":""}>Medium</option>
                  <option value="high" ${t.priority==="high"?"selected":""}>High</option>
                </select>
              </div>

              <div class="form-group">
                <label for="status" class="form-label">Status</label>
                <select id="status" name="status" class="form-select">
                  <option value="pending" ${t.status==="pending"?"selected":""}>Pending</option>
                  <option value="in-progress" ${t.status==="in-progress"?"selected":""}>In Progress</option>
                  <option value="completed" ${t.status==="completed"?"selected":""}>Completed</option>
                </select>
              </div>

              <div class="form-group">
                <label for="dueDate" class="form-label">Due Date</label>
                <input type="date" id="dueDate" name="dueDate" class="form-input" value="${t.dueDate||""}">
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
    `:this.renderDashboard()}renderFooter(){return`
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
    `}showHome(){this.currentView="home",this.editingTaskId=null,this.render()}showLogin(){this.currentView="login",this.editingTaskId=null,this.render()}showSignup(){this.currentView="signup",this.editingTaskId=null,this.render()}showDashboard(){this.currentView="dashboard",this.render()}showDashboard(){this.currentView="dashboard",this.editingTaskId=null,this.render()}showAddTask(){this.currentView="add-task",this.editingTaskId=null,this.render()}addTask(){const t=document.getElementById("task-form"),e=new FormData(t),a={id:Date.now().toString(),title:e.get("title"),description:e.get("description"),priority:e.get("priority"),status:e.get("status"),dueDate:e.get("dueDate"),completed:e.get("status")==="completed",createdAt:new Date().toISOString()};this.tasks.push(a),this.saveTasks(),this.showDashboard()}editTask(t){this.editingTaskId=t,this.currentView="edit-task",this.render()}updateTask(){const t=document.getElementById("task-form"),e=new FormData(t),a=this.tasks.findIndex(s=>s.id===this.editingTaskId);a!==-1&&(this.tasks[a]={...this.tasks[a],title:e.get("title"),description:e.get("description"),priority:e.get("priority"),status:e.get("status"),dueDate:e.get("dueDate"),completed:e.get("status")==="completed",updatedAt:new Date().toISOString()},this.saveTasks(),this.showDashboard())}deleteTask(t){confirm("Are you sure you want to delete this task?")&&(this.tasks=this.tasks.filter(e=>e.id!==t),this.saveTasks(),this.render())}toggleComplete(t){const e=this.tasks.find(a=>a.id===t);e&&(e.completed=!e.completed,e.status=e.completed?"completed":"pending",this.saveTasks(),this.render())}handleLogin(){const t=document.getElementById("login-form"),e=new FormData(t),a=e.get("email"),s=e.get("password");a&&s&&(console.log("Login attempt:",{email:a,password:s}),this.showDashboard())}handleSignup(){const t=document.getElementById("signup-form"),e=new FormData(t),a=e.get("name"),s=e.get("email"),i=e.get("password");a&&s&&i&&(console.log("Signup attempt:",{name:a,email:s,password:i}),this.showDashboard())}addTask(){const t=document.getElementById("task-form"),a=new FormData(t).get("new-task");a&&a.trim()&&(this.tasks.push(a.trim()),t.reset(),this.render())}logout(){this.tasks=["Finish homework","Call John","Buy groceries"],this.showHome()}saveTasks(){localStorage.setItem("tasks",JSON.stringify(this.tasks))}}document.addEventListener("DOMContentLoaded",()=>{new n});
