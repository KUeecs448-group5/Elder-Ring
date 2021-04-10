import { playerAction } from "./game.js";
//character creator used "a1 = new character"
export default class Character{
	
	constructor(m_health, m_magic, m_name, numberValue){
		this.health = m_health;//curent health of character, if this reaches 0 they should die
		this.max_health = m_health;//max_health to pervent/keep track of overhealing
		this.magic = m_magic;//current magic level for spells and skills, should fail/not cast if there is not enought magic
		this.max_magic = m_magic;//max_magic to pervent over"heal"
		//this.armor = m_armor;//current armor value, armor must all be broken before health begins to go down
		this.mM = 1;//manaMultiplier, for things like buffs and debuffs / difficulty
		this.dM = 1;//damageMultiplier, same^
		this.crit = 10;//random(0-crit) amount of damage added to base damage
		this.name = m_name;
		this.numberValue = numberValue;
		this.item = 3;//number of firebombs
	}

	applyDamage(defender,damage){
		var dam = defender.dM*(damage+this.random(this.crit));//dam = final damage calculation
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

		console.log(defender.getName() + " health: "+ defender.health);
	}
	
	//heals defender, makes sure no overheal
	applyHeal(defender,damage){
		var dam = defender.dM*(damage+this.random(this.crit));
		console.log(this.name +" healed "+defender.name+" for "+ dam);
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
	applyMagic(mana){
		var man = this.magic - (this.mM*mana);
		if(man>=0){
			if(this.numberValue == 3){
				document.getElementById("mana1").innerHTML = man;
			}
			else if(this.numberValue == 4){
				document.getElementById("mana2").innerHTML = man;
			}
			else if(this.numberValue == 5){
				document.getElementById("mana3").innerHTML = man;
			}
			this.magic = man;
			console.log(this.getName() + " used " +  mana + " Mana. " + this.magic + " Mana remaining.");
			return true;
		}
		else{
			return false;
		}
		
	}
	
	random(x){//function for returning a random number between 0 and x
		return Math.trunc(Math.random()*(x+1));
	}
	
	damage_single(defender, nums){//nums[0] = damage, nums[1] = mana
		if(this.applyMagic(nums[1])){
			console.log(this.getName() + " does attack with " + nums[0] + " base damage on " + defender.getName());
			this.applyDamage(defender, nums[0]);
		}
	}

	heal_single(defender, nums){
		if(this.applyMagic(nums[1])){
			console.log(this.getName() + " does heal with " + nums[0] + " base health on " + defender.getName());
			this.applyHeal(defender,nums[0]);
		}
	}
	
	//THESE 3 ARE THE IMPORTANT ONES
	//IMPORTANT FOR AOE ATTACKS MANA IS NOT A ONE TIME FEE, FOR A GROUP OF 3 MANA SPENDS 3 TIMES, 2 2, so on.
	damage(group, nums){//group can be individual or group, nums is array [damage, mana]
		group.map(x => this.damage_single(x,nums));
	}

	heal(group, nums){
		group.map(x => this.heal_single(x,nums));
	}

	useItem(defender, nums){
		if(this.item>0){
			console.log(this.getName() + " used a bomb on " + defender.getName());
			this.applyDamage(defender,nums[0]);
			this.item--;
			console.log(this.getName() + " bomb inventory: " + this.item);
			
		}
		else{
			console.log("Failed attacking with item");
		}
	}
	
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