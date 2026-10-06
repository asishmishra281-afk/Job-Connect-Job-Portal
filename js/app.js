/**
 * JobConnect - Core Interactive Application Logic
 * Features: Search & multi-facet filtering, bookmarks, application tracker,
 * job posting, detail modals, responsive drawers, and light/dark theme toggle.
 */

// Application State
const AppState = {
  jobs: [],
  filteredJobs: [],
  savedJobIds: new Set(),
  applications: [],
  filters: {
    keyword: "",
    location: "",
    category: "all",
    jobTypes: [],
    experienceLevels: [],
    minSalary: 0,
    remoteOnly: false,
    studentFriendlyOnly: false
  },
  sortBy: "recent",
  viewMode: "grid",
  theme: "light",
  selectedJob: null
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadData();
  renderCategoryFilterOptions();
  renderJobTypeFilterOptions();
  renderExperienceFilterOptions();
  setupEventListeners();
  applyFiltersAndRender();
  updateNavBadges();
});

/* ===================================================================
   Theme Management
   =================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem("jobconnect_theme") || "light";
  AppState.theme = savedTheme;
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon();
}

function toggleTheme() {
  AppState.theme = AppState.theme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", AppState.theme);
  localStorage.setItem("jobconnect_theme", AppState.theme);
  updateThemeIcon();
  showToast(`Switched to ${AppState.theme} mode`, "info");
}

function updateThemeIcon() {
  const themeBtn = document.getElementById("themeToggleBtn");
  if (!themeBtn) return;
  if (AppState.theme === "dark") {
    themeBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
    `;
    themeBtn.setAttribute("title", "Switch to Light Mode");
  } else {
    themeBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    `;
    themeBtn.setAttribute("title", "Switch to Dark Mode");
  }
}

/* ===================================================================
   Data Loading & LocalStorage Persistence
   =================================================================== */
function loadData() {
  // Load custom posted jobs
  const customJobsRaw = localStorage.getItem("jobconnect_custom_jobs");
  let customJobs = [];
  if (customJobsRaw) {
    try {
      customJobs = JSON.parse(customJobsRaw);
    } catch (e) {
      console.error("Error parsing custom jobs:", e);
    }
  }

  // Combine initial jobs and custom jobs
  AppState.jobs = [...customJobs, ...INITIAL_JOBS];

  // Load Saved/Bookmarked Job IDs
  const savedIdsRaw = localStorage.getItem("jobconnect_saved_ids");
  if (savedIdsRaw) {
    try {
      AppState.savedJobIds = new Set(JSON.parse(savedIdsRaw));
    } catch (e) {
      AppState.savedJobIds = new Set();
    }
  }

  // Load Applications
  const applicationsRaw = localStorage.getItem("jobconnect_applications");
  if (applicationsRaw) {
    try {
      AppState.applications = JSON.parse(applicationsRaw);
    } catch (e) {
      AppState.applications = [];
    }
  }
}

function persistSavedJobs() {
  localStorage.setItem("jobconnect_saved_ids", JSON.stringify(Array.from(AppState.savedJobIds)));
  updateNavBadges();
}

function persistApplications() {
  localStorage.setItem("jobconnect_applications", JSON.stringify(AppState.applications));
  updateNavBadges();
}

function persistCustomJobs(newJob) {
  const customJobsRaw = localStorage.getItem("jobconnect_custom_jobs");
  let customJobs = [];
  if (customJobsRaw) {
    try {
      customJobs = JSON.parse(customJobsRaw);
    } catch (e) {}
  }
  customJobs.unshift(newJob);
  localStorage.setItem("jobconnect_custom_jobs", JSON.stringify(customJobs));
}

function updateNavBadges() {
  const savedBadge = document.getElementById("savedJobsBadge");
  const appsBadge = document.getElementById("applicationsBadge");

  if (savedBadge) {
    savedBadge.textContent = AppState.savedJobIds.size;
  }
  if (appsBadge) {
    appsBadge.textContent = AppState.applications.length;
  }
}

/* ===================================================================
   Filter UI Component Generation
   =================================================================== */
function renderCategoryFilterOptions() {
  const container = document.getElementById("categoryFilterOptions");
  if (!container) return;

  let html = "";
  CATEGORIES.forEach(cat => {
    const isChecked = AppState.filters.category === cat.id;
    const count = cat.id === "all" 
      ? AppState.jobs.length 
      : AppState.jobs.filter(j => j.category === cat.id).length;

    html += `
      <label class="filter-checkbox-label">
        <span class="filter-checkbox-left">
          <input type="radio" name="categoryFilter" value="${cat.id}" ${isChecked ? "checked" : ""}>
          <span>${cat.name}</span>
        </span>
        <span class="filter-count">${count}</span>
      </label>
    `;
  });
  container.innerHTML = html;
}

