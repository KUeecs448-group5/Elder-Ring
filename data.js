let names = [//names of allies
    [
        "Hodir",
        "Solaire",
        "Artorias"
    ],
    [
        "Tifa Lockhart",
        "Cloud Strife",
        "Barret Wallace"
    ],
    [
        "Unit 00, Rei",
        "Unit 01, Shinji",
        "Unit 02, Asuka"
    ]
];

let enames = [//names of enemies
    [
        "Skeleton 1",
        "Gravelord Nito",
        "Skeleton 2"
    ],
    [
        "Skeleton 1",
        "Sephiroth",
        "Skeleton 2"
    ],
    [
        "Mass Produced Eva 1",
        "Angel",
        "Mass Produced Eva 2"
    ]
];

let music = [//id tag for audio
    "PPP",
    "OWA",
    "NGE"
];

let playerIdleGifs = [//default player animation
    [
        "assets/DS-dir/characters/spear.gif",
        "assets/DS-dir/characters/solaire.gif",
        "assets/DS-dir/characters/artorias.gif"
    ],
    [
        "assets/FF-dir/characters/FFGirlIdle.gif",
        "assets/FF-dir/characters/cloudStrifeIdle.gif",
        "assets/FF-dir/characters/barretWallaceIdle.gif"
    ],
    [
        "assets/NGE-dir/characters/unit00.png",
        "assets/NGE-dir/characters/unit01.gif",
        "assets/NGE-dir/characters/unit02.png"
    ]
];

let enemyIdleGifs = [//default enemy animation
    [
        "assets/DS-dir/characters/skeleton.gif",
        "assets/DS-dir/characters/nito.gif",
        "assets/DS-dir/characters/skeleton.gif"
    ],
    [
        "assets/FF-dir/characters/skeleton.gif",
        "assets/FF-dir/characters/SephirothIdle.gif",
        "assets/FF-dir/characters/skeleton.gif"
    ],
    [
        "assets/NGE-dir/characters/massProducedEva2.png",
        "assets/NGE-dir/characters/angel.gif",
        "assets/NGE-dir/characters/massProducedEva1flip.png"
    ]
];

let background = [//background image
    "assets/DS-dir/Battle.jpeg",
    "assets/FF-dir/Battle2.jpg",
    "assets/NGE-dir/Battle3.jpg"
];

var charId = [//character images
    document.getElementById("enemy1Click"),
    document.getElementById("enemy2Click"),
    document.getElementById("enemy3Click"),
    document.getElementById("player1Click"),
    document.getElementById("player2Click"),
    document.getElementById("player3Click"),
];

var nameId = [//front end name plates
    document.getElementById("name1"),
    document.getElementById("name2"),
    document.getElementById("name3"),
    document.getElementById("name4"),
    document.getElementById("name5"),
    document.getElementById("name6")
];

var values = [//values for attacks [damage, mana cost]
    [15,10],//single attack player 0
    [5,5],//aoe player 1
    [10,15],//heal player 2
    [20,0],//item 3
    [20,10],//single attack enemy 4
    [5,5],//aoe enemy 5
    [10,15]//heal enemy 6
];

let bAattack =[//button Asset attack
    [//all sword button images
        "assets/DS-dir/single/halberd.png",
        "assets/DS-dir/single/solaire-sword.png",
        "assets/DS-dir/single/sword.png"
    ],
    [//attack button
        "assets/FF-dir/single/LeatherGlove.png",
        "assets/FF-dir/single/busterSword.png",
        "assets/FF-dir/single/GatlingGun.png"
    ],
    [//replace with progressive knife png
        "assets/NGE-dir/single/spear_of_longinus.png",
        "assets/NGE-dir/single/vibroKnife.png",
        "assets/NGE-dir/single/kensara.png"
    ]
];

let bAaoe=[//aoe button assets
    [//all aoe button images
        "assets/DS-dir/aoe/aoe.png",
        "assets/DS-dir/aoe/lightning_storm.png",
        "assets/DS-dir/aoe/affinity.png"
    ],
    [//aoe
        "assets/FF-dir/aoe/DragonClaw.png",
        "assets/FF-dir/aoe/UltimaWeapon.png",
        "assets/FF-dir/aoe/rocketPunch.png"
    ],
    [//replace with neon genesis aoe
        "assets/NGE-dir/aoe/sniper.png",
        "assets/NGE-dir/aoe/berserk.png",
        "assets/NGE-dir/aoe/beast.png"
    ]
];

let bAitem=[//item button assets
    [//all item button images
        "assets/DS-dir/item/bomb.png",
        "assets/DS-dir/item/lightning_urn.png",
        "assets/DS-dir/item/throwing_knife.png"
    ],
    [
        "assets/FF-dir/item/SpiderSilk.png",
        "assets/FF-dir/item/VampireFang.png",
        "assets/FF-dir/item/NitroPowder.png"
    ],
    [ //neon genesis items
        "assets/NGE-dir/item/cannon.png",
        "assets/NGE-dir/item/rifle.png",
        "assets/NGE-dir/item/bazooka.png"
    ]
];

