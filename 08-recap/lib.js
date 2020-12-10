const Commande = function() {
    this.produits = [];
    this.total = 0;
};

// Fonction attachée au prototype, devrait être appelé en tant que méthode
Commande.prototype.ajouter = function(paramProduit, paramQte=1) {
    this.produits.push({ produit: paramProduit, qte: paramQte });
    this.total += paramProduit.prix * paramQte;
};

Commande.prototype.toHTML = function() {
    // reduce similaire à map ou forEach
    // sert à produire une valeur aggrégée du tableau
    // Ici, on concatène chaque chaine "ligne de tableau"
    // reduce accepte 2 paramètres: 1 fonction et la valeur initiale
    const lignesHTML = this.produits.reduce(function(accumulator, ligne) {
        return accumulator + ligne.produit.toHTML();
    }, '');

    return '<table>' + lignesHTML + '</table>';
};

const Produit = function(nom, prix = 0) {
    this.nom = nom;
    this.prix = prix;
};

Produit.prototype.toHTML = function() {
    return '<tr><td>' + this.nom + '</td><td>' + this.prix + '</td></tr>';
};
