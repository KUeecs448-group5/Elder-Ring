import { playerAction } from "./game.js";
//character creator used "a1 = new character"
import {enemyAnimate, names, enames, music, playerIdleGifs, enemyIdleGifs, background, charId, nameId, values, bAattack, bAaoe, bAitem, bAheal, bTattack, bTaoe, bTitem, bTheal, bANattack, bANdamage, healthId, manaId, deathId} from './data.js';


//For the Stamina 
//var Stamina = Stamina + 10
//if (fight with boss)
//  {  return Stamina}
export default class Character{
	
/**
Pre: 
Post: character created 
Param: m_health, max health
	m_magic, max magic
	m_name, character name
	numberValue, id for html
**/
	constructor(m_health, m_magic, m_name, numberValue){
		this.health = m_health;//curent health of character, if this reaches 0 they should die
		this.max_health = m_health;//max_health to pervent/keep track of overhealing
		this.magic = m_magic;//current magic level for spells and skills, should fail/not cast if there is not enought magic
		this.max_magic = m_magic;//max_magic to pervent over"heal"
		this.mM = 1;//manaMultiplier, for things like buffs and debuffs / difficulty
		this.dM = 1;//damageMultiplier, same^
		this.crit = 10;//random(0-crit) amount of damage added to base damage
		this.name = m_name;
		this.numberValue = numberValue;
		this.item = 3;//number of firebombs
	}

/**
Pre:  
Post: This character attacks defender 
Param: defender, enemy to attack
	damage, amount of damage
**/
	async applyDamage(defender,damage){
		var dam = defender.dM*(damage+this.random(this.crit));//dam = final damage calculation
		let temp = defender.health;
			if(defender.health - dam > 0)
			{
				defender.health = defender.health - dam;
			}
			else
			{
				console.log("A Character Has Died")
				defender.health = 0;
				console.log("Hiding " + deathId[defender.getNumberValue()]);
				document.getElementById(deathId[defender.getNumberValue()]).style.visibility = "hidden";
			
			}
		//}
		//console.log(dam + " damage applied");
		await this.sleep(3000)
		let health = document.getElementById(healthId[defender.getNumberValue()][0])
		let healthbar = document.getElementById(healthId[defender.getNumberValue()][1]);
		for(let i = 0; i <dam;i++){
			healthbar.value = healthbar.value - 1;
			health.innerHTML = temp - 1;
			temp--
			await this.sleep(50)
		}
		//console.log(healthbar.value)
		//console.log(defender.getName() + " health: "+ defender.health);
	}
	
	//heals defender, makes sure no overheal
	applyHeal(defender,damage){
		var dam = defender.dM*(damage+this.random(this.crit));
		if((dam+defender.health)>defender.max_health){
			defender.health = defender.max_health;
		}
		else{
			defender.health = defender.health + dam;
		}
		document.getElementById(healthId[defender.getNumberValue()][0]).innerHTML = defender.health;
		let health = document.getElementById(healthId[defender.getNumberValue()][1]);
		health.value = health.value + dam;
	}
	
	
	//takes magic from attacker, input base mana
	applyMagic(mana){
		var man = this.magic - (this.mM*mana);
		if(man>=0){
			if(this.getNumberValue()>2){
				document.getElementById(manaId[this.getNumberValue()]).innerHTML = man;
				document.getElementById(manaId[this.getNumberValue()-3]).value = man;
			}
			this.magic = man;
			//console.log( this.getName() + " used " +  mana + " Mana. " + this.magic + " Mana remaining.");
			return true;
		}
		else{
			return false;
		}
		
	}

	//function for returning a random number between 0 and x
	random(x){
		return Math.trunc(Math.random()*(x+1));
	}
	
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	  }

/**
Pre:  
Post: damage defender using the damage and mana in nums 
Param: defender, the enemy being attacked
	  nums, 2 element array, damage and mana cost
**/
	damage_single(defender, nums){//nums[0] = damage, nums[1] = mana
		if(this.applyMagic(nums[1])){
			//console.log(this.getName() + " does attack with " + nums[0] + " base damage on " + defender.getName());
			//await this.sleep(3000)
			//actionBox.innerHTML = this.getName() + " does attack with " + nums[0] + " base damage on " + defender.getName()
			this.applyDamage(defender, nums[0]);
		}
	}

/**
Pre: 
Post: heal's defender with damage and mana in nums
Param: defender, the ally being healed
	  nums, 2 element array, damage and mana cost
**/
	heal_single(defender, nums){
		if(this.applyMagic(nums[1])){
			this.applyHeal(defender,nums[0]);
			//actionBox.innerHTML = this.getName() + " does heal " + defender.getName() + " for "+ nums[0] +" base health."
		}
	}
	
/**
Pre: 
Post: damage group with damage and mana in nums
Param: group, the group of enemies being attacked
	  nums, 2 element array, damage and mana cost
**/
	damage(group, nums){//group can be individual or group, nums is array [damage, mana]
		if (this.magic>=(3*nums[1])){
			let current = this.magic
			group.map(x => this.damage_single(x,nums));
			this.magic = current-(3*(this.mM*nums[1]));
		}

	}

	//unused
	heal(group, nums){
		group.map(x => this.heal_single(x,nums));
	}

/**
Pre: 
Post: attacks defender with damage and mana in nums
Param: defender, the enemy being attacked
	  nums, 2 element array, damage and mana cost
**/
	useItem(defender, nums){
		if(this.item>0){
			//console.log(this.getName() + " used an item on " + defender.getName());
			this.applyDamage(defender,nums[0]);
			//actionBox.innerHTML = this.getName() + " used an item on " + defender.getName()
			this.item--;
			//console.log(this.getName() + " item inventory: " + this.item);
			
		}
		else{
			//actionBox.innerHTML = "Failed attacking with item";
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
	getMana(){
		return this.magic;
	}

	isAlive(){
		if(this.health < 1){
			return false;	
		}
		else{
			return true;
		}
	}

	getInv(){
		return this.item;
	}
}
