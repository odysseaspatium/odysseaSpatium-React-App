export const PREFIX_URL = '';
export const URL_TOMCAT = 'http://localhost:8080/agenceVoyageTomcat';
export const DUREE_SLIDE= 450;
export const INTERVAL_SLIDE=4500;
  /* Une adresse e-mail, c'est
  * des caractères : lettres, chiffres, points et tirets (hauts ou bas),
  * un symbole "arobase" @,
  * des caractères : comme au début ; au moins deux,
  * un point,
  * des caractères : de 2 à 4 lettres minuscules.
  */
 export const EXP_REG_MAIL = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

  /* Explication exp reguliere
  * ^ : Debut de chaine
  * [a-z] : De a à z compris
  *  + : {1,} Au moins une fois
  * $ : Fin de chaine 
  */
 export const EXP_REG_NOM_PRENOM = /^[a-z]+$/;
  /* Le mot de passe, c'est
  * des caractères: [a-zA-Z]
  * des chiffres : \d,
  * au moins un caractere special: [^A-Za-z0-9],
  * des une taille superieure ou egale a 6 : {6,}.
  */
 export const LISTE_EXP_REG_MDP = [{
    re: /[a-zA-Z]/g,
    msg: "Votre mot de passe doit avoir des lettres en minuscule et majuscule"
  }, {
    re: /\d/g,
    msg: "Votre mot de passe doit avoir des chiffres"
  }, {
    re: /[^A-Za-z0-9]/g,
    count: 1,
    msg: "Votre mot de passe doit posséder au moins 1 caractère spécial"
  },
  {
    re: /^.{6,}$/,
    msg: "Votre mot de passe doit être plus grand ou égal à 6 caractères"
  }];