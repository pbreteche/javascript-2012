'use strict';

import { LoginComponent } from './login-component.js';

document.addEventListener('DOMContentLoaded', () => {
    const login = new LoginComponent('#app');
    login.start();
})