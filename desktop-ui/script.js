// Settings Window Controls
document.addEventListener('DOMContentLoaded', function() {
    const settingsIcon = document.getElementById('settings-icon');
    const settingsContainer = document.getElementById('settings-window-container');
    const settingsWindow = document.getElementById('settings-window');
    const windowHeader = document.querySelector('.window-header');
    let isMaximized = false;
    let isResizing = false;
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };
    
    // Open/Close Settings window from icon
    if (settingsIcon && settingsContainer) {
        settingsIcon.addEventListener('click', function() {
            if (settingsContainer.style.display === 'none' || !settingsContainer.style.display) {
                openSettingsWindow();
            } else {
                closeSettingsWindow();
            }
        });
    }
    
    // Open Settings window
    function openSettingsWindow() {
        if (settingsContainer && settingsWindow) {
            settingsContainer.style.display = 'flex';
            settingsWindow.style.animation = 'windowAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }
    
    // Close Settings window
    function closeSettingsWindow() {
        if (settingsContainer && settingsWindow) {
            settingsWindow.style.animation = 'windowDisappear 0.2s ease';
            setTimeout(() => {
                settingsContainer.style.display = 'none';
                // Reset window state
                if (isMaximized) {
                    toggleMaximize();
                }
            }, 200);
        }
    }
    
    // Window close button
    const closeBtn = document.querySelector('.window-control-btn.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeSettingsWindow();
        });
    }
    
    // Window minimize button
    const minimizeBtn = document.querySelector('.window-control-btn.minimize');
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (settingsWindow) {
                settingsWindow.style.transform = 'scale(0.8)';
                settingsWindow.style.opacity = '0.7';
                setTimeout(() => {
                    settingsWindow.style.transform = '';
                    settingsWindow.style.opacity = '';
                }, 300);
            }
        });
    }
    
    // Window maximize button
    const maximizeBtn = document.querySelector('.window-control-btn.maximize');
    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMaximize();
        });
    }
    
    // Toggle maximize
    function toggleMaximize() {
        if (!settingsWindow) return;
        
        if (isMaximized) {
            // Restore
            settingsWindow.style.width = '80%';
            settingsWindow.style.height = '85%';
            settingsWindow.style.maxWidth = '1200px';
            settingsWindow.style.maxHeight = '900px';
            settingsWindow.style.left = '335px';
            settingsWindow.style.top = '245px';
            settingsWindow.style.resize = 'both';
        } else {
            // Maximize
            settingsWindow.style.width = 'calc(100vw - 40px)';
            settingsWindow.style.height = 'calc(100vh - 88px)';
            settingsWindow.style.maxWidth = 'none';
            settingsWindow.style.maxHeight = 'none';
            settingsWindow.style.left = '20px';
            settingsWindow.style.top = '68px';
            settingsWindow.style.resize = 'none';
        }
        isMaximized = !isMaximized;
    }
    
    // Handle window resize
    if (settingsWindow) {
        let resizeTimeout;
        settingsWindow.addEventListener('mousedown', function(e) {
            // Check if clicking on resize handle (bottom-right corner)
            const rect = settingsWindow.getBoundingClientRect();
            const isResizeHandle = (
                e.clientX > rect.right - 20 &&
                e.clientY > rect.bottom - 20
            );
            
            if (isResizeHandle) {
                isResizing = true;
                settingsWindow.classList.add('resizing');
            }
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isResizing && settingsWindow) {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    // Window is being resized by CSS resize property
                    // Just update the class
                }, 100);
            }
        });
        
        document.addEventListener('mouseup', function() {
            if (isResizing) {
                isResizing = false;
                if (settingsWindow) {
                    settingsWindow.classList.remove('resizing');
                }
            }
        });
    }
    
    // Close window when clicking outside (on container background)
    if (settingsContainer) {
        settingsContainer.addEventListener('click', function(e) {
            if (e.target === settingsContainer) {
                closeSettingsWindow();
            }
        });
    }
    
    // Prevent window clicks from closing
    if (settingsWindow) {
        settingsWindow.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Window drag functionality
    if (windowHeader && settingsWindow) {
        windowHeader.addEventListener('mousedown', function(e) {
            // Don't drag if clicking on controls
            if (e.target.closest('.window-controls')) {
                return;
            }
            
            if (isMaximized) {
                return; // Don't drag when maximized
            }
            
            isDragging = true;
            const rect = settingsWindow.getBoundingClientRect();
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;
            settingsWindow.style.cursor = 'move';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging && !isMaximized && settingsWindow) {
                const newX = e.clientX - dragOffset.x;
                const newY = e.clientY - dragOffset.y;
                
                // Keep window within viewport
                const maxX = window.innerWidth - settingsWindow.offsetWidth;
                const maxY = window.innerHeight - settingsWindow.offsetHeight;
                
                settingsWindow.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
                settingsWindow.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
            }
        });
        
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                if (settingsWindow) {
                    settingsWindow.style.cursor = '';
                }
            }
        });
    }
});

