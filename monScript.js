///////////////////////
// Machine de Turing //
///////////////////////

/* ajustement ergonomie
changement de couleur de la table des transitions
perçage des cases */



////////////////////////
/* La zone graphique */
//////////////////////

// le décalage du disque pour le mettre à droite
var decalageCanvas=600;
		
// Le disque dur
//////////////////

var rayon=300;
var xCentre=rayon;
var yCentre=rayon;
var xDecalage=rayon+10+decalageCanvas;
var yDecalage=rayon+10;
		
// Les disques
///////////////

var cote=8;
var nbDisques=100;
var lesDisques=new Array(nbDisques);
   
// les couleurs des états
var lesCouleurs=['white','red','green'];
          
// créer un disque d'état et de position angulaire donnés
function unDisque(angle,etat)
	{
		this.angle=angle;
		this.x=(int)((rayon-2*cote)*cos(angle));
		this.y=(int)((rayon-2*cote)*sin(angle));
		this.etat=etat;
		this.couleur=lesCouleurs[etat];
	}
		
// dessiner le disque
unDisque.prototype.dessiner=function()
	{
		 //window.alert('coucou ('+this.x+';'+this.y+')');
		  push();
		  translate(xDecalage,yDecalage);
		  //translate((int)(cote/2),(int)(cote/2));
		  stroke('black');
		  strokeWeight((int)(cote/5));
		  //window.alert('etat ='+this.etat);
		  fill(lesCouleurs[this.etat]);
		  ellipse(this.x,this.y,2*cote,2*cote);
		  pop();
	}
		
		
		
		
// calculer la distance entre le disque et la souris
unDisque.prototype.distanceSouris=function()
	{
		  var xCentre=this.x+cote/2;
		  var yCentre=this.y+cote/2;
		  //var xSouris=mouseX-xDecalage;
		  var xSouris=mouseX-xDecalage;
		  var ySouris=mouseY-yDecalage;
		 //window.alert('le disque : ('+xCentre+';'+yCentre+')');
		  return (xCentre-xSouris)*(xCentre-xSouris)
		  +(yCentre-ySouris)*(yCentre-ySouris);
	}
		
// vérifie si le disque est sélectionné
unDisque.prototype.estSelectionne=function()
	{
		  //window.alert('disque : ('+this.x+';'+this.y+')');
		  var lecartSouris=this.distanceSouris();
			//window.console.log("disque en : ("+this.x+";"+this.y+") ; souris en : ("+mouseX+" ; "+mouseY+") ; cela donne comme écart : "+lecartSouris);
		  if (lecartSouris<75)
		  {
		    //window.alert('redessine');
		    this.etat=(this.etat+1)%3;
		    this.dessiner();
		    return true;
		  }
		  else
		  {
		    return false;
		  }
	}
		
// change la position d'un disque
unDisque.prototype.aGauche=function()
	{
		  this.angle=this.angle-TWO_PI/nbDisques;
		  this.x=(int)((rayon-2*cote)*cos(this.angle));
		  this.y=(int)((rayon-2*cote)*sin(this.angle));
		  this.dessiner();
	}
		
unDisque.prototype.aDroite=function()
	{
		  this.angle=this.angle+TWO_PI/nbDisques;
		  this.x=(int)((rayon-2*cote)*cos(this.angle));
		  this.y=(int)((rayon-2*cote)*sin(this.angle));
		  this.dessiner();
	}
		
// change l'état d'un disque
unDisque.prototype.changeEtat=function(letat)
	{
		  this.etat=letat%3;
		  this.dessiner();
	}
	

		

