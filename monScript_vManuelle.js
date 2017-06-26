///////////////////////
// Machine de Turing //
///////////////////////

/* mise en cohérence de l'effacement des couleurs quand on arrive en F */

		
// Le disque dur
//////////////////

var rayon=300;
var xCentre=rayon;
var yCentre=rayon;
var xDecalage=rayon+10;
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
			//window.alert(lecartSouris);
		  if (lecartSouris<50)
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
		  var xCentre=this.x+20;
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
			//window.alert("("+mouseX+";"+mouseY+") pour "+this.distanceSouris());
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
		  this.texte=letexte;
		  this.dessiner();
		}
		
		
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
	var enteteTableau="<table><caption>Tableau de programmation</caption><thead>";
	enteteTableau+="<tr><th rowspan='2'>Etat</th><th  rowspan='2'>Lecture</th><th colspan='3'>Ecriture</th><th colspan='2'>Déplacement</th><th colspan='12'>Nouvel état</th></tr>";
	enteteTableau+="<tr><th>b</th>";
	for (var i=0;i<2;i++)
	{
		enteteTableau+="<th>"+i+"</th>";
	}
	enteteTableau+="<th>G</th><th>D</th>";
	for (var i=1;i<12;i++)
	{
		enteteTableau+="<th>"+i+"</th>";
	}
	enteteTableau+="<th>F</th></tr></thead>";
	// corps du tableau 
	var corpsTableau=" <tbody>";
	
	var corpsEtat=new Array(nbEtats);
	for (var i=0;i<nbEtats;i++)
	{
		// état i
		corpsEtat[i]="<tr><td rowspan='3' id="+nomEtape(i)+">"+(i+1)+"</td>";
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
	var etatF="<tr><td colspan='19' id='Fetat'>F</td></tr>";
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


		
// les couleurs de cases
var couleursCases=new Array(2);
couleursCases=['gray','yellow'];

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
				document.getElementById(nomCase).style.backgroundColor=couleursCases[0];
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
	if ((x.style.backgroundColor==couleursCases[0])&&(peutEtreCochee(i,j,k))) 
	{
		x.style.backgroundColor=couleursCases[1];
		casesCochees[i][j][k]=true;
	}
	else 
	{
		x.style.backgroundColor=couleursCases[0];
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


// la variable qui donne le numéro de l'étape : numéro correspondant à l'affichage
var etatActuel=0;
var nouvelEtat=1;
// la variable pour pouvoir passer à l'étape suivante
var pasSuivant=false;

// la fonction qui lance la lecture de l'algorithme
function demarrer()
{
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
	nouvelEtat=execution(etatActuel-1)+1;
	pasSuivant=true;
	// enlève le bouton démarrer
	document.getElementById("demarrer").style.visibility="hidden";
	// rajoute les boutons suvant et arrêter
	document.getElementById("suivant").style.visibility="visible";
	document.getElementById("arreter").style.visibility='visible';
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
		nouvelEtat=execution(etatActuel-1)+1;
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
	document.getElementById(nomEtape(etatActuel-1)).style.backgroundColor='white';
	document.getElementById("Fetat").style.backgroundColor='blue';
	if (ancienneLecture!="") document.getElementById(ancienneLecture).style.backgroundColor='white';
	pasSuivant=false;
	// rajoute le bouton démarrer
	document.getElementById("demarrer").style.visibility='visible';
	// enleve les boutons suvant et arrêter
	document.getElementById("suivant").style.visibility='hidden';
	document.getElementById("arreter").style.visibility='hidden';
}

//compteur de tour d'exécution
var compteurTour=0;

// la gestion de coloration des cases de lecture
var ancienneLecture="";
var nouvelleLecture="";

// la fonction qui lit le contenu de la ligne de programmation
function execution(letat)
{
	compteurTour++;
	window.console.log("compteurTour = "+compteurTour);
	// attention letat a un décalage de 1 avec le numéro de l'étape
	// repère la donnée de lecture du disque
	// détecte le bouton sur la zone de lecture/écriture et lit sa valeur
	var valeurLue=0;
	var numDisque=-1;
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
	nouvelleLecture=nomEtape(letat)+"lecture"+valeurLue;
	document.getElementById(nouvelleLecture).style.backgroundColor='cyan';
	
	// balaye les cases de la ligne correspondante
	window.console.log(casesCochees[letat][valeurLue]);
	// zone d'écriture
	for (var k=0;k<3;k++)
	{
		window.console.log("case ("+letat+" ; "+valeurLue+" ; "+k+") : "+casesCochees[letat][valeurLue][k]);
		if (casesCochees[letat][valeurLue][k]) 
		{
			window.console.log("changement écriture = "+(k));
			lesDisques[numDisque].changeEtat(k);
		}
	}
	// zone de déplacement
	// déplacement vers la gauche
	if (casesCochees[letat][valeurLue][3]) 
		{
			window.console.log("à gauche");
			for (var l=0;l<nbDisques;l++)
      		{
        		lesDisques[l].aGauche();
      		}
		}
	// déplacement vers la droite
	if (casesCochees[letat][valeurLue][4]) 
		{
			window.console.log("à droite");
			for (var l=0;l<nbDisques;l++)
      		{
        		lesDisques[l].aDroite();
      		}
		}
	// zone de changement d'étape
	var nvetat=letat;
	window.console.log("letat = "+letat+" ; valeurLue= "+valeurLue);
	for (var k=5;k<17;k++)
	{
		if (casesCochees[letat][valeurLue][k]) 
		{
			window.console.log("étape suivante : "+(k-4));
			nvetat=k-5;
		}
	}
	// retourne le nouvel état : nombre compris entre 1 et 12
	ancienneLecture=nouvelleLecture;
	return nvetat;
}
		
		

		
		
// L'animation
////////////////////////////
		
//var angle_base = TWO_PI / nbDisques;
		
// La fonction de démarrage
			
function setup()
{
  var leCanvas=createCanvas(800, 800);
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
  
  
  
  // le tableau de commandes
  tableauCommande();
  
  // initialisation des couleurs de case
  initCouleurCase();
  
  // fait disparaître temporairement les boutons suivant et arrêter
  document.getElementById("suivant").style.visibility="hidden";
	document.getElementById("arreter").style.visibility='hidden';
 }
 

  // La fonction qui tourne en boucle
function draw() 
{
  
}

 // quand la souris est enfoncée
  function mousePressed()
  {
    
    // test de la position de la souris
    //window.alert('souris ('+mouseX+';'+mouseY+')');
   // window.alert('repère ('+(mouseX-xDecalage)+';'+(mouseY-yDecalage)+')');
    
    // teste si un disque est dessous et en change l'état
    for (i=0;i<nbDisques;i++)
    {
      lesDisques[i].estSelectionne();
    }
    
    // teste si le bouton gauche est sélectionné et décale vers la gauche
    if (btn_Gauche.estSelectionne())
    {
      // remet le bouton de lecture à zéro
      btn_ValeurLue.changeTexte(" ");
      
      for (i=0;i<nbDisques;i++)
      {
        lesDisques[i].aGauche();
      }
      
    }
    
    // teste si le bouton droite est sélectionné et décale vers la droite
    if (btn_Droite.estSelectionne())
    {
      // remet le bouton de lecture à zéro
      btn_ValeurLue.changeTexte(" ");
      
      for (i=0;i<nbDisques;i++)
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
      for (i=0;i<nbDisques;i++)
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
      for (i=0;i<nbDisques;i++)
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
      for (i=0;i<nbDisques;i++)
      {
        // je teste l'abscisse et non l'angle pour éviter le modulo 2π
        if (lesDisques[i].y==284) lesDisques[i].changeEtat(2);
      }
    }
    
    
    // lecture
    
    if (btn_Lecture.estSelectionne())
    {
      // détecte le bouton sur la zone de lecture/écriture
      for (i=0;i<nbDisques;i++)
      {
        var sonTexte=" ";
        // je teste l'abscisse et non l'angle pour éviter le modulo 2π
        if (lesDisques[i].y==284) 
        {
          if (lesDisques[i].etat==0) sonTexte="B";
          if (lesDisques[i].etat==1) sonTexte="0";
          if (lesDisques[i].etat==2) sonTexte="1";
          btn_ValeurLue.changeTexte(sonTexte);
        }
      }
    }
    
    
  }
  
 



	