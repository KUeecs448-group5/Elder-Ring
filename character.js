

//character creator used "a1 = new character"
function character(m_health, m_magic, m_armor){
	this.health = m_health;//curent health of character, if this reaches 0 they should die
	this.max_health = m_health;//max_health to pervent/keep track of overhealing
	this.magic = m_magic;//current magic level for spells and skills, should fail/not cast if there is not enought magic
	this.max_magic = m_magic;//max_magic to pervent over"heal"
	this.armor = m_armor;//current armor value, armor must all be broken before health begins to go down
	this.mM = 1;//manaMultiplier, for things like buffs and debuffs / difficulty
	this.dM = 1;//damageMultiplier, same^
	this.crit = 10;//random(0-crit) amount of damage added to base damage
}

//function to calculate and apply damage to defender, input is base damage
function applyDamage(attacker,defender,damage){
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
}

//heals defender, makes sure no overheal
function applyHeal(attacker,defender,damage){
	var dam = defender.dM*(damage+random(attacker.crit));
	if((dam+defender.health)>defender.max_health){
		defender.health = defender.max_health;
	}
	else{
		defender.health = defender.health + dam;
	}
}


//takes magic from attacker, input base mana
function applyMagic(attacker,mana){
	attacker.magic = attacker.magic - (attacker.mM*mana);
}

function random(x){//function for returning a random number between 0 and x
	return Math.trunc(Math.random()*(x+1));
}

function single(attacker, defender, damage, mana){
	applyDamage(attacker,defender,damage);
	applyMagic(attacker,mana);
}

function aoe(attacker, group, damage, mana){
	group.map(x=>applyDamage(attacker,x,damage));
	applyMagic(attacker,mana);	
}

function heal(attacker, defender, damage, mana){//I know this doesnt make sense but im keeping the variables the same for consistancy
	applyHeal(attacker,defender,damage);
	applyMagic(attacker,mana);	
}

function groupHeal(attacker, group, damage, mana){
	group.map(attacker,x=>applyHeal(x,damage));
	applyMagic(attacker,mana);
}

//dont know what to call these so ill be explicit
function singlePlayer(attacker, defender){
	single(attacker, defender, 20, 10);
}

function aoePlayer(attacker, group){
	aoe(attacker, group, 5, 15);
}

function healPlayer(attacker, defender){
	heal(attacker, defender, 10, 15);
}

function groupHealPlayer(attacker, group){
	groupHeal(attacker, defender, 10, 15);
}

function singleEnemy(attacker, defender){
	single(attacker, defender, 20, 10);
}

function aoeEnemy(attacker, group){
	aoe(attacker, group, 5, 15);
}

function healEnemy(attacker, defender){
	heal(attacker, defender, 10, 15);
}

function groupHealEnemy(attacker, group){
	groupHeal(attacker, defender, 10, 15);
}