// Les boutons de commande
///////////////////////////
var decalageBoutons=decalageCanvas+50;
		
		
		var btn_Droite=new unBouton(80,700,"D",'yellow');
		var btn_Gauche=new unBouton(20,700,"G",'black');
		var btn_Blanc=new unBouton(170,700,"B",'white');
    var btn_Zero=new unBouton(230,700,"0",'red');
    var btn_Un=new unBouton(290,700,"1",'green');
    var btn_Lecture=new unBouton(380,700,"L",'blue');
    var btn_ValeurLue=new unBouton(440,700," ",'white');
		
		// créer un bouton de texte modifiable et de position donnée
		function unBouton(x,y,texte,couleur)
		{
		  this.x=x;
		  this.y=y;
		  this.texte=texte;
		  this.couleur=couleur;
		}
		
		// dessiner le bouton
		unBouton.prototype.dessiner=function()
		{
		  push();
		  stroke('black');
		  fill(this.couleur);
		  rect(this.x,this.y,40,40);
		  textSize(24);
		  textAlign(LEFT);
		  fill('purple');
		  text(this.texte,this.x+10,this.y+30);
		  pop();
		}
		
		// calculer la distance entre le bouton et la souris
		unBouton.prototype.distanceSouris=function()
		{
		  var xCentre=this.x+20+decalageBoutons;
		  var yCentre=this.y+20;
		  var xSouris=mouseX;
		  var ySouris=mouseY;
		  //window.alert('souris = ('+xSouris+';'+ySouris+') pour centre = ('+xCentre+';'+yCentre+')');
		  return (xCentre-xSouris)*(xCentre-xSouris)
		  +(yCentre-ySouris)*(yCentre-ySouris);
		}
		
		// vérifie si le bouton est sélectionné
		unBouton.prototype.estSelectionne=function()
		{
			window.console.log("("+mouseX+";"+mouseY+") pour "+this.distanceSouris());
		  if (this.distanceSouris()<800)
		  {
		    //window.alert('coucou');
		    return true;
		  }
		  else
		  {
		    return false;
		  }
		}
		
		// change le texte du bouton
		unBouton.prototype.changeTexte=function(letexte)
		{
			window.console.log("change le contenu avec "+letexte);
		  this.texte=letexte;
		  // impossible de le redessiner au bon endroit à cause du décalage des boutons
		  //this.dessiner();
		}
		
/////////////////////////
/* La zone algorithme */
///////////////////////
		
		
// Le tableau de commande
//////////////////////////

// le nombre d'étapes disponibles dans le tableau de commande
// en adéquation avec le nombre de colonnes !!
var nbEtats=11;

// pour nommer la case d'étape correspondante
function nomEtape(etatencours)
{
	var reparet="etat";
	if (etatencours<10) reparet+="0";
	reparet+=etatencours;
	return reparet;
}




