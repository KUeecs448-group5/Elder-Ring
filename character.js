import { playerAction } from "./game.js";
var isAlive=setInterval(isAlive,1000);
//character creator used "a1 = new character"
export default class Character{
	
	constructor(m_health, m_magic, m_armor,m_name,numberValue){
		this.health = m_health;//curent health of character, if this reaches 0 they should die
		this.max_health = 100;//max_health to pervent/keep track of overhealing
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

		useBomb(attacker, defender, characterValue){
			if(attacker.item>0){
				this.applyDamage(attacker,defender,10,characterValue);
				attacker.item--;
			}
			
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
			console.log(dam + " damage applied");
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

			console.log("Character "+ characterValue + " health: "+ defender.health);
		}
		
		//heals defender, makes sure no overheal
		applyHeal(attacker,defender,damage){
			var dam = defender.dM*(damage+this.random(attacker.crit));
			console.log(attacker+" healed "+defender+"for "+ dam);
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
				console.log(mana + " mana used");
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
				this.applyDamage(attacker,defender,damage,defender.getNumberValue());
			}
		}
		
		aoe(attacker, group, damage, mana){
			if(this.applyMagic(attacker,mana)){
				//group.map(x=>this.applyDamage(attacker,x,damage,x.getNumberValue()));
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
		
		groupHeal(attacker, group, damage, mana){
			if(this.applyMagic(attacker,mana)){
				group.map(attacker,x=>this.applyHeal(x,damage));
			}
		}
		
		//dont know what to call these so ill be explicit
		singlePlayer(attacker, defender){
			this.single(attacker, defender, 20, 10);
			console.log(attacker.getName() + " performs single attack on " + defender.getName());
		}
		
		aoePlayer(attacker, group){
			this.aoe(attacker, group, 5, 15);
			console.log(attacker.getName() + " performs AOE on Bad Guys");
		}
		
		healPlayer(attacker, defender){
			this.heal(attacker, defender, 10, 15);
			console.log(attacker.name+" heals " + defender.name);
		}
		
		groupHealPlayer(attacker, group){
			this.groupHeal(attacker, defender, 10, 15);
		}
		
		singleEnemy(attacker, defender){
			this.single(attacker, defender, 20, 10);
			console.log(attacker.getName() + " performs single attack on " + defender.name);
		}
		
		aoeEnemy(attacker, group){
			this.aoe(attacker, group, 5, 15);
			console.log(attacker.getName() + " performs aoe");
		}
		
		healEnemy(attacker, defender){
			this.heal(attacker, defender, 10, 15);
			console.log(attacker.getName() + " heals " + defender.getName());
		}
		
		groupHealEnemy(attacker, group){
			this.groupHeal(attacker, defender, 10, 15);
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

		isAlive(attacker, defender){
			if(attacker.health < 1){
				clearInterval(playerAction);	
			}

			if(defender.health < 1){
				clearInterval(enemyAction);
			}
		}
}