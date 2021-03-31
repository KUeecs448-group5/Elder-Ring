import { playerAction, enemyAction } from "./game";
var isAlive=setInterval(isAlive,1000);
//character creator used "a1 = new character"
export default class Character{
	
	constructor(m_health, m_magic, m_armor){
		this.health = m_health;//curent health of character, if this reaches 0 they should die
		this.max_health = m_health;//max_health to pervent/keep track of overhealing
		this.magic = m_magic;//current magic level for spells and skills, should fail/not cast if there is not enought magic
		this.max_magic = m_magic;//max_magic to pervent over"heal"
		this.armor = m_armor;//current armor value, armor must all be broken before health begins to go down
		this.mM = 1;//manaMultiplier, for things like buffs and debuffs / difficulty
		this.dM = 1;//damageMultiplier, same^
		this.crit = 10;//random(0-crit) amount of damage added to base damage
	}
		applyDamage(attacker,defender,damage){
			var dam = defender.dM*(damage+random(attacker.crit));//dam = final damage calculation
			if(defender.armor>0){
				var armorDamage = defender.armor - dam;
				if(armorDamage<0){
					defender.armor = 0;
					armorDamage = -1*armorDamage;
					defender.health = defender.health - dam;
				}
				else{
					defender.armor = defender.armor - dam;
				}
			}
			else{
				defender.health = defender.health - dam;
			}
			console.log("damage applied");
		}
		
		//heals defender, makes sure no overheal
		applyHeal(attacker,defender,damage){
			var dam = defender.dM*(damage+Math.random(attacker.crit));
			if((dam+defender.health)>defender.max_health){
				defender.health = defender.max_health;
			}
			else{
				defender.health = defender.health + dam;
			}
		}
		
		
		//takes magic from attacker, input base mana
		applyMagic(attacker,mana){
			attacker.magic = attacker.magic - (attacker.mM*mana);
		}
		
		random(x){//function for returning a random number between 0 and x
			return Math.trunc(Math.random()*(x+1));
		}
		
		single(attacker, defender, damage, mana){
			this.applyDamage(attacker,defender,damage);
			this.applyMagic(attacker,mana);
		}
		
		aoe(attacker, group, damage, mana){
			group.map(x=>this.applyDamage(attacker,x,damage));
			this.applyMagic(attacker,mana);	
		}
		
		heal(attacker, defender, damage, mana){//I know this doesnt make sense but im keeping the variables the same for consistancy
			this.applyHeal(attacker,defender,damage);
			this.applyMagic(attacker,mana);	
		}
		
		groupHeal(attacker, group, damage, mana){
			group.map(attacker,x=>this.applyHeal(x,damage));
			this.applyMagic(attacker,mana);
		}
		
		//dont know what to call these so ill be explicit
		singlePlayer(attacker, defender){
			this.single(attacker, defender, 20, 10);
		}
		
		aoePlayer(attacker, group){
			this.aoe(attacker, group, 5, 15);
		}
		
		healPlayer(attacker, defender){
			this.heal(attacker, defender, 10, 15);
		}
		
		groupHealPlayer(attacker, group){
			this.groupHeal(attacker, defender, 10, 15);
		}
		
		singleEnemy(attacker, defender){
			this.single(attacker, defender, 20, 10);
		}
		
		aoeEnemy(attacker, group){
			this.aoe(attacker, group, 5, 15);
		}
		
		healEnemy(attacker, defender){
			this.heal(attacker, defender, 10, 15);
		}
		
		groupHealEnemy(attacker, group){
			this.groupHeal(attacker, defender, 10, 15);
		}

		hello(){
			console.log("Warrior says Hi.");
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