// la création du tableau
function tableauCommande()
{
	// entête du tableau 
	var enteteTableau="<table class='tabCo'><caption>Table des transitions</caption><thead>";
	enteteTableau+="<tr><th class='thCo' rowspan='2'>Etat</th><th class='thCo'  rowspan='2'>Lecture</th><th class='thCo' colspan='3'>Ecriture</th><th class='thCo' colspan='2'>Déplacement</th><th class='thCo' colspan='12'>Nouvel état</th></tr>";
	enteteTableau+="<tr><th class='thCo'>b</th>";
	for (var i=0;i<2;i++)
	{
		enteteTableau+="<th class='thCo'>"+i+"</th>";
	}
	enteteTableau+="<th class='thCo'>G</th><th class='thCo'>D</th>";
	for (var i=1;i<12;i++)
	{
		enteteTableau+="<th class='thCo'>"+i+"</th>";
	}
	enteteTableau+="<th class='thCo'>F</th></tr></thead>";
	// corps du tableau 
	var corpsTableau=" <tbody>";
	
	var corpsEtat=new Array(nbEtats);
	for (var i=0;i<nbEtats;i++)
	{
		// état i
		corpsEtat[i]="<tr class='rangee'><td rowspan='3' id="+nomEtape(i)+">"+(i+1)+"</td>";
		// boucle sur les trois états possibles
		for (var j=0;j<3;j++)
		{
			var nomLecture=nomEtape(i)+"lecture"+j;
			if (j==0) 
			{
				corpsEtat[i]+="<td id="+nomLecture+">b</td>";
			}
			else 
			{
				corpsEtat[i]+="<td id="+nomLecture+">"+(j-1)+"</td>";
			}
			// boucle sur les 17 cases par ligne
			for (var k=0;k<17;k++)
			{
				// le nom de la case comporte 5 chiffres
				var nomCase="case";
				if (i<10) nomCase+="0";
				nomCase+=i;
				nomCase+=j;
				if (k<10) nomCase+="0";
				nomCase+=k;
				corpsEtat[i]+=" <td class='case' id="+nomCase+"  onclick=changeCouleur(this,this.id);></td>";
			}
			corpsEtat[i]+="</tr>";
		}
	}
	// fin du tableau
	var etatF="<tr class='rangee'><td colspan='19' id='Fetat'>F</td></tr>";
	var finTableau="</tbody></table>";
	
	//affichage du tableau 
	corpsTableau=enteteTableau+corpsTableau;
	for (var i=0;i<nbEtats;i++)
	{
		corpsTableau+=corpsEtat[i];
	}
	corpsTableau+=etatF+finTableau;
	document.getElementById('tableau_commande').innerHTML=corpsTableau;
		     

}


/*
// les anciennes couleurs de cases
var couleursCases=new Array(2);
couleursCases=['gray','yellow'];
*/

// les nouvelles couleurs de case
var couleursCases=new Array(4);
couleursCases=['#F5FFFA','#FFFFE0','#F0FFF0','#FFFAF0'];

// initialiser les couleurs de case pour éviter le double clic 
function initCouleurCase()
{
	for (var i=0;i<nbEtats;i++)
	{
		for (var j=0;j<3;j++)
		{
			for (var k=0;k<17;k++)
			{
				// le nom de la case comporte 5 chiffres
				var nomCase="case";
				if (i<10) nomCase+="0";
				nomCase+=i;
				nomCase+=j;
				if (k<10) nomCase+="0";
				nomCase+=k;
			var styleCase=document.getElementById(nomCase).style;
			if (k<=2) styleCase.backgroundColor=couleursCases[0];
			if ((k==3)||(k==4)) styleCase.backgroundColor=couleursCases[1];
			if (k>4) styleCase.backgroundColor=couleursCases[2+k%2];
			document.getElementById(nomCase).innerHTML="";
				//document.getElementById(nomCase).style.backgroundColor=couleursCases[0];
			}
		}
	}
}

// changer de couleur
function changeCouleur(x,laCase)
{
	window.console.log("Case :"+laCase);
	// on récupère les "coordonnées" de la case :
	var i=parseInt(laCase.substring(4,6));
	var j=parseInt(laCase.substring(6,7));
	var k=parseInt(laCase.substring(7,9));
	window.console.log("i = "+i+" ; j = "+j+" ; k= "+k);

	// On modifie les cases du tableau html grace à leur id 
	//var x=document.getElementById(laCase);
	// On change la couleur 
	if ((x.innerHTML=="")&&(peutEtreCochee(i,j,k))) 
	{
		x.innerHTML="\u2B24";
		casesCochees[i][j][k]=true;
	}
	else 
	{
		x.innerHTML="";
		casesCochees[i][j][k]=false;
	}
	
}


// La gestion de l'algorithme
///////////////////////////////

// le tableau des cases cochées
var casesCochees=new Array(nbEtats);
for (var i=0;i<nbEtats;i++)
{
	casesCochees[i]=new Array(3);
	for (var j=0;j<3;j++)
	{
		casesCochees[i][j]=new Array(17);
		for (var k=0;k<17;k++)
		{
			casesCochees[i][j][k]=false;
		}
	}
}

