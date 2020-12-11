'use strict';

import { User } from './user.js';

export class LoginComponent {
    constructor(selector) {
        this.root = document.querySelector(selector);
        // si null : pas d'utilisateur connecté
        // sinon : un objet User
        this.user = null;
    }

    start() {
        this.render();
    }

    render() {
        this.user ? this.renderLogout() : this.renderLogin();
    }

    renderLogout() {
        // Element du DOM temporaire afin d'échapper les caractères HTML dans le username
        // Création d'un élément du DOM. Initialement, les élements sont détachés de l'arbre
        const tempElement = document.createElement('div');
        // Insérer le nom d'utilisateur en tant qu'élément textuel de la "div"
        tempElement.innerText = this.user.username;

        /**
         * XSS: cross-site scripting
         * je choisi comme username:
         * Pierre<script>console.log('')</script>
         * Pierre"; DROP TABLE user; --
         * 
         * => principe de sécurité pour éviter les injections,
         *    effectuer un échappement en tout dernier instant
         */

        // Lorsqu'on accède en lecture à la propriété innerHTML, la structure est analysée
        // afin de générer le code HTML correspondant
        // et donc échapper les caractères spéciaux HTML dans la chaîne
        this.root.innerHTML = `<p>${tempElement.innerHTML} <a>Déconnexion</a></p>`
        this.root.querySelector('a').addEventListener('click', () => {
            this.logout();
            // optimistic programming:
            // Ici, on considère que:
            //   * l'action de déconnexion n'est pas sensée échouer
            //   * on n'attend pas de données spécifique en réponse pour ddéterminer l'action à suivre
            // ==> possibilité d'anticiper la réponse du serveur
            this.user = null;
            this.render();
        });
    }

    renderLogin() {
        this.root.innerHTML = `
<form>
    <input name="username">
    <input type="password" name="password">
    <button>Se connecter</button>
</form>`;
        const formElement = this.root.querySelector('form');
        formElement.addEventListener('submit', e => {
            e.preventDefault();
            this.login(new FormData(formElement));
        });
    }

    logout() {
        fetch('logout.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(this.user),
        });
    }

    login(data) {
        // Sérialisation au format JSON
        // Content-type par défaut: "multipart/form-data"
        const serializedData = JSON.stringify(Object.fromEntries(data.entries()));

        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: serializedData,
        }).then(() => {
            this.user = new User(data.get('username'));
            this.render();
        });
    }
}
