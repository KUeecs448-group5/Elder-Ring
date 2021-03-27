

//character creator used "a1 = new character"
function character(m_health, m_magic, m_armor){
	this.health = m_health;
	this.max_health = m_health;
	this.magic = m_magic;
	this.max_magic = m_magic;
	this.armor = m_armor;
	this.mM = 1;//manaMultiplier
	this.dM = 1;//damageMultiplier
}

//function to calculate and apply damage to defender, input is base damage
function applyDamage(defender,damage){
	if(defender.armor>(dM*damage)){}
	else{
		defender.health = defender.health - (defender.dM*damage) + defender.armor;
	}
}

//heals defender, makes sure no overheal
function applyHeal(defender,damage){
	if(((damage*defender.dM)+defender.health)>defender.max_health){
		defender.health = defender.max_health;
	}
	else{
		defender.health = defender.health + (damage*defender.dM);
	}
}


//takes magic from attacker, input base mana
function applyMagic(attacker,mana){
	attacker.magic = attacker.magic - (attacker.mM*mana);
}

function single(attacker, defender, damage, mana){
	applyDamage(defender,damage);
	applyMagic(attacker,mana);
}

function aoe(attacker, group, damage, mana){
	group.map(x=>applyDamage(x,damage));
	applyMagic(attacker,mana);	
}

function heal(attacker, defender, damage, mana){//I know this doesnt make sense but im keeping the variables the same for consistancy
	applyHeal(defender,damage);
	applyMagic(attacker,mana);	
}

function groupHeal(attacker, group, damage, mana){
	group.map(x=>applyHeal(x,damage));
	applyMagic(attacker,mana);
}