// peut-on cocher cette case ?
function peutEtreCochee(i,j,k)
{
	var rep=true;
	var nbCocheesLigne=0;
	// test sur les cases Ecriture
	if ((k>=0)&&(k<3))
	{
		for (var l=0;l<3;l++)
		{
			if (casesCochees[i][j][l]) nbCocheesLigne++; 
		}
		if (nbCocheesLigne>0) rep=false;
	}
	// test sur les cases Déplacement
	if ((k>=3)&&(k<5))
	{
		for (var l=3;l<5;l++)
		{
			if (casesCochees[i][j][l]) nbCocheesLigne++; 
		}
		if (nbCocheesLigne>0) rep=false;
	}
	// test sur les cases Nouvel Etat
	if (k>=5)
	{
		for (var l=5;l<17;l++)
		{
			if (casesCochees[i][j][l]) nbCocheesLigne++; 
		}
		if (nbCocheesLigne>0) rep=false;
	}
	if (!rep) window.alert("cette case ne peut être cochée");
	return rep;
}


/////////////////////////////////////////////
/* La zone de traitenemnt de l'algorithme */
///////////////////////////////////////////

// la variable qui donne le numéro de l'étape : numéro correspondant à l'affichage
var etatActuel=0;
var nouvelEtat=1;
// la variable pour pouvoir passer à l'étape suivante
var pasSuivant=false;


////
// Algorithme pas à pas
/////////////////////////

// la fonction qui lance la lecture de l'algorithme
function demarrer()
{
	// remet l'état F en blanc, au cas où
	document.getElementById("Fetat").style.backgroundColor='white';
	// enlève le pilotage automatique 
	document.getElementById("pilotauto").style.visibility='hidden';
	
	// état des lieux des cases cochées
	for (var i=0;i<nbEtats;i++)
	{
		for (var j=0;j<3;j++)
		{
			for (var k=0;k<17;k++)
			{
				if (casesCochees[i][j][k]) window.console.log("case cochée ("+i+" ; "+j+" ; "+k+")");
			}
		}
	}
	window.console.log("je démarre");
	etatActuel=1;
	document.getElementById("etat00").style.backgroundColor='blue';
	//nouvelEtat=execution()+1;
	execution();
	pasSuivant=true;
	// enlève les boutons démarrer
	document.getElementById("demarrer").style.visibility="hidden";
	document.getElementById("demauto").style.visibility="hidden";
	// rajoute les boutons suvant et arrêter
	document.getElementById("suivant").style.visibility="visible";
	document.getElementById("arreter").style.visibility='visible';
	// fait disparaître les boutons de remise à zéro
	document.getElementById("effaceTable").style.visibility='hidden';
	document.getElementById("effaceDisque").style.visibility='hidden';
}

// la fonction qui permet de poursuivre le déroulement de l'algorithme
function suivant()
{
	document.getElementById(nomEtape(etatActuel-1)).style.backgroundColor='white';
	window.console.log("nouvelle étape : "+nouvelEtat);
	if (nouvelEtat<12) 
	{
		document.getElementById(nomEtape(nouvelEtat-1)).style.backgroundColor='blue';
		etatActuel=nouvelEtat;
		//nouvelEtat=execution()+1;
		execution();
		pasSuivant=true;
	}
	else 
	{
		document.getElementById("Fetat").style.backgroundColor='blue';
		arreter();
	}
		
}