// Navigation and Page Switching
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const pageContents = document.querySelectorAll('.page-content');
    let currentNavIndex = 0;
    
    // Make nav items focusable for keyboard navigation
    navItems.forEach(item => {
        item.setAttribute('tabindex', '0');
    });
    
    // Initialize: Show first page (General) and set active nav item
    const firstNavItem = navItems[0];
    const firstPageId = firstNavItem.getAttribute('data-page');
    firstNavItem.classList.add('active');
    document.getElementById(firstPageId).style.display = 'block';
    
    // Function to switch pages
    function switchPage(targetPageId, navItem) {
        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        if (navItem) {
            navItem.classList.add('active');
            currentNavIndex = Array.from(navItems).indexOf(navItem);
        }
        
        // Hide all page contents
        pageContents.forEach(page => {
            page.style.display = 'none';
        });
        
        // Show target page with fade animation
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
            targetPage.style.display = 'block';
            
            // Scroll to top of content area
            document.querySelector('.content-area').scrollTop = 0;
        }
    }
    
    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPageId = this.getAttribute('data-page');
            switchPage(targetPageId, this);
        });
        
        // Handle keyboard navigation (Enter/Space)
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetPageId = this.getAttribute('data-page');
                switchPage(targetPageId, this);
            }
        });
    });
    
    // Keyboard navigation (Arrow keys)
    document.addEventListener('keydown', function(e) {
        const visibleNavItems = Array.from(navItems).filter(item => 
            !item.classList.contains('hidden')
        );
        
        if (visibleNavItems.length === 0) return;
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            
            if (e.key === 'ArrowDown') {
                currentNavIndex = (currentNavIndex + 1) % visibleNavItems.length;
            } else {
                currentNavIndex = (currentNavIndex - 1 + visibleNavItems.length) % visibleNavItems.length;
            }
            
            visibleNavItems[currentNavIndex].focus();
            const targetPageId = visibleNavItems[currentNavIndex].getAttribute('data-page');
            switchPage(targetPageId, visibleNavItems[currentNavIndex]);
        }
    });
    
    // Handle theme change (apply immediately)
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            console.log('Theme changed to:', this.value);
            showNotification('Theme preference saved.', 'success');
        });
    }
    
    // Handle language change (apply immediately)
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            console.log('Language changed to:', this.value);
            showNotification('Language preference saved. UI will reload.', 'success');
        });
    }
    
    // Handle time zone auto-detection and manual selection
    const timezoneSelect = document.getElementById('timezone-select');
    const timezoneAutoToggle = document.getElementById('timezone-auto-toggle');
    const timezoneDisplay = document.getElementById('timezone-display');
    
    // Get current timezone
    function getCurrentTimezone() {
        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const offset = -new Date().getTimezoneOffset() / 60;
            const offsetStr = offset >= 0 ? `+${offset}` : `${offset}`;
            
            // Get city name from timezone
            const cityName = timezone.split('/').pop().replace('_', ' ');
            
            return {
                timezone: timezone,
                offset: offsetStr,
                cityName: cityName,
                display: `(GMT${offsetStr}:00) ${cityName}`
            };
        } catch (e) {
            // Fallback to Asia/Seoul
            return {
                timezone: 'Asia/Seoul',
                offset: '+9',
                cityName: 'Seoul',
                display: '(GMT+9:00) Seoul'
            };
        }
    }
    
    // Update timezone display
    function updateTimezoneDisplay(tzInfo) {
        if (timezoneDisplay) {
            timezoneDisplay.textContent = `Current: ${tzInfo.display}`;
        }
        if (timezoneSelect) {
            // Set the select value to match current timezone
            const option = Array.from(timezoneSelect.options).find(opt => opt.value === tzInfo.timezone);
            if (option) {
                timezoneSelect.value = tzInfo.timezone;
            }
        }
    }
    
    // Initialize timezone
    const currentTz = getCurrentTimezone();
    updateTimezoneDisplay(currentTz);
    
    // Handle auto-toggle
    if (timezoneAutoToggle) {
        timezoneAutoToggle.addEventListener('change', function() {
            const isAuto = this.checked;
            
            if (timezoneSelect) {
                timezoneSelect.disabled = isAuto;
                
                if (isAuto) {
                    // Use current location
                    const tzInfo = getCurrentTimezone();
                    updateTimezoneDisplay(tzInfo);
                    showNotification('Time zone set to current location.', 'success');
                } else {
                    // Allow manual selection
                    showNotification('Time zone set to manual selection.', 'info');
                }
            }
        });
    }
    
    // Handle manual timezone change
    if (timezoneSelect) {
        timezoneSelect.addEventListener('change', function() {
            if (!timezoneAutoToggle || !timezoneAutoToggle.checked) {
                const selectedOption = this.options[this.selectedIndex];
                const timezone = this.value;
                
                // Try to extract offset from option text or calculate
                const offset = getTimezoneOffset(timezone);
                const cityName = timezone.split('/').pop().replace('_', ' ');
                const display = `(GMT${offset}:00) ${cityName}`;
                
                if (timezoneDisplay) {
                    timezoneDisplay.textContent = `Current: ${display}`;
                }
                
                console.log('Time zone changed to:', timezone);
                showNotification('Time zone preference saved. Changes will apply on save.', 'info');
            }
        });
    }
    
    // Helper function to get timezone offset
    function getTimezoneOffset(timezone) {
        // Common timezone offsets (simplified)
        const offsets = {
            'UTC': '+0',
            'America/New_York': '-5',
            'America/Chicago': '-6',
            'America/Denver': '-7',
            'America/Los_Angeles': '-8',
            'Europe/London': '+0',
            'Europe/Paris': '+1',
            'Asia/Tokyo': '+9',
            'Asia/Seoul': '+9',
            'Asia/Shanghai': '+8',
            'Australia/Sydney': '+10'
        };
        
        return offsets[timezone] || '+0';
    }
    
    // Handle Change Password button
    const changePasswordBtn = document.querySelector('#account .auth-action-group .btn-primary');
    if (changePasswordBtn && changePasswordBtn.textContent.includes('Change Password')) {
        changePasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Password change dialog would open here.', 'info');
        });
    }
    
    // Handle Manage MFA button
    const manageMFABtn = document.querySelectorAll('#account .auth-action-group .btn-primary');
    manageMFABtn.forEach(btn => {
        if (btn.textContent.includes('Manage MFA')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('MFA management dialog would open here.', 'info');
            });
        }
    });
    
    // Handle Logout button
    const logoutBtn = document.getElementById('logout-btn');
    const logoutModal = document.getElementById('logout-modal');
    const logoutCancelBtn = document.getElementById('logout-cancel-btn');
    const logoutConfirmBtn = document.getElementById('logout-confirm-btn');
    
    if (logoutBtn && logoutModal) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutModal.style.display = 'flex';
        });
        
        if (logoutCancelBtn) {
            logoutCancelBtn.addEventListener('click', function() {
                logoutModal.style.display = 'none';
            });
        }
        
        if (logoutConfirmBtn) {
            logoutConfirmBtn.addEventListener('click', function() {
                logoutModal.style.display = 'none';
                showNotification('Logging out...', 'info');
                // In a real app, this would redirect to login
                setTimeout(() => {
                    showNotification('Redirecting to login screen...', 'info');
                }, 1000);
            });
        }
        
        // Close modal on overlay click
        logoutModal.addEventListener('click', function(e) {
            if (e.target === logoutModal) {
                logoutModal.style.display = 'none';
            }
        });
    }
    
    // Handle Add SSH Key button
    const addSSHKeyBtn = document.getElementById('add-ssh-key-btn');
    if (addSSHKeyBtn) {
        addSSHKeyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('SSH key upload dialog would open here.', 'info');
        });
    }
    
    // Handle Delete SSH Key buttons
    const deleteSSHKeyBtns = document.querySelectorAll('.btn-delete-key');
    deleteSSHKeyBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const keyName = row.querySelector('td:first-child').textContent;
            
            if (confirm(`Are you sure you want to delete the SSH key "${keyName}"?`)) {
                row.classList.add('loading');
                btn.textContent = 'Deleting...';
                btn.disabled = true;
                
                setTimeout(() => {
                    row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    row.style.opacity = '0';
                    row.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        row.remove();
                        showNotification('SSH key deleted successfully.', 'success');
                    }, 300);
                }, 1000);
            }
        });
    });
    
    // Handle Upload Certificate button
    const uploadCertBtn = document.getElementById('upload-cert-btn');
    if (uploadCertBtn) {
        uploadCertBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Certificate upload dialog would open here.', 'info');
        });
    }
    
    // Handle Delete Certificate buttons
    const deleteCertBtns = document.querySelectorAll('.btn-delete-cert');
    deleteCertBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const certName = row.querySelector('td:first-child').textContent;
            
            if (confirm(`Are you sure you want to delete the certificate "${certName}"?`)) {
                row.classList.add('loading');
                btn.textContent = 'Deleting...';
                btn.disabled = true;
                
                setTimeout(() => {
                    row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    row.style.opacity = '0';
                    row.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        row.remove();
                        showNotification('Certificate deleted successfully.', 'success');
                    }, 300);
                }, 1000);
            }
        });
    });
    
    // Handle notification preference checkboxes
    const notificationCheckboxes = document.querySelectorAll('#notifications input[type="checkbox"]');
    notificationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.checkbox-option').querySelector('.checkbox-label').textContent;
            console.log(`Notification ${this.checked ? 'enabled' : 'disabled'} for ${label}`);
            showNotification('Notification preferences updated.', 'success');
        });
    });
    
    // Add smooth scroll behavior
    document.querySelector('.content-area').style.scrollBehavior = 'smooth';
    
    // Keyboard shortcuts
    const keyboardHint = document.getElementById('keyboard-hint');
    
    document.addEventListener('keydown', function(e) {
        // Show keyboard hints
        if (e.key === '?') {
            e.preventDefault();
            showKeyboardHint('Keyboard shortcuts: <kbd>↑↓</kbd> Navigate, <kbd>Esc</kbd> Close');
        }
    });
    
    // Show keyboard hint function
    function showKeyboardHint(message) {
        if (keyboardHint) {
            keyboardHint.innerHTML = message;
            keyboardHint.classList.add('show');
            setTimeout(() => {
                keyboardHint.classList.remove('show');
            }, 3000);
        }
    }
    
    // Show initial hint on load
    setTimeout(() => {
        showKeyboardHint('Press <kbd>?</kbd> for keyboard shortcuts');
    }, 2000);
});