let bAheal=[//heal button assets
    "assets/DS-dir/heal.png",
    "assets/FF-dir/cure.png",
    "assets/NGE-dir/engine-charge.png"
];

let bTattack =[//button Text attack
    [//all sword button images
        "<strong>Halberd</strong>",
        "<strong>Sunlight Sword</strong>",
        "<strong>Wolf Knight Sword</strong>"
    ],
    [//attack button
        "<strong>Knuckles</strong>",
        "<strong>Buster Sword</strong>",
        "<strong>Gatling Gun</strong>"
    ],
    [//attack button
        "<strong>Spear of Longinus</strong>",
        "<strong>Progressive Knife</strong>",
        "<strong>Kensara</strong>"
    ]
];

let bTaoe=[//aoe text
    [//all aoe button images
        "<strong>Fire Storm</strong>",
        "<strong>Lightning Strike</strong>",
        "<strong>Dark Affinity</strong>"
    ],
    [//aoe
        "<strong>Dragon Claw</strong>",
        "<strong>Ultima Weapon</strong>",
        "<strong>Rocket Punch</strong>"
    ],
    [//aoe
        "<strong>Sniper Rifle</strong>",
        "<strong>Berserk</strong>",
        "<strong>Beast Mode</strong>"
    ]
];

let bTitem=[//item text
    [//all item button images
        "<strong>Fire Bomb</strong>",
        "<strong>Lightning Urn</strong>",
        "<strong>Throwing Knife</strong>"
    ],
    [
        "<strong>Spider Silk</strong>",
        "<strong>Vampire Fang</strong>",
        "<strong>Nitro Powder</strong>"
    ],
    [
        "<strong>Positron Cannon</strong>",
        "<strong>Pallet Rifle</strong>",
        "<strong>Bazooka</strong>"
    ]
];

let bTheal=[//heal text
    "<strong>Estus Flask</strong>",
    "<strong>Cure</strong>",
    "<strong>S2 Engine Charge</strong>"
];

let bANattack=[//attack animation
    [
        "assets/DS-dir/animations/halberdGif.gif",
        "assets/DS-dir/animations/solaireCrop.png",
        "assets/DS-dir/animations/artoriasAttack3.gif"
    ],
    [
        "unit00attack.gif",
        "unit01attack.gif",
        "unit02attack.gif"
    ],
    [
        "assets/NGE-dir/animations/unit00attack.gif",
        "assets/NGE-dir/animations/unit01attack.gif",
        "assets/NGE-dir/animations/unit02attack.gif"
    ],
];

let bANdamage=[//damage animation
    [
        "assets/DS-dir/animations/spearDamage.gif",
        "assets/DS-dir/animations/solaireDamage2.gif",
        "assets/DS-dir/animations/artoriasDamage2.gif"
    ],
    [
        "unit00attack.gif",
        "unit01attack.gif",
        "unit02attack.gif"
    ],
    [
        "assets/NGE-dir/animations/unit00damage.gif",
        "assets/NGE-dir/animations/unit01damage.gif",
        "assets/NGE-dir/animations/unit02damage.gif"
    ],    
];

var deathId = [//id of the entire character element
	"enemy1",
	"enemy2",
	"enemy3",
	"player1",
	"player2",
	"player3"
];

var healthId = [//id of the healthbar numbers and bars
	["ehealth1","ehealthbar1"],
	["ehealth2","ehealthbar2"],
	["ehealth3","ehealthbar3"],
	["health1","healthbar1"],
	["health2","healthbar2"],
	["health3","healthbar3"]
];

var manaId = [//id of the mana bars and numbers
	"manabar1",
	"manabar2",
	"manabar3",
	"mana1",
	"mana2",
	"mana3"
];

let words = [//attack log text for variety
    [//attack
        " slashes ",
        " blasts ",
        " hits "
    ],
    [
        " blows them away!",
        " blasts them!",
        " goes all out!"
    ],
    [
        " heals ",
        " cures ",
        " regenerates "
    ]
]

let enemyAnimate = [
    [
        "assets/DS-dir/animations/skeletonDamage.gif",
        "assets/DS-dir/animations/nitoDamaged.gif",
        "assets/DS-dir/animations/skeletonDamage.gif"
    ],
    [
        "assets/FF-dir/animations/skeletonDamage.gif",
        "assets/FF-dir/animations/sephirothDamage.gif",
        "assets/FF-dir/animations/skeletonDamage.gif"
    ],
    [
        "assets/NGE-dir/animations/massDamage2.png",
        "assets/NGE-dir/animations/angelDamage.gif",
        "assets/NGE-dir/animations/massDamage1.png"
    ]
];

export{enemyAnimate, words, names, enames, music, playerIdleGifs, enemyIdleGifs, background, charId, nameId, values, bAattack, bAaoe, bAitem, bAheal, bTattack, bTaoe, bTitem, bTheal, bANattack, bANdamage, healthId, manaId, deathId};