// la fonction qui permet d'arrêter l'algorithme en cas de pépin
function arreter()
{
	window.console.log("j'arrête");
	// remet les cases de lecture ett d'étapes en blanc 
	document.getElementById(nomEtape(etatActuel-1)).style.backgroundColor='white';
	document.getElementById("Fetat").style.backgroundColor='blue';
	if (ancienneLecture!="") document.getElementById(ancienneLecture).style.backgroundColor='white';
	pasSuivant=false;
	// remet les deux styles de pilotage
	document.getElementById("pilotauto").style.visibility='visible';
	document.getElementById("pilotage").style.visibility='visible';
	// rajoute les boutons démarrer
	document.getElementById("demarrer").style.visibility='visible';
	document.getElementById("demauto").style.visibility='visible';
	// enleve les boutons suivant et arrêter
	document.getElementById("suivant").style.visibility='hidden';
	document.getElementById("arreter").style.visibility='hidden';
	
	// affiche les boutons de remise à zéro
	document.getElementById("effaceTable").style.visibility='visible';
	document.getElementById("effaceDisque").style.visibility='visible';
}

////
// L'exécution de l'algorithme
///////////////////////////////

//compteur de tour d'exécution
var compteurTour=0;

// la gestion de coloration des cases de lecture
var ancienneLecture="";
var nouvelleLecture="";

// la gestion du disque repéré de la valeur lue dessus
var valeurLue=0;
var numDisque=-1;

// la fonction de lecture
function lecture()
{
	for (var i=0;i<nbDisques;i++)
      {
        var sonTexte=" ";
        // je teste l'abscisse et non l'angle pour éviter le modulo 2π
        if (lesDisques[i].y==284) 
        {
          if (lesDisques[i].etat==0) sonTexte="B";
          if (lesDisques[i].etat==1) sonTexte="0";
          if (lesDisques[i].etat==2) sonTexte="1";
          btn_ValeurLue.changeTexte(sonTexte);
          valeurLue=lesDisques[i].etat;
          numDisque=i;
        }
      }
      
	// décalage de 1 avec la valeur lue : B -> 0 ; 0 -> 1 ; 1 -> 2
	window.console.log("valeur lue = "+valeurLue);
	// affichage de la couleur
	if (ancienneLecture!="") document.getElementById(ancienneLecture).style.backgroundColor='white';
	nouvelleLecture=nomEtape(etatActuel-1)+"lecture"+valeurLue;
	document.getElementById(nouvelleLecture).style.backgroundColor='cyan';
   }
   
   
// la fonction d'écriture
function ecriture()
{
	var letatA=etatActuel-1;
	for (var k=0;k<3;k++)
	{
		window.console.log("case ("+letatA+" ; "+valeurLue+" ; "+k+") : "+casesCochees[letatA][valeurLue][k]);
		if (casesCochees[letatA][valeurLue][k]) 
		{
			window.console.log("changement écriture = "+(k));
			lesDisques[numDisque].changeEtat(k);
			document.getElementById(nouvelleLecture).style.backgroundColor='LightCyan';
		}
	}
}

// la fonction de déplacement
function deplacement()
{
	var letatA=etatActuel-1;
	// déplacement vers la gauche
	if (casesCochees[letatA][valeurLue][3]) 
		{
			window.console.log("à gauche");
			for (var l=0;l<nbDisques;l++)
      		{
        		lesDisques[l].aGauche();
        		document.getElementById(nouvelleLecture).style.backgroundColor='LightCyan';
      		}
		}
	// déplacement vers la droite
	if (casesCochees[letatA][valeurLue][4]) 
		{
			window.console.log("à droite");
			for (var l=0;l<nbDisques;l++)
      		{
        		lesDisques[l].aDroite();
        		document.getElementById(nouvelleLecture).style.backgroundColor='LightCyan';
      		}
		}
}

// la fonction qui donne la nouvelle étape
function etatFutur()
{
	var letatA=etatActuel-1;
	var nvetat=letatA;
	window.console.log("letat = "+letatA+" ; valeurLue= "+valeurLue);
	for (var k=5;k<17;k++)
	{
		if (casesCochees[letatA][valeurLue][k]) 
		{
			window.console.log("étape suivante : "+(k-4));
			nvetat=k-5;
		}
	}
	// retourne le nouvel état : nombre compris entre 1 et 12
	ancienneLecture=nouvelleLecture;
	return nvetat;
	
}