// Notification system
const notificationQueue = [];
let notificationActive = false;

function showNotification(message, type = 'info', duration = 3000) {
    const notification = {
        message,
        type,
        duration,
        id: Date.now()
    };
    
    notificationQueue.push(notification);
    processNotificationQueue();
}

function processNotificationQueue() {
    if (notificationActive || notificationQueue.length === 0) {
        return;
    }
    
    notificationActive = true;
    const notification = notificationQueue.shift();
    
    // Create notification element
    const notificationEl = document.createElement('div');
    notificationEl.className = `toast-notification toast-${notification.type}`;
    notificationEl.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${getNotificationIcon(notification.type)}</span>
            <span class="toast-message">${notification.message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notificationEl);
    
    // Trigger animation
    requestAnimationFrame(() => {
        notificationEl.classList.add('show');
    });
    
    // Remove after duration
    setTimeout(() => {
        notificationEl.classList.remove('show');
        setTimeout(() => {
            notificationEl.remove();
            notificationActive = false;
            processNotificationQueue();
        }, 300);
    }, notification.duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

// Add notification styles if not already added
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .toast-notification {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #1d1d1f;
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(120%);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: 280px;
            max-width: 400px;
        }
        
        .toast-notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .toast-icon {
            font-size: 16px;
            font-weight: 600;
            flex-shrink: 0;
        }
        
        .toast-message {
            flex: 1;
            line-height: 1.4;
        }
        
        .toast-success {
            background: #34c759;
        }
        
        .toast-error {
            background: #ff3b30;
        }
        
        .toast-warning {
            background: #ff9500;
        }
        
        .toast-info {
            background: #007aff;
        }
    `;
    document.head.appendChild(style);
}

// AI Chatbot Implementation
(function() {
    'use strict';
    
    // State Management
    let chatbotState = {
        isOpen: false,
        currentSessionId: null,
        sessions: [],
        messages: {}
    };
    
    // Load state from localStorage
    function loadChatbotState() {
        try {
            const saved = localStorage.getItem('chatbotState');
            if (saved) {
                const parsed = JSON.parse(saved);
                chatbotState.sessions = parsed.sessions || [];
                chatbotState.messages = parsed.messages || {};
                chatbotState.currentSessionId = parsed.currentSessionId || null;
            }
        } catch (e) {
            console.error('Failed to load chatbot state:', e);
        }
    }
    
    // Save state to localStorage
    function saveChatbotState() {
        try {
            localStorage.setItem('chatbotState', JSON.stringify(chatbotState));
        } catch (e) {
            console.error('Failed to save chatbot state:', e);
        }
    }
    
    // Initialize
    function initChatbot() {
        loadChatbotState();
        
        const panel = document.getElementById('chatbot-panel');
        const toggleBtn = document.getElementById('chatbot-toggle-btn');
        const closeBtn = document.getElementById('chatbot-close-btn');
        const backBtn = document.getElementById('chatbot-back-btn');
        const input = document.getElementById('chatbot-input');
        const sendBtn = document.getElementById('chatbot-send-btn');
        const newChatBtn = document.getElementById('chatbot-new-chat-btn');
        const mcpToggle = document.getElementById('chatbot-mcp-toggle');
        const suggestionBtns = document.querySelectorAll('.chatbot-suggestion-btn');
        
        // Toggle panel
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                toggleChatbot();
            });
        }
        
        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                toggleChatbot();
            });
        }
        
        // Back button (show history)
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                showHistoryView();
            });
        }
        
        // New chat button
        if (newChatBtn) {
            newChatBtn.addEventListener('click', function() {
                createNewSession();
            });
        }
        
        // Send message
        if (sendBtn) {
            sendBtn.addEventListener('click', function() {
                sendMessage();
            });
        }
        
        // Input handling
        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
            
            // Auto-resize textarea
            input.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = Math.min(this.scrollHeight, 120) + 'px';
            });
        }
        
        // Suggestion buttons
        suggestionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const prompt = this.getAttribute('data-prompt');
                if (prompt && input) {
                    input.value = prompt;
                    sendMessage();
                }
            });
        });
        
        // MCP toggle
        if (mcpToggle) {
            mcpToggle.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        }
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && chatbotState.isOpen) {
                const historyView = document.getElementById('chatbot-history-view');
                if (historyView && historyView.style.display !== 'none') {
                    showChatView();
                } else {
                    toggleChatbot();
                }
            }
        });
        
        // Load current session if exists
        if (chatbotState.currentSessionId) {
            loadSession(chatbotState.currentSessionId);
        } else {
            createNewSession();
        }
        
        updateHistoryView();
    }
    
    // Toggle chatbot panel
    function toggleChatbot() {
        const panel = document.getElementById('chatbot-panel');
        if (!panel) return;
        
        chatbotState.isOpen = !chatbotState.isOpen;
        
        if (chatbotState.isOpen) {
            panel.classList.add('open');
            const input = document.getElementById('chatbot-input');
            if (input) {
                setTimeout(() => input.focus(), 100);
            }
        } else {
            panel.classList.remove('open');
        }
    }
    
    // Show chat view
    function showChatView() {
        const chatView = document.getElementById('chatbot-chat-view');
        const historyView = document.getElementById('chatbot-history-view');
        const backBtn = document.getElementById('chatbot-back-btn');
        const composer = document.getElementById('chatbot-composer');
        
        if (chatView) chatView.style.display = 'flex';
        if (historyView) historyView.style.display = 'none';
        if (backBtn) backBtn.style.display = 'none';
        if (composer) composer.style.display = 'block';
        
        const title = document.getElementById('chatbot-title');
        if (title) {
            const session = chatbotState.sessions.find(s => s.id === chatbotState.currentSessionId);
            title.textContent = session ? session.title : 'New chat';
        }
    }
    
    // Show history view
    function showHistoryView() {
        const chatView = document.getElementById('chatbot-chat-view');
        const historyView = document.getElementById('chatbot-history-view');
        const backBtn = document.getElementById('chatbot-back-btn');
        const composer = document.getElementById('chatbot-composer');
        
        if (chatView) chatView.style.display = 'none';
        if (historyView) historyView.style.display = 'flex';
        if (backBtn) backBtn.style.display = 'block';
        if (composer) composer.style.display = 'none';
        
        const title = document.getElementById('chatbot-title');
        if (title) title.textContent = 'History';
        
        updateHistoryView();
    }
    
    // Create new session
    function createNewSession() {
        const sessionId = 'session_' + Date.now();
        const session = {
            id: sessionId,
            title: 'New chat',
            updatedAt: new Date().toISOString()
        };
        
        chatbotState.sessions.unshift(session);
        chatbotState.messages[sessionId] = [];
        chatbotState.currentSessionId = sessionId;
        
        saveChatbotState();
        loadSession(sessionId);
        updateHistoryView();
    }
    
    // Load session
    function loadSession(sessionId) {
        chatbotState.currentSessionId = sessionId;
        const messages = chatbotState.messages[sessionId] || [];
        
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        messagesContainer.innerHTML = '';
        
        if (messages.length === 0) {
            const emptyState = document.getElementById('chatbot-empty-state');
            if (emptyState) {
                messagesContainer.appendChild(emptyState.cloneNode(true));
            }
        } else {
            messages.forEach(msg => {
                appendMessage(msg.role, msg.content, msg.actions);
            });
        }
        
        scrollToBottom();
        showChatView();
        saveChatbotState();
    }
    
    // Send message
    function sendMessage() {
        const input = document.getElementById('chatbot-input');
        if (!input || !input.value.trim()) return;
        
        const message = input.value.trim();
        input.value = '';
        input.style.height = 'auto';
        
        // Hide empty state
        const emptyState = document.getElementById('chatbot-empty-state');
        if (emptyState && emptyState.parentElement) {
            emptyState.parentElement.removeChild(emptyState);
        }
        
        // Add user message
        appendMessage('user', message);
        saveMessage('user', message);
        
        // Show typing indicator
        showTypingIndicator();
        
        // Generate mock response
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateMockResponse(message);
            appendMessage('assistant', response.content, response.actions);
            saveMessage('assistant', response.content, response.actions);
            
            // Update session title if first message
            if (chatbotState.messages[chatbotState.currentSessionId].length === 2) {
                updateSessionTitle(message.substring(0, 30));
            }
        }, 300 + Math.random() * 500);
    }
    
    // Append message to UI
    function appendMessage(role, content, actions = null) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${role}`;
        
        const bubble = document.createElement('div');
        bubble.className = 'chatbot-message-bubble';
        
        // Check if content is code block
        if (content.startsWith('```') && content.endsWith('```')) {
            const codeBlock = document.createElement('div');
            codeBlock.className = 'chatbot-code-block';
            codeBlock.textContent = content.slice(3, -3).trim();
            bubble.appendChild(codeBlock);
        } else if (content.includes('**Card:**')) {
            // Card component
            const card = document.createElement('div');
            card.className = 'chatbot-card';
            const parts = content.split('**Card:**');
            if (parts[0]) {
                const text = document.createElement('div');
                text.className = 'chatbot-card-content';
                text.textContent = parts[0].trim();
                bubble.appendChild(text);
            }
            if (parts[1]) {
                const cardContent = document.createElement('div');
                cardContent.className = 'chatbot-card';
                const cardTitle = document.createElement('div');
                cardTitle.className = 'chatbot-card-title';
                cardTitle.textContent = parts[1].split('\n')[0].trim();
                cardContent.appendChild(cardTitle);
                const cardBody = document.createElement('div');
                cardBody.className = 'chatbot-card-content';
                cardBody.textContent = parts[1].split('\n').slice(1).join('\n').trim();
                cardContent.appendChild(cardBody);
                bubble.appendChild(cardContent);
            }
        } else {
            bubble.textContent = content;
        }
        
        messageDiv.appendChild(bubble);
        
        // Add action buttons
        if (actions && actions.length > 0) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'chatbot-message-actions';
            actions.forEach(action => {
                const btn = document.createElement('button');
                btn.className = 'chatbot-action-btn';
                btn.textContent = action.label;
                btn.addEventListener('click', function() {
                    handleAction(action);
                });
                actionsDiv.appendChild(btn);
            });
            messageDiv.appendChild(actionsDiv);
        }
        
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Save message to state
    function saveMessage(role, content, actions = null) {
        if (!chatbotState.currentSessionId) {
            createNewSession();
        }
        
        if (!chatbotState.messages[chatbotState.currentSessionId]) {
            chatbotState.messages[chatbotState.currentSessionId] = [];
        }
        
        chatbotState.messages[chatbotState.currentSessionId].push({
            role,
            content,
            actions,
            timestamp: new Date().toISOString()
        });
        
        // Update session timestamp
        const session = chatbotState.sessions.find(s => s.id === chatbotState.currentSessionId);
        if (session) {
            session.updatedAt = new Date().toISOString();
        }
        
        saveChatbotState();
        updateHistoryView();
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'chatbot-message assistant';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <div class="chatbot-typing-indicator">
                <div class="chatbot-typing-dot"></div>
                <div class="chatbot-typing-dot"></div>
                <div class="chatbot-typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(indicator);
        scrollToBottom();
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // Scroll to bottom
    function scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    // Generate mock response
    function generateMockResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Unified Search scenarios
        if (lowerMessage.includes('find') && lowerMessage.includes('storage')) {
            return {
                content: 'Do you want to open the Storage app?',
                actions: [{ label: 'Open Storage', type: 'navigate', target: 'storage' }]
            };
        }
        
        if (lowerMessage.includes('where') && lowerMessage.includes('dev-server')) {
            return {
                content: 'You can find it in Compute > Instances.',
                actions: [{ label: 'Go to Compute', type: 'navigate', target: 'compute' }]
            };
        }
        
        // Dashboard/Widget scenarios
        if (lowerMessage.includes('cpu usage') || lowerMessage.includes('cpu graph')) {
            return {
                content: '**Card:** CPU Usage\nCurrent: 45%\nAverage (24h): 52%\nPeak: 78%',
                actions: []
            };
        }
        
        if (lowerMessage.includes('server cost') || lowerMessage.includes('total cost')) {
            return {
                content: '**Card:** Server Cost Summary\nTotal: $1,234.56\nThis Month: $987.65\nLast Month: $1,456.78',
                actions: []
            };
        }
        
        // CLI/Terminal scenarios
        if (lowerMessage.includes('kubectl') || lowerMessage.includes('get pods')) {
            return {
                content: '```\nNAME                          READY   STATUS    RESTARTS   AGE\npod-nginx-12345               1/1     Running   0          2d\npod-app-67890                 1/1     Running   0          1d\npod-db-abcde                  1/1     Running   0          3d\n```',
                actions: []
            };
        }
        
        // Default response
        return {
            content: 'I understand you want to: ' + userMessage + '. How can I help you with that?',
            actions: []
        };
    }
    
    // Handle action button click
    function handleAction(action) {
        if (action.type === 'navigate') {
            // TODO: Implement actual navigation
            console.log('Navigate to:', action.target);
            showNotification(`Would navigate to ${action.target} app`, 'info');
        } else if (action.type === 'prompt') {
            const input = document.getElementById('chatbot-input');
            if (input) {
                input.value = action.prompt;
                sendMessage();
            }
        }
    }
    
    // Update session title
    function updateSessionTitle(title) {
        const session = chatbotState.sessions.find(s => s.id === chatbotState.currentSessionId);
        if (session) {
            session.title = title;
            saveChatbotState();
            updateHistoryView();
            
            const titleEl = document.getElementById('chatbot-title');
            if (titleEl) {
                titleEl.textContent = title;
            }
        }
    }
    
    // Update history view
    function updateHistoryView() {
        const historyList = document.getElementById('chatbot-history-list');
        if (!historyList) return;
        
        historyList.innerHTML = '';
        
        chatbotState.sessions.forEach(session => {
            const item = document.createElement('div');
            item.className = 'chatbot-history-item';
            if (session.id === chatbotState.currentSessionId) {
                item.classList.add('active');
            }
            
            const title = document.createElement('div');
            title.className = 'chatbot-history-title';
            title.textContent = session.title;
            
            const time = document.createElement('div');
            time.className = 'chatbot-history-time';
            time.textContent = formatRelativeTime(session.updatedAt);
            
            item.appendChild(title);
            item.appendChild(time);
            
            item.addEventListener('click', function() {
                loadSession(session.id);
            });
            
            historyList.appendChild(item);
        });
    }
    
    // Format relative time
    function formatRelativeTime(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();
