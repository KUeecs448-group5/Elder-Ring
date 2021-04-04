import { playerAction } from "./game.js";
//character creator used "a1 = new character"
export default class Character{
	
	constructor(m_health, m_magic, m_armor,m_name,numberValue){
		this.health = m_health;//curent health of character, if this reaches 0 they should die
		this.max_health = m_health;//max_health to pervent/keep track of overhealing
		this.magic = m_magic;//current magic level for spells and skills, should fail/not cast if there is not enought magic
		this.max_magic = m_magic;//max_magic to pervent over"heal"
		this.armor = m_armor;//current armor value, armor must all be broken before health begins to go down
		this.mM = 1;//manaMultiplier, for things like buffs and debuffs / difficulty
		this.dM = 1;//damageMultiplier, same^
		this.crit = 10;//random(0-crit) amount of damage added to base damage
		this.name = m_name;
		this.numberValue = numberValue;
		this.item = 3;//number of firebombs
	}

	applyDamage(attacker,defender,damage,characterValue){
		var dam = defender.dM*(damage+this.random(attacker.crit));//dam = final damage calculation
		// if(defender.armor>0){
		// 	var armorDamage = defender.armor - dam;
		// 	if(armorDamage<0){
		// 		defender.arm1or = 0;
		// 		armorDamage = -1*armorDamage;
		// 		defender.health = defender.health - dam;
		// 	}
		// 	else{
		// 		if(defender.health - dam >= 0)
		//		{
		//			defender.health = defender.health - dam;
		//		}
		//		else
		//		{
		//			defender.health = 0;
		//		}
		// 	}
		// }
		// else{
			if(defender.health - dam >= 0)
			{
				defender.health = defender.health - dam;
			}
			else
			{
				defender.health = 0;
			}
		//}
		//console.log(dam + " damage applied");
		if(characterValue == 0){
			document.getElementById("ehealth1").innerHTML = defender.health;
		}
		else if(characterValue == 1){
			document.getElementById("ehealth2").innerHTML = defender.health;
		}
		else if(characterValue == 2){
			document.getElementById("ehealth3").innerHTML = defender.health;
		}
		else if(characterValue == 3){
			document.getElementById("health1").innerHTML = defender.health;
		}
		else if(characterValue == 4){
			document.getElementById("health2").innerHTML = defender.health;
		}
		else if(characterValue == 5){
			document.getElementById("health3").innerHTML = defender.health;
		}

		console.log(defender.getName() + " health: "+ defender.health);
	}
	
	//heals defender, makes sure no overheal
	applyHeal(attacker,defender,damage){
		var dam = defender.dM*(damage+this.random(attacker.crit));
		console.log(attacker.name +" healed "+defender.name+" for "+ dam);
		if((dam+defender.health)>defender.max_health){
			defender.health = defender.max_health;
		}
		else{
			defender.health = defender.health + dam;
		}

		if(defender.numberValue == 0){
			document.getElementById("ehealth1").innerHTML = defender.health;
		}
		else if(defender.numberValue == 1){
			document.getElementById("ehealth2").innerHTML = defender.health;
		}
		else if(defender.numberValue == 2){
			document.getElementById("ehealth3").innerHTML = defender.health;
		}
		else if(defender.numberValue == 3){
			document.getElementById("health1").innerHTML = defender.health;
		}
		else if(defender.numberValue == 4){
			document.getElementById("health2").innerHTML = defender.health;
		}
		else if(defender.numberValue == 5){
			document.getElementById("health3").innerHTML = defender.health;
		}

	}
	
	
	//takes magic from attacker, input base mana
	applyMagic(attacker,mana){
		var man = attacker.magic - (attacker.mM*mana);
		if(man>=0){
			if(attacker.numberValue == 3){
				document.getElementById("mana1").innerHTML = man;
			}
			else if(attacker.numberValue == 4){
				document.getElementById("mana2").innerHTML = man;
			}
			else if(attacker.numberValue == 5){
				document.getElementById("mana3").innerHTML = man;
			}
			attacker.magic = man;
			console.log(attacker.getName() + " used " +  mana + " Mana. " + attacker.magic + " Mana remaining.");
			return true;
		}
		else{
			return false;
		}
		
	}
	
	random(x){//function for returning a random number between 0 and x
		return Math.trunc(Math.random()*(x+1));
	}
	
	single(attacker, defender, damage, mana){
		if(this.applyMagic(attacker,mana,attacker.getNumberValue())){
			console.log(attacker.getName() + " does single attack on " + defender.getName());
			this.applyDamage(attacker,defender,damage,defender.getNumberValue());
		}
	}
	
	aoe(attacker, group, damage, mana){
		if(this.applyMagic(attacker,mana)){
			console.log(attacker.getName() + " does AOE attack");
			for(let i = 0; i < group.length; i++){
				this.applyDamage(attacker, group[i], damage, group[i].getNumberValue());
			}
		}
	}
	
	heal(attacker, defender, damage, mana){//I know this doesnt make sense but im keeping the variables the same for consistancy
		if(this.applyMagic(attacker,mana)){
			this.applyHeal(attacker,defender,damage);
		}	
	}
	useBomb(attacker, defender){
		if(attacker.item>0){
			console.log(attacker.getName() + " used a bomb on " + defender.getName());
			this.applyDamage(attacker,defender,20,defender.getNumberValue());
			attacker.item--;
			console.log(attacker.getName() + " bomb inventory: " + attacker.item);
			
		}
		else{
			console.log("Failed attacking with item");
		}
	}
	/*
	groupHeal(attacker, group, damage, mana){
		if(this.applyMagic(attacker,mana)){
			group.map(attacker,x=>this.applyHeal(x,damage));
		}
	}
	*/
	//dont know what to call these so ill be explicit
	singlePlayer(attacker, defender){
		this.single(attacker, defender, 15, 10);
	}
	
	aoePlayer(attacker, group){
		this.aoe(attacker, group, 5, 15);
	}
	
	healPlayer(attacker, defender){
		this.heal(attacker, defender, 10, 15);
	}
	/*
	groupHealPlayer(attacker, group){
		this.groupHeal(attacker, defender, 10, 15);
	}
	*/
	singleEnemy(attacker, defender){
		this.single(attacker, defender, 20, 10);
		
	}
	
	aoeEnemy(attacker, group){
		this.aoe(attacker, group, 5, 15);
	}
	
	healEnemy(attacker, defender){
		this.heal(attacker, defender, 10, 15);
	}
	/*
	groupHealEnemy(attacker, group){
		this.groupHeal(attacker, defender, 10, 15);
	}
	*/
	getName(){
		return this.name;
	}

	getNumberValue(){
		return this.numberValue;
	}

	getHealth(){
		return this.health;
	}

	isAlive(){
		if(this.health < 1){
			return false;	
		}
		else{
			return true;
		}
	}
}