// la fonction d'action
function faire()
{
	// zone d'écriture
	ecriture();
	// zone de déplacement
	deplacement();
	// zone de changement d'étape
	nouvelEtat=etatFutur()+1;
}


// la variable de temporisation
var delai=500;
var tPause;


// la fonction qui lit le contenu de la ligne de programmation
function execution()
{
	var letat=etatActuel-1;
	compteurTour++;
	window.console.log("compteurTour = "+compteurTour);
	// attention letat a un décalage de 1 avec le numéro de l'étape
	// repère la donnée de lecture du disque
	// détecte le bouton sur la zone de lecture/écriture et lit sa valeur
	valeurLue=0;
	numDisque=-1;
	lecture(); 
    	
	// balaye les cases de la ligne correspondante
	window.console.log(casesCochees[letat][valeurLue]);
	// actions a effectuer
	/*
	// zone d'écriture
	ecriture();
		// zone de déplacement
	deplacement();
	// zone de changement d'étape
	nouvelEtat=etatFutur()+1;
	*/
	tPause=setTimeout(faire,delai);
	
	
	
}

		
////	
// Le pilotage automatique
///////////////////////////
// le changement de vitesse de temporisation
function changeVitesse(nvit)
{ 
	window.console.log("passage de la vitesse à "+nvit);
	delai=nvit;
}

// pour lancer l'execution en boucle
var tAuto=null;

function etapeSuivante()
{
	document.getElementById(nomEtape(etatActuel-1)).style.backgroundColor='white';
		window.console.log("nouvelle étape : "+nouvelEtat);
		if (nouvelEtat<12) 
		{
		document.getElementById(nomEtape(nouvelEtat-1)).style.backgroundColor='blue';
			etatActuel=nouvelEtat;
			execution();
			//tAuto=setTimeout(execution,2*delai);
			pasSuivant=true;
		}
		else 
		{
		document.getElementById("Fetat").style.backgroundColor='blue';
			arreturgence();
		}

}

function automatique()
{
	// remet l'état F en blanc, au cas où
	document.getElementById("Fetat").style.backgroundColor='white';
	// fait disparaître les boutons du pilotage manuel
	document.getElementById("pilotage").style.visibility='hidden';
	// fait disparaître les boutons de démarage
	document.getElementById("demarrer").style.visibility='hidden';
	document.getElementById("demauto").style.visibility='hidden';
	// fait apparaître l'arrêt d'urgence
	document.getElementById("arreturgence").style.visibility='visible';
	
	// fait disparaître les boutons de remise à zéro
	document.getElementById("effaceTable").style.visibility='hidden';
	document.getElementById("effaceDisque").style.visibility='hidden';
	
	//demarrage
	
	window.console.log("je démarre en automatique");
	etatActuel=1;
	nouvelEtat=1;
	document.getElementById("etat00").style.backgroundColor='blue';
	execution();
	pasSuivant=true;
	// passage d'étape en étape
	if (pasSuivant)
	{
		tAuto=setInterval(etapeSuivante,2*delai);
	}
	else
	{
		clearInterval(tAuto);
	}
	
}	

function arreturgence()
{
	clearInterval(tAuto);
	// remet les deux styles de pilotage
	document.getElementById("pilotauto").style.visibility='visible';
	document.getElementById("pilotage").style.visibility='visible';
	// rajoute les boutons démarrer
	document.getElementById("demarrer").style.visibility='visible';
	document.getElementById("demauto").style.visibility='visible';
	// enleve les boutons suivant et arrêter
	document.getElementById("suivant").style.visibility='hidden';
	document.getElementById("arreter").style.visibility='hidden';
	document.getElementById("arreturgence").style.visibility='hidden';
	
	// affiche les boutons de remise à zéro
	document.getElementById("effaceTable").style.visibility='visible';
	document.getElementById("effaceDisque").style.visibility='visible';
	
	window.console.log("j'arrête en urgence");
	
	// remet les couleurs d'étape et de lecture à zéro
	document.getElementById(nomEtape(etatActuel-1)).style.backgroundColor='white';
	document.getElementById("Fetat").style.backgroundColor='blue';
	if (ancienneLecture!="") document.getElementById(ancienneLecture).style.backgroundColor='white';
	pasSuivant=false;
	
	}