function renderJobTypeFilterOptions() {
  const container = document.getElementById("jobTypeFilterOptions");
  if (!container) return;

  let html = "";
  JOB_TYPES.forEach(type => {
    const count = AppState.jobs.filter(j => j.jobType === type).length;
    html += `
      <label class="filter-checkbox-label">
        <span class="filter-checkbox-left">
          <input type="checkbox" name="jobTypeFilter" value="${type}">
          <span>${type}</span>
        </span>
        <span class="filter-count">${count}</span>
      </label>
    `;
  });
  container.innerHTML = html;
}

function renderExperienceFilterOptions() {
  const container = document.getElementById("experienceFilterOptions");
  if (!container) return;

  let html = "";
  EXPERIENCE_LEVELS.forEach(exp => {
    const count = AppState.jobs.filter(j => j.experience === exp).length;
    html += `
      <label class="filter-checkbox-label">
        <span class="filter-checkbox-left">
          <input type="checkbox" name="experienceFilter" value="${exp}">
          <span>${exp}</span>
        </span>
        <span class="filter-count">${count}</span>
      </label>
    `;
  });
  container.innerHTML = html;
}

/* ===================================================================
   Filter, Search, and Sort Logic
   =================================================================== */
function applyFiltersAndRender() {
  let result = [...AppState.jobs];

  // 1. Keyword search (Title, Company, Description, Tags)
  if (AppState.filters.keyword.trim() !== "") {
    const query = AppState.filters.keyword.toLowerCase().trim();
    result = result.filter(job => {
      const matchTitle = job.title.toLowerCase().includes(query);
      const matchCompany = job.company.toLowerCase().includes(query);
      const matchDesc = job.description.toLowerCase().includes(query);
      const matchTags = job.tags.some(t => t.toLowerCase().includes(query));
      return matchTitle || matchCompany || matchDesc || matchTags;
    });
  }

  // 2. Location query
  if (AppState.filters.location.trim() !== "") {
    const locQuery = AppState.filters.location.toLowerCase().trim();
    result = result.filter(job => 
      job.location.toLowerCase().includes(locQuery) || 
      (locQuery === "remote" && job.isRemote)
    );
  }

  // 3. Category Filter
  if (AppState.filters.category && AppState.filters.category !== "all") {
    result = result.filter(job => job.category === AppState.filters.category);
  }

  // 4. Job Types (multi-select)
  if (AppState.filters.jobTypes.length > 0) {
    result = result.filter(job => AppState.filters.jobTypes.includes(job.jobType));
  }

  // 5. Experience Levels (multi-select)
  if (AppState.filters.experienceLevels.length > 0) {
    result = result.filter(job => AppState.filters.experienceLevels.includes(job.experience));
  }

  // 6. Minimum Salary slider
  if (AppState.filters.minSalary > 0) {
    result = result.filter(job => (job.salaryMin || 0) >= AppState.filters.minSalary);
  }

  // 7. Remote Only toggle
  if (AppState.filters.remoteOnly) {
    result = result.filter(job => job.isRemote);
  }

  // 8. Student / Fresher Friendly toggle
  if (AppState.filters.studentFriendlyOnly) {
    result = result.filter(job => 
      job.studentFriendly || 
      job.experience === "Fresher / Intern" || 
      job.jobType === "Internship"
    );
  }

  // Sorting
  if (AppState.sortBy === "recent") {
    // Custom jobs first, then initial order
    // Keep as is or sort by ID
  } else if (AppState.sortBy === "salary-high") {
    result.sort((a, b) => (b.salaryMin || 0) - (a.salaryMin || 0));
  } else if (AppState.sortBy === "company") {
    result.sort((a, b) => a.company.localeCompare(b.company));
  } else if (AppState.sortBy === "title") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  AppState.filteredJobs = result;
  renderJobListings();
  renderActiveFilterChips();
  updateResultsCount();
}

function updateResultsCount() {
  const countEl = document.getElementById("resultsCount");
  if (countEl) {
    countEl.textContent = `${AppState.filteredJobs.length} job${AppState.filteredJobs.length === 1 ? '' : 's'} available`;
  }
}

/* ===================================================================
   Render Active Filter Chips
   =================================================================== */