////
// Les remises à zéro
///////////////////////

/* remise à zéro de la table des transitions */
function effaceTable()
{
	window.console.log("pour remettre à zéro la table des transitions");
	// vide les cases
	initCouleurCase();
	// remets à zéro le tableau des cases cochées
	for (var i=0;i<nbEtats;i++)
	{
		for (var j=0;j<3;j++)
		{
			for (var k=0;k<17;k++)
			{
			casesCochees[i][j][k]=false;
			}
		}
	}
	// remet l'état F en blanc, au cas où
	document.getElementById("Fetat").style.backgroundColor='white';
}


/* remise à zéro des données sur les disques */
function effaceDisque()
{
	window.console.log("pour remettre à zéro les données sur les disques");
	for (var i=0;i<nbDisques;i++)
  {
    lesDisques[i].changeEtat(0);
  }
}
		
////////////////////////		
/* L'animation		 */
//////////////////////
		
//var angle_base = TWO_PI / nbDisques;


		
// La fonction de démarrage
			
function setup()
{
  var leCanvas=createCanvas(800+decalageCanvas, 800);
  leCanvas.parent('monCanvas');
  
    
  // le disque dur
  push();
  translate(xDecalage,yDecalage);
  //translate(xCentre,yCentre);
  fill('#FFF168');
  noStroke();
  ellipse(0,0,rayon*2,rayon*2);
  pop();
  
  // l'horloge
  push();
  translate(xDecalage,yDecalage);
  fill('gray');
  noStroke();
  ellipse(0,0,rayon,rayon);
  fill('black');
  ellipse(0,0,rayon/10,rayon/10);
  pop();
  
  // l'aiguille
   push();
  translate(xDecalage,yDecalage);
  strokeWeight(10);
  fill('black');
  line(0,0,rayon/4,rayon/4);
  pop();
  
  // le repère de lecture
   push();
	translate(xDecalage,yDecalage);
	strokeWeight(8);
	fill('black');
  line(0,rayon+cote,0,rayon+3*cote);
  pop();
  
  
  // les cylindres
  var angle_base = TWO_PI / nbDisques;
  for (var i=0;i<nbDisques;i++)
  {
    lesDisques[i]=new unDisque(angle_base*i-PI/2,0);
    
    lesDisques[i].dessiner();
  }
  
  // décalage des boutons
  push();
  translate(decalageBoutons,0);
  
  // les boutons
  textSize(24);
	textAlign(LEFT);
	fill('purple');
  // les boutons de déplacement
  text("Déplacement",0,680);
  btn_Droite.dessiner();
  btn_Gauche.dessiner();
  // les boutons d'écriture'
  text("Ecriture",210,680);
  btn_Blanc.dessiner();
  btn_Zero.dessiner();
  btn_Un.dessiner();
  // le bouton de lecture
  text("Lecture",380,680);
  btn_Lecture.dessiner();
  btn_ValeurLue.dessiner();
  
  //fin décalage des boutons
  pop();
  
  
  
  // le tableau de commandes
  tableauCommande();
  
  // initialisation des couleurs de case
  initCouleurCase();
  
  // affiche les deux styles de pilotage
	document.getElementById("pilotauto").style.visibility='visible';
	document.getElementById("pilotage").style.visibility='visible';
  
  // fait disparaître temporairement les boutons suivant et arrêter
  document.getElementById("suivant").style.visibility="hidden";
	document.getElementById("arreter").style.visibility='hidden';
	document.getElementById("arreturgence").style.visibility='hidden';
	
	// remet le curseur à la bonne valeur
	delai=500;
	document.getElementById("vitesse").value=delai;
	
	
	// affiche les boutons de remise à zéro
	document.getElementById("effaceTable").style.visibility='visible';
	document.getElementById("effaceDisque").style.visibility='visible';
 }
 

  // La fonction qui tourne en boucle
function draw() 
{
	 push();
  translate(decalageBoutons,0);
  btn_ValeurLue.dessiner();
  pop();
  
}

 // quand la souris est enfoncée
  function mousePressed()
  {
    
    // test de la position de la souris
    //window.alert('souris ('+mouseX+';'+mouseY+')');
   // window.alert('repère ('+(mouseX-xDecalage)+';'+(mouseY-yDecalage)+')');
    
    // teste si un disque est dessous et en change l'état
    for (var i=0;i<nbDisques;i++)
    {
      lesDisques[i].estSelectionne();
    }
    
    // teste si le bouton gauche est sélectionné et décale vers la gauche
    if (btn_Gauche.estSelectionne())
    {
      // remet le bouton de lecture à zéro
      btn_ValeurLue.changeTexte(" ");
      
      for (var i=0;i<nbDisques;i++)
      {
        lesDisques[i].aGauche();
      }
      
    }
    
    // teste si le bouton droite est sélectionné et décale vers la droite
    if (btn_Droite.estSelectionne())
    {
      // remet le bouton de lecture à zéro
      btn_ValeurLue.changeTexte(" ");
      
      for (var i=0;i<nbDisques;i++)
      {
        lesDisques[i].aDroite();
      }
      
    }
    
    // teste quel bouton d'écriture est sélectionné et change l'état
    if (btn_Blanc.estSelectionne())
    {
      // remet le bouton de lecture à zéro
      btn_ValeurLue.changeTexte(" ");
      
      // détecte le bouton sur la zone de lecture/écriture
      for (var i=0;i<nbDisques;i++)
      {
        // je teste l'abscisse et non l'angle pour éviter le modulo 2π
        if (lesDisques[i].y==284) lesDisques[i].changeEtat(0);
      }
    }
    
    if (btn_Zero.estSelectionne())
    {
      // remet le bouton de lecture à zéro
      btn_ValeurLue.changeTexte(" ");
      
      // détecte le bouton sur la zone de lecture/écriture
      for (var i=0;i<nbDisques;i++)
      {
        // je teste l'abscisse et non l'angle pour éviter le modulo 2π
        if (lesDisques[i].y==284) lesDisques[i].changeEtat(1);
      }
    }
    
    if (btn_Un.estSelectionne())
    {
      // remet le bouton de lecture à zéro
      btn_ValeurLue.changeTexte(" ");
      
      // détecte le bouton sur la zone de lecture/écriture
      for (var i=0;i<nbDisques;i++)
      {
        // je teste l'abscisse et non l'angle pour éviter le modulo 2π
        if (lesDisques[i].y==284) lesDisques[i].changeEtat(2);
      }
    }
    
    
    // lecture
    
    if (btn_Lecture.estSelectionne())
    {
    	window.console.log("bouton lecture");
      // détecte le bouton sur la zone de lecture/écriture
      for (var i=0;i<nbDisques;i++)
      {
        var sonTexte=" ";
        // je teste l'ordonnée et non l'angle pour éviter le modulo 2π
        if (lesDisques[i].y==284) 
        {
        	window.console.log("disque "+i+" est sélectionné");
          if (lesDisques[i].etat==0) sonTexte="B";
          if (lesDisques[i].etat==1) sonTexte="0";
          if (lesDisques[i].etat==2) sonTexte="1";
          window.console.log("valeur lue = "+sonTexte);
          btn_ValeurLue.changeTexte(sonTexte);
        }
      }
    }
    
    
  }
  
 



	