function renderActiveFilterChips() {
  const container = document.getElementById("activeFilterChips");
  if (!container) return;

  const chips = [];

  if (AppState.filters.keyword) {
    chips.push({
      label: `Keyword: "${AppState.filters.keyword}"`,
      clear: () => {
        AppState.filters.keyword = "";
        const input = document.getElementById("heroSearchInput");
        if (input) input.value = "";
      }
    });
  }

  if (AppState.filters.location) {
    chips.push({
      label: `Location: "${AppState.filters.location}"`,
      clear: () => {
        AppState.filters.location = "";
        const input = document.getElementById("heroLocationInput");
        if (input) input.value = "";
      }
    });
  }

  if (AppState.filters.category !== "all") {
    const catObj = CATEGORIES.find(c => c.id === AppState.filters.category);
    chips.push({
      label: `Category: ${catObj ? catObj.name : AppState.filters.category}`,
      clear: () => {
        AppState.filters.category = "all";
        const radio = document.querySelector('input[name="categoryFilter"][value="all"]');
        if (radio) radio.checked = true;
      }
    });
  }

  AppState.filters.jobTypes.forEach(type => {
    chips.push({
      label: `Type: ${type}`,
      clear: () => {
        AppState.filters.jobTypes = AppState.filters.jobTypes.filter(t => t !== type);
        const cb = document.querySelector(`input[name="jobTypeFilter"][value="${type}"]`);
        if (cb) cb.checked = false;
      }
    });
  });

  AppState.filters.experienceLevels.forEach(exp => {
    chips.push({
      label: `Exp: ${exp}`,
      clear: () => {
        AppState.filters.experienceLevels = AppState.filters.experienceLevels.filter(e => e !== exp);
        const cb = document.querySelector(`input[name="experienceFilter"][value="${exp}"]`);
        if (cb) cb.checked = false;
      }
    });
  });

  if (AppState.filters.minSalary > 0) {
    chips.push({
      label: `Min: $${(AppState.filters.minSalary / 1000).toFixed(0)}k/yr`,
      clear: () => {
        AppState.filters.minSalary = 0;
        const slider = document.getElementById("salaryRangeSlider");
        const valDisplay = document.getElementById("salaryValDisplay");
        if (slider) slider.value = 0;
        if (valDisplay) valDisplay.textContent = "$0";
      }
    });
  }

  if (AppState.filters.remoteOnly) {
    chips.push({
      label: `Remote Only`,
      clear: () => {
        AppState.filters.remoteOnly = false;
        const toggle = document.getElementById("remoteOnlyToggle");
        if (toggle) toggle.checked = false;
      }
    });
  }

  if (AppState.filters.studentFriendlyOnly) {
    chips.push({
      label: `🎓 Student Friendly`,
      clear: () => {
        AppState.filters.studentFriendlyOnly = false;
        const toggle = document.getElementById("studentFriendlyToggle");
        if (toggle) toggle.checked = false;
      }
    });
  }

  if (chips.length === 0) {
    container.innerHTML = "";
    return;
  }

  let html = chips.map((c, index) => `
    <span class="active-chip">
      ${c.label}
      <span class="active-chip-remove" data-chip-index="${index}" title="Remove filter">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    </span>
  `).join("");

  html += `
    <button class="btn btn-ghost btn-sm" id="clearAllChipsBtn" style="font-size:0.8rem; padding: 4px 8px;">
      Clear All
    </button>
  `;

  container.innerHTML = html;

  // Add click handlers for chips
  chips.forEach((c, idx) => {
    const el = container.querySelector(`[data-chip-index="${idx}"]`);
    if (el) {
      el.addEventListener("click", () => {
        c.clear();
        applyFiltersAndRender();
      });
    }
  });

  const clearAllBtn = document.getElementById("clearAllChipsBtn");
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", resetAllFilters);
  }
}

/* ===================================================================
   Render Job Cards
   =================================================================== */
function renderJobListings() {
  const container = document.getElementById("jobsContainer");
  if (!container) return;

  if (AppState.filteredJobs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h3>No matching jobs found</h3>
        <p>Try broadening your keywords, lowering salary filters, or resetting selections to see more opportunities.</p>
        <button class="btn btn-primary" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  let html = "";
  AppState.filteredJobs.forEach(job => {
    const isSaved = AppState.savedJobIds.has(job.id);
    const hasApplied = AppState.applications.some(a => a.jobId === job.id);

    html += `
      <div class="job-card ${job.featured ? 'featured-card' : ''}" data-job-id="${job.id}">
        <div class="job-card-header">
          <div class="company-logo-wrapper" style="background-color: ${job.logoBg}; color: ${job.logoColor};">
            ${job.logoText}
          </div>
          <div class="job-header-meta">
            <div class="company-name-row">
              <span>${escapeHtml(job.company)}</span>
              <span class="verified-badge" title="Verified Employer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </span>
            </div>
            <h3 class="job-title" onclick="openJobDetailModal('${job.id}')">${escapeHtml(job.title)}</h3>
          </div>
          <button class="btn-bookmark ${isSaved ? 'bookmarked' : ''}" onclick="toggleBookmark('${job.id}', event)" title="${isSaved ? 'Remove from Saved' : 'Save Job'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>

        <div class="card-badges-row">
          ${job.urgent ? '<span class="badge badge-urgent">⚡ Urgently Hiring</span>' : ''}
          ${job.featured ? '<span class="badge badge-featured">⭐ Featured</span>' : ''}
          ${job.studentFriendly ? '<span class="badge badge-student">🎓 Student Friendly</span>' : ''}
          <span class="badge badge-type">${escapeHtml(job.jobType)}</span>
          <span class="badge badge-type">${escapeHtml(job.experience)}</span>
          ${job.isRemote ? '<span class="badge badge-remote">🌐 Remote</span>' : ''}
        </div>

        <p class="job-card-description">${escapeHtml(job.description)}</p>

        <div class="job-tags-list">
          ${job.tags.slice(0, 4).map(t => `<span class="tag-item">${escapeHtml(t)}</span>`).join('')}
          ${job.tags.length > 4 ? `<span class="tag-item">+${job.tags.length - 4}</span>` : ''}
        </div>

        <div class="job-card-footer">
          <div class="salary-meta">
            <span class="salary-val">${escapeHtml(job.salary)}</span>
            <span class="location-val">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${escapeHtml(job.location)} • ${job.postedAt}
            </span>
          </div>

          <div class="card-actions-group">
            <button class="btn btn-outline btn-sm" onclick="openJobDetailModal('${job.id}')">
              Quick View
            </button>
            <button class="btn btn-primary btn-sm" onclick="openApplyModal('${job.id}')" ${hasApplied ? 'disabled style="opacity:0.75;"' : ''}>
              ${hasApplied ? '✓ Applied' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/* ===================================================================
   Bookmark / Save Job Interactions
   =================================================================== */
function toggleBookmark(jobId, event) {
  if (event) event.stopPropagation();

  const isSaved = AppState.savedJobIds.has(jobId);
  const job = AppState.jobs.find(j => j.id === jobId);
  const title = job ? job.title : "Job";

  if (isSaved) {
    AppState.savedJobIds.delete(jobId);
    showToast(`Removed "${title}" from Saved Jobs`, "info");
  } else {
    AppState.savedJobIds.add(jobId);
    showToast(`Saved "${title}" to your bookmarks`, "success");
  }

  persistSavedJobs();
  renderJobListings();
  renderSavedJobsDrawerList();
}

/* ===================================================================
   Job Details Modal
   =================================================================== */
function openJobDetailModal(jobId) {
  const job = AppState.jobs.find(j => j.id === jobId);
  if (!job) return;

  AppState.selectedJob = job;
  const isSaved = AppState.savedJobIds.has(job.id);
  const hasApplied = AppState.applications.some(a => a.jobId === job.id);

  const modalBody = document.getElementById("jobDetailBody");
  const modalFooter = document.getElementById("jobDetailFooter");

  modalBody.innerHTML = `
    <div class="detail-header-card">
      <div class="company-logo-wrapper detail-logo" style="background-color: ${job.logoBg}; color: ${job.logoColor};">
        ${job.logoText}
      </div>
      <div>
        <div class="company-name-row">
          <span style="font-size: 1rem;">${escapeHtml(job.company)}</span>
          <span class="verified-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </span>
        </div>
        <h2 class="detail-title">${escapeHtml(job.title)}</h2>
        
        <div class="card-badges-row" style="margin-top: 8px;">
          ${job.urgent ? '<span class="badge badge-urgent">⚡ Urgently Hiring</span>' : ''}
          ${job.featured ? '<span class="badge badge-featured">⭐ Featured</span>' : ''}
          ${job.studentFriendly ? '<span class="badge badge-student">🎓 Student Friendly</span>' : ''}
          <span class="badge badge-type">${escapeHtml(job.jobType)}</span>
          <span class="badge badge-type">${escapeHtml(job.experience)}</span>
          ${job.isRemote ? '<span class="badge badge-remote">🌐 Remote</span>' : ''}
        </div>

        <div class="detail-meta-list">
          <div class="detail-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <strong>Salary:</strong> ${escapeHtml(job.salary)}
          </div>
          <div class="detail-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <strong>Location:</strong> ${escapeHtml(job.location)}
          </div>
          <div class="detail-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <strong>Posted:</strong> ${job.postedAt} (${job.deadline})
          </div>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <h4>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        Role Overview
      </h4>
      <p style="color: var(--text-muted); line-height: 1.6;">${escapeHtml(job.description)}</p>
    </div>

    <div class="detail-section">
      <h4>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 11l3 3L22 4"></path>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
        Key Responsibilities
      </h4>
      <ul class="detail-list">
        ${(job.responsibilities || []).map(r => `<li>${escapeHtml(r)}</li>`).join('')}
      </ul>
    </div>

    <div class="detail-section">
      <h4>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        Requirements & Qualifications
      </h4>
      <ul class="detail-list">
        ${(job.requirements || []).map(rq => `<li>${escapeHtml(rq)}</li>`).join('')}
      </ul>
    </div>

    <div class="detail-section">
      <h4>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        Benefits & Perks
      </h4>
      <ul class="detail-list">
        ${(job.benefits || []).map(b => `<li>${escapeHtml(b)}</li>`).join('')}
      </ul>
    </div>

    <div class="detail-section" style="background-color: var(--bg-subtle); padding: 20px; border-radius: var(--radius-md);">
      <h4 style="margin-bottom: 8px;">About ${escapeHtml(job.company)}</h4>
      <p style="color: var(--text-muted); font-size: 0.92rem;">${escapeHtml(job.aboutCompany || 'A dynamic, high-growth company dedicated to empowering talent.')}</p>
    </div>
  `;

  modalFooter.innerHTML = `
    <button class="btn btn-outline" onclick="toggleBookmark('${job.id}'); openJobDetailModal('${job.id}');">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      ${isSaved ? 'Bookmarked' : 'Save Job'}
    </button>
    <button class="btn btn-primary" onclick="closeModal('jobDetailModal'); openApplyModal('${job.id}');" ${hasApplied ? 'disabled' : ''}>
      ${hasApplied ? '✓ Application Submitted' : 'Apply For This Position'}
    </button>
  `;

  openModal("jobDetailModal");
}

/* ===================================================================
   Job Application Modal & Submission
   =================================================================== */
function openApplyModal(jobId) {
  const job = AppState.jobs.find(j => j.id === jobId);
  if (!job) return;

  AppState.selectedJob = job;

  const titleEl = document.getElementById("applyModalRoleTitle");
  if (titleEl) {
    titleEl.textContent = `${job.title} at ${job.company}`;
  }

  // Pre-fill if candidate previously entered details
  const lastProfileRaw = localStorage.getItem("jobconnect_profile");
  if (lastProfileRaw) {
    try {
      const p = JSON.parse(lastProfileRaw);
      document.getElementById("applyFullName").value = p.fullName || "";
      document.getElementById("applyEmail").value = p.email || "";
      document.getElementById("applyPhone").value = p.phone || "";
      document.getElementById("applyLinkedin").value = p.linkedin || "";
    } catch(e) {}
  }

  // Reset file input
  const fileInput = document.getElementById("resumeFileInput");
  if (fileInput) fileInput.value = "";
  const filenameDisplay = document.getElementById("resumeFileNameDisplay");
  if (filenameDisplay) filenameDisplay.textContent = "";

  openModal("applyModal");
}

function handleApplicationSubmit(e) {
  e.preventDefault();

  if (!AppState.selectedJob) return;

  const fullName = document.getElementById("applyFullName").value.trim();
  const email = document.getElementById("applyEmail").value.trim();
  const phone = document.getElementById("applyPhone").value.trim();
  const linkedin = document.getElementById("applyLinkedin").value.trim();
  const portfolio = document.getElementById("applyPortfolio").value.trim();
  const coverNote = document.getElementById("applyCoverNote").value.trim();
  const fileInput = document.getElementById("resumeFileInput");

  if (!fullName || !email) {
    showToast("Please provide your name and email address", "error");
    return;
  }

  // Save profile to local storage for convenience
  localStorage.setItem("jobconnect_profile", JSON.stringify({
    fullName, email, phone, linkedin
  }));

  const applicationRecord = {
    id: "app-" + Date.now(),
    jobId: AppState.selectedJob.id,
    jobTitle: AppState.selectedJob.title,
    company: AppState.selectedJob.company,
    appliedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    status: "Under Review",
    applicant: {
      fullName,
      email,
      phone,
      linkedin,
      portfolio,
      hasResume: fileInput && fileInput.files.length > 0 ? fileInput.files[0].name : "Resume_Attached.pdf"
    }
  };

  // Add to applications
  AppState.applications.unshift(applicationRecord);
  persistApplications();

  closeModal("applyModal");
  showToast(`🎉 Application successfully submitted to ${AppState.selectedJob.company}!`, "success");

  // Re-render feed so the button updates to "Applied"
  renderJobListings();
}

/* ===================================================================
   Drawers: Saved Jobs & My Applications
   =================================================================== */
function openSavedJobsDrawer() {
  renderSavedJobsDrawerList();
  openDrawer("savedJobsDrawer");
}

function renderSavedJobsDrawerList() {
  const container = document.getElementById("savedJobsDrawerBody");
  if (!container) return;

  const savedJobs = AppState.jobs.filter(j => AppState.savedJobIds.has(j.id));

  if (savedJobs.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 40px 10px;">
        <div class="empty-state-icon" style="width: 54px; height: 54px;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h4>No saved jobs yet</h4>
        <p>Click the bookmark icon on any job card to save it for later review.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = savedJobs.map(job => `
    <div class="drawer-card-item">
      <div class="drawer-item-header">
        <div>
          <h4 class="drawer-item-title">${escapeHtml(job.title)}</h4>
          <span class="drawer-item-company">${escapeHtml(job.company)} • ${escapeHtml(job.location)}</span>
        </div>
        <button class="btn-icon btn-sm" onclick="toggleBookmark('${job.id}')" title="Remove">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="drawer-item-meta">
        <span style="font-weight: 700; color: var(--primary);">${escapeHtml(job.salary)}</span>
        <span>${escapeHtml(job.jobType)}</span>
      </div>
      <div style="display: flex; gap: 8px; margin-top: 4px;">
        <button class="btn btn-outline btn-sm" style="flex:1;" onclick="closeDrawer('savedJobsDrawer'); openJobDetailModal('${job.id}')">
          View Details
        </button>
        <button class="btn btn-primary btn-sm" style="flex:1;" onclick="closeDrawer('savedJobsDrawer'); openApplyModal('${job.id}')">
          Apply Now
        </button>
      </div>
    </div>
  `).join("");
}

function openApplicationsDrawer() {
  renderApplicationsDrawerList();
  openDrawer("applicationsDrawer");
}

function renderApplicationsDrawerList() {
  const container = document.getElementById("applicationsDrawerBody");
  if (!container) return;

  if (AppState.applications.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 40px 10px;">
        <div class="empty-state-icon" style="width: 54px; height: 54px;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <h4>No active applications</h4>
        <p>You haven't submitted any job applications yet. Find your dream role and apply today!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.applications.map(app => `
    <div class="drawer-card-item">
      <div class="drawer-item-header">
        <div>
          <h4 class="drawer-item-title">${escapeHtml(app.jobTitle)}</h4>
          <span class="drawer-item-company">${escapeHtml(app.company)}</span>
        </div>
        <span class="status-badge reviewing">${escapeHtml(app.status)}</span>
      </div>
      <div class="drawer-item-meta">
        <span>Applied on: ${app.appliedAt}</span>
        <span>📎 ${escapeHtml(app.applicant.hasResume)}</span>
      </div>
    </div>
  `).join("");
}

/* ===================================================================
   Post a Job Modal & Submission
   =================================================================== */
function handlePostJobSubmit(e) {
  e.preventDefault();

  const title = document.getElementById("postJobTitle").value.trim();
  const company = document.getElementById("postJobCompany").value.trim();
  const category = document.getElementById("postJobCategory").value;
  const jobType = document.getElementById("postJobType").value;
  const experience = document.getElementById("postJobExperience").value;
  const salary = document.getElementById("postJobSalary").value.trim() || "$70,000 - $90,000 / yr";
  const salaryMin = parseInt(document.getElementById("postJobSalaryMin").value, 10) || 70000;
  const location = document.getElementById("postJobLocation").value.trim() || "Remote";
  const isRemote = document.getElementById("postJobRemote").checked;
  const studentFriendly = document.getElementById("postJobStudent").checked;
  const tagsStr = document.getElementById("postJobTags").value.trim();
  const description = document.getElementById("postJobDesc").value.trim();

  if (!title || !company || !description) {
    showToast("Please fill in the required fields (Title, Company, Description)", "error");
    return;
  }

  const tags = tagsStr ? tagsStr.split(",").map(t => t.trim()).filter(Boolean) : ["General"];

  // Random vibrant monogram color
  const palette = [
    { bg: "#e0e7ff", color: "#4f46e5" },
    { bg: "#fce7f3", color: "#ec4899" },
    { bg: "#d1fae5", color: "#059669" },
    { bg: "#fef3c7", color: "#d97706" },
    { bg: "#ede9fe", color: "#8b5cf6" },
    { bg: "#ccfbf1", color: "#0d9488" }
  ];
  const chosenScheme = palette[Math.floor(Math.random() * palette.length)];
  const monogram = company.substring(0, 2).toUpperCase();

  const newJob = {
    id: "job-" + Date.now(),
    title,
    company,
    logoBg: chosenScheme.bg,
    logoColor: chosenScheme.color,
    logoText: monogram,
    location,
    isRemote,
    jobType,
    experience,
    category,
    salary,
    salaryMin,
    postedAt: "Just now",
    deadline: "30 days left",
    tags,
    featured: true,
    urgent: false,
    studentFriendly,
    description,
    responsibilities: [
      "Collaborate with dynamic team members to accomplish product and mission goals.",
      "Bring fresh perspectives, creativity, and proactive problem solving.",
      "Participate actively in regular planning and feedback sessions."
    ],
    requirements: [
      "Passion for high standards, continuous learning, and accountability.",
      "Demonstrated experience or personal portfolio projects aligned with the role.",
      "Clear communication and teamwork mindset."
    ],
    benefits: [
      "Competitive compensation package and learning allowances.",
      "Flexible working schedule and collaborative environment.",
      "Mentorship and accelerated career opportunities."
    ],
    aboutCompany: `${company} is an innovative organization focused on driving excellence and creating positive impact.`
  };

  AppState.jobs.unshift(newJob);
  persistCustomJobs(newJob);

  // Reset form
  e.target.reset();
  closeModal("postJobModal");
  showToast(`🎉 "${title}" successfully posted!`, "success");

  // Re-render category and filter counts
  renderCategoryFilterOptions();
  renderJobTypeFilterOptions();
  renderExperienceFilterOptions();
  applyFiltersAndRender();
}

/* ===================================================================
   Event Listeners Setup
   =================================================================== */
function setupEventListeners() {
  // Theme toggle button
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Hero Search Form
  const heroSearchForm = document.getElementById("heroSearchForm");
  if (heroSearchForm) {
    heroSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const kw = document.getElementById("heroSearchInput").value;
      const loc = document.getElementById("heroLocationInput").value;
      const cat = document.getElementById("heroCategorySelect").value;

      AppState.filters.keyword = kw;
      AppState.filters.location = loc;
      if (cat) {
        AppState.filters.category = cat;
        const radio = document.querySelector(`input[name="categoryFilter"][value="${cat}"]`);
        if (radio) radio.checked = true;
      }
      applyFiltersAndRender();

      // Smooth scroll to results
      const feedEl = document.getElementById("portalFeedAnchor");
      if (feedEl) {
        feedEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Trending Pill Tags
  const trendingPills = document.querySelectorAll(".trending-pill");
  trendingPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const type = pill.dataset.filterType;
      const val = pill.dataset.filterValue;

      if (type === "category") {
        AppState.filters.category = val;
        const radio = document.querySelector(`input[name="categoryFilter"][value="${val}"]`);
        if (radio) radio.checked = true;
      } else if (type === "student") {
        AppState.filters.studentFriendlyOnly = true;
        const toggle = document.getElementById("studentFriendlyToggle");
        if (toggle) toggle.checked = true;
      } else if (type === "remote") {
        AppState.filters.remoteOnly = true;
        const toggle = document.getElementById("remoteOnlyToggle");
        if (toggle) toggle.checked = true;
      } else if (type === "keyword") {
        AppState.filters.keyword = val;
        const input = document.getElementById("heroSearchInput");
        if (input) input.value = val;
      }

      applyFiltersAndRender();
      const feedEl = document.getElementById("portalFeedAnchor");
      if (feedEl) {
        feedEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Category Radio Change
  const catOptionsContainer = document.getElementById("categoryFilterOptions");
  if (catOptionsContainer) {
    catOptionsContainer.addEventListener("change", (e) => {
      if (e.target.name === "categoryFilter") {
        AppState.filters.category = e.target.value;
        applyFiltersAndRender();
      }
    });
  }

  // Job Type Checkboxes
  const jobTypeContainer = document.getElementById("jobTypeFilterOptions");
  if (jobTypeContainer) {
    jobTypeContainer.addEventListener("change", () => {
      const checked = Array.from(document.querySelectorAll('input[name="jobTypeFilter"]:checked')).map(cb => cb.value);
      AppState.filters.jobTypes = checked;
      applyFiltersAndRender();
    });
  }

  // Experience Checkboxes
  const expContainer = document.getElementById("experienceFilterOptions");
  if (expContainer) {
    expContainer.addEventListener("change", () => {
      const checked = Array.from(document.querySelectorAll('input[name="experienceFilter"]:checked')).map(cb => cb.value);
      AppState.filters.experienceLevels = checked;
      applyFiltersAndRender();
    });
  }

  // Salary Range Slider
  const salarySlider = document.getElementById("salaryRangeSlider");
  const salaryDisplay = document.getElementById("salaryValDisplay");
  if (salarySlider && salaryDisplay) {
    salarySlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      AppState.filters.minSalary = val;
      salaryDisplay.textContent = val === 0 ? "$0" : `$${(val / 1000).toFixed(0)}k/yr`;
      applyFiltersAndRender();
    });
  }

  // Remote Only Toggle
  const remoteToggle = document.getElementById("remoteOnlyToggle");
  if (remoteToggle) {
    remoteToggle.addEventListener("change", (e) => {
      AppState.filters.remoteOnly = e.target.checked;
      applyFiltersAndRender();
    });
  }

  // Student Friendly Toggle
  const studentToggle = document.getElementById("studentFriendlyToggle");
  if (studentToggle) {
    studentToggle.addEventListener("change", (e) => {
      AppState.filters.studentFriendlyOnly = e.target.checked;
      applyFiltersAndRender();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      AppState.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }

  // View Mode Buttons (Grid vs List)
  const gridViewBtn = document.getElementById("viewGridBtn");
  const listViewBtn = document.getElementById("viewListBtn");
  const jobsContainer = document.getElementById("jobsContainer");

  if (gridViewBtn && listViewBtn && jobsContainer) {
    gridViewBtn.addEventListener("click", () => {
      AppState.viewMode = "grid";
      gridViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
      jobsContainer.classList.remove("list-view");
      jobsContainer.classList.add("grid-view");
    });

    listViewBtn.addEventListener("click", () => {
      AppState.viewMode = "list";
      listViewBtn.classList.add("active");
      gridViewBtn.classList.remove("active");
      jobsContainer.classList.remove("grid-view");
      jobsContainer.classList.add("list-view");
    });
  }

  // Reset Filters Button
  const resetBtn = document.getElementById("resetFiltersBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetAllFilters);
  }

  // Mobile Filter Drawer Toggle
  const mobileFilterOpenBtn = document.getElementById("mobileFilterOpenBtn");
  const filterSidebar = document.getElementById("filterSidebar");
  const mobileFilterCloseBtn = document.getElementById("mobileFilterCloseBtn");

  if (mobileFilterOpenBtn && filterSidebar) {
    mobileFilterOpenBtn.addEventListener("click", () => {
      filterSidebar.classList.add("open");
    });
  }
  if (mobileFilterCloseBtn && filterSidebar) {
    mobileFilterCloseBtn.addEventListener("click", () => {
      filterSidebar.classList.remove("open");
    });
  }

  // Navigation Links
  const navSavedBtn = document.getElementById("navSavedBtn");
  if (navSavedBtn) {
    navSavedBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSavedJobsDrawer();
    });
  }

  const navAppsBtn = document.getElementById("navAppsBtn");
  if (navAppsBtn) {
    navAppsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openApplicationsDrawer();
    });
  }

  const navPostJobBtn = document.getElementById("navPostJobBtn");
  if (navPostJobBtn) {
    navPostJobBtn.addEventListener("click", () => {
      openModal("postJobModal");
    });
  }

  // Application Form Submit
  const applyForm = document.getElementById("applyJobForm");
  if (applyForm) {
    applyForm.addEventListener("submit", handleApplicationSubmit);
  }

  // Post Job Form Submit
  const postJobForm = document.getElementById("postJobForm");
  if (postJobForm) {
    postJobForm.addEventListener("submit", handlePostJobSubmit);
  }

  // Resume File Drag & Drop Setup
  setupResumeDropzone();

  // Modal Backdrop Close
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // Drawer Backdrop Close
  document.querySelectorAll(".drawer-overlay").forEach(overlay => {
    overlay.addEventListener("click", () => {
      document.querySelectorAll(".drawer-overlay").forEach(o => o.classList.remove("active"));
      document.querySelectorAll(".drawer-panel").forEach(p => p.classList.remove("active"));
    });
  });

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thank you for subscribing to JobConnect alerts!", "success");
      newsletterForm.reset();
    });
  }
}

/* ===================================================================
   Reset Filters
   =================================================================== */
function resetAllFilters() {
  AppState.filters = {
    keyword: "",
    location: "",
    category: "all",
    jobTypes: [],
    experienceLevels: [],
    minSalary: 0,
    remoteOnly: false,
    studentFriendlyOnly: false
  };

  // Reset inputs in DOM
  const searchInput = document.getElementById("heroSearchInput");
  if (searchInput) searchInput.value = "";

  const locInput = document.getElementById("heroLocationInput");
  if (locInput) locInput.value = "";

  const catSelect = document.getElementById("heroCategorySelect");
  if (catSelect) catSelect.value = "";

  const allCatRadio = document.querySelector('input[name="categoryFilter"][value="all"]');
  if (allCatRadio) allCatRadio.checked = true;

  document.querySelectorAll('input[name="jobTypeFilter"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('input[name="experienceFilter"]').forEach(cb => cb.checked = false);

  const slider = document.getElementById("salaryRangeSlider");
  const salaryDisplay = document.getElementById("salaryValDisplay");
  if (slider) slider.value = 0;
  if (salaryDisplay) salaryDisplay.textContent = "$0";

  const remoteToggle = document.getElementById("remoteOnlyToggle");
  if (remoteToggle) remoteToggle.checked = false;

  const studentToggle = document.getElementById("studentFriendlyToggle");
  if (studentToggle) studentToggle.checked = false;

  applyFiltersAndRender();
  showToast("All filters have been reset", "info");
}

/* ===================================================================
   Modal & Drawer Helper Functions
   =================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function openDrawer(drawerId) {
  const overlay = document.getElementById(drawerId + "Overlay");
  const panel = document.getElementById(drawerId + "Panel");
  if (overlay && panel) {
    overlay.classList.add("active");
    panel.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeDrawer(drawerId) {
  const overlay = document.getElementById(drawerId + "Overlay");
  const panel = document.getElementById(drawerId + "Panel");
  if (overlay && panel) {
    overlay.classList.remove("active");
    panel.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/* ===================================================================
   Resume File Upload Handling
   =================================================================== */
function setupResumeDropzone() {
  const dropzone = document.getElementById("resumeDropzone");
  const fileInput = document.getElementById("resumeFileInput");
  const filenameDisplay = document.getElementById("resumeFileNameDisplay");

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      filenameDisplay.textContent = `✓ Selected: ${fileInput.files[0].name} (${(fileInput.files[0].size / 1024).toFixed(1)} KB)`;
    }
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragover");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      fileInput.files = e.dataTransfer.files;
      filenameDisplay.textContent = `✓ Attached: ${e.dataTransfer.files[0].name} (${(e.dataTransfer.files[0].size / 1024).toFixed(1)} KB)`;
    }
  });
}

/* ===================================================================
   Toast Notification Generator
   =================================================================== */
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : ''}`;
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--success);"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--danger);"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  } else {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary);"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "all 0.3s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ===================================================================
   Utility: XSS Escape
   =================================================================== */
function escapeHtml(text) {
  if (typeof text !== "string") return text;
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
