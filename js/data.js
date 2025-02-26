var player = {
    points: new Decimal(0),
    bestPoints: new Decimal(0),
    oldBestPoints: new Decimal(1e100),
    spoints: new Decimal(0),
    prestige: new Decimal(0),

    boughtUpgrades: 0,
    currentUpgrade: 1,
    activeChal: 0,

    boosters: {
        1: {
            Cost: new Decimal(750),
            Bought: new Decimal(0),
            Effect: new Decimal(1),
        },
        2: {
            Cost: new Decimal(1e4),
            Bought: new Decimal(0),
            Effect: new Decimal(1),
        },
        3: {
            Cost: new Decimal(1e15),
            Bought: new Decimal(0),
            Effect: new Decimal(1),
        },
    },

    upgrades2: {
        1: {
            Bought: false,
            Cost: new Decimal(2),
            Effect: new Decimal(1)
        },
        2: {
            Bought: false,
            Cost: new Decimal(8),
            Effect: new Decimal(1)
        },
        3: {
            Bought: false,
            Cost: new Decimal(35),
            Effect: new Decimal(1)
        },
    },

    buyables: {
        1: {
            Cost: new Decimal(1),
            Bought: new Decimal(0),
            Effect: new Decimal(1),
            Exp: new Decimal(2.5)
        },
        2: {
            Cost: new Decimal(10),
            Bought: new Decimal(0),
            Effect: new Decimal(1),
            Exp: new Decimal(5)
        },
    },

    challenges: {
        1: {
            Require: new Decimal(1e12),
            Reached: false,
            Best: new Decimal(0),
            //chal. stats
            Score: new Decimal(0),
        },
    },

    //settings
    enableUpgLogs: true,

    prestige_confirm: true,
    super_confirm: true,

    //stats below for checks
    prestiged: false,

    //stats below not requires saving/loading
    spoints_cap: new Decimal(10), //i think not required?
    prestige_gain: new Decimal(0),
    prestige_gain_desc: "Required 100T Points",
    super_gain: new Decimal(0),
    super_gain_desc: "Required 1e100 Points",
}

var upgrades = {
    1: {
        Title: "Begin!",
        Info: "Start generating Points at the rate of 0.1/sec",
        Cost: 0,
    },
    2: {
        Title: "Boosting",
        Info: "x2 Point gain",
        Cost: 1.5,
    },
    3: {
        Title: "Boosting 2",
        Info: "x1.75 Point gain",
        Cost: 4,
    },
    4: {
        Title: "Boosting 3",
        Info: "x1.66 Point gain",
        Cost: 7,
    },
    5: {
        Title: "Boosting 4",
        Info: "x2.5 Point gain",
        Cost: 13,
    },
    6: {
        Title: "Boosting 6",
        Info: "x2 Point gain",
        Cost: 30,
    },
    7: {
        Title: "ok this is actually Boosting 6",
        Info: "x1.95 Point gain",
        Cost: 75,
    },
    8: {
        Title: "Boosting 7",
        Info: "x1.23 Point gain",
        Cost: 123.45,
    },
    9: {
        Title: "Boosting 8 (Last)",
        Info: "x2.75 Point gain",
        Cost: 175,
    },
    10: {
        Title: "Infinite Boosting",
        Info: "x1.5 Point gain and unlock Boosters",
        Cost: 500,
    },
    11: {
        Title: "i lied. Boosting 9",
        Info: "x2.22 Point gain",
        Cost: 1e3,
    },
    12: {
        Title: "Boosting 10",
        Info: "x3 Point gain",
        Cost: 3e3,
    },
    13: {
        Title: "Boosting 11",
        Info: "x2 Point gain",
        Cost: 1e4,
    },
    14: {
        Title: "Self-Gain",
        Info: "Points are boosted based on Points (x"+frt(player.points.add(1).pow(0.1))+")",
        Cost: 2e5,
    },
    15: {
        Title: "Boosting 12",
        Info: "x1.99 Point gain",
        Cost: 3e6,
    },
    16: {
        Title: "The First Layer",
        Info: "Unlock Prestige [PERMANENT] + x2 Point gain",
        Cost: 1e10,
    },
    17: {
        Title: "Boosting 13",
        Info: "x3.5 Point gain",
        Cost: 1e15,
    },
    18: {
        Title: "Boosting ~ Tier 2",
        Info: "x2.5 Point and x1.25 Prestige Point gain",
        Cost: 1e18,
    },
    19: {
        Title: "Boosting 2.0",
        Info: "x1.3 Prestige Point gain",
        Cost: 1e21,
    },
    20: {
        Title: "Base exponent increase",
        Info: "+0.035 base to Booster I",
        Cost: 1e25,
    },
    21: {
        Title: "Power up the formulas!",
        Info: "Second Prestige upgrade's formula is slightly better",
        Cost: 5e31,
    },
    22: {
        Title: "Boosting 14",
        Info: "x2.02 Point gain",
        Cost: 1e33,
    },
    23: {
        Title: "Boosting 15",
        Info: "x2.2901158923457452435436234568758435 Point gain",
        Cost: 2.5e34,
    },
    24: {
        Title: "Boosting 16",
        Info: "x5 Point gain",
        Cost: 1e35,
    },
    25: {
        Title: "Boosting 17",
        Info: "x10 Point gain",
        Cost: 1e36,
    },
    26: {
        Title: "Boosting 18",
        Info: "x3.33 Point gain",
        Cost: 1e40,
    },
    27: {
        Title: "Nerfed Self-Gain",
        Info: "Points are boosted based on Points (x"+frt(player.points.add(10).log(6).pow(0.4))+")",
        Cost: 4.44e44,
    },
    28: {
        Title: "Scary number",
        Info: "x6.66 Point gain",
        Cost: 6.66e66,
    },
    29: {
        Title: "Boosting 19",
        Info: "x3.21 Point gain",
        Cost: 6e86,
    },
    30: {
        Title: "the",
        Info: "Unlock Super-Points (still resets on Prestige :sob:)",
        Cost: 1e100,
    },
    31: {
        Title: "Actually first QoL???",
        Info: "On S-Point reset instead of reseting Prestige to 0 >>> ^0.1 the currency",
        Cost: 1e125,
    },
    32: {
        Title: "Maxed!",
        Info: "You have bought all upgrades",
        Cost: ":D",
    },
}

var maxUpgrades = Object.keys(upgrades).length - 1

function frt(val) {
    if (val == ":D") {return val}
    return Format(val)
}

var app = new Vue({
    el: "#app",
    data() {
        return {
            player,
            frt,
            upgrades,
        }
    },
})

//only for load
function get_boosterCost(bo) {
    const b = player.boosters[bo]
    if (bo == 1) {
        let form = new Decimal(2).pow(b.Bought).mul(750)
        if (b.Bought.gte(30)) {
            form = new Decimal(3.5).pow(b.Bought).mul(5000)
        }
        return form
    } else if (bo == 2) {
        let form = new Decimal(5).pow(b.Bought).mul(1e4)
        if (b.Bought.gte(35)) {
            form = new Decimal(8).pow(b.Bought).mul(1e9)
        }
        return form
    } else if (bo == 3) {
        let form = new Decimal(1e3).pow(b.Bought).mul(1e15)
        return form
    }
}

function get_buyablesCost(bo) {
    const b = player.buyables[bo]
    if (bo == 1) {
        let form = new Decimal(2.5).pow(b.Bought)
        return form
    } else if (bo == 2) {
        let form = new Decimal(5).pow(b.Bought).mul(10)
        return form
    }
}

function save() {
    //main
    localStorage.setItem("player-points", JSON.stringify(player.points.toString()))
    localStorage.setItem("player-best-points", JSON.stringify(player.bestPoints.toString()))
    localStorage.setItem("player-oldbest-points", JSON.stringify(player.oldBestPoints.toString()))
    localStorage.setItem("player-prestige", JSON.stringify(player.prestige.toString()))
    localStorage.setItem("player-super", JSON.stringify(player.spoints.toString()))
    localStorage.setItem("player-boughtUpgrades", JSON.stringify(player.boughtUpgrades))
    localStorage.setItem("player-currentUpgrade", JSON.stringify(player.currentUpgrade))

    //points
    localStorage.setItem("player-booster1", JSON.stringify(player.boosters[1].Bought.toString()))
    localStorage.setItem("player-booster2", JSON.stringify(player.boosters[2].Bought.toString()))
    localStorage.setItem("player-booster3", JSON.stringify(player.boosters[3].Bought.toString()))

    //prestige
    localStorage.setItem("player-upgrade2-1", JSON.stringify(player.upgrades2[1].Bought))
    localStorage.setItem("player-upgrade2-2", JSON.stringify(player.upgrades2[2].Bought))
    localStorage.setItem("player-upgrade2-3", JSON.stringify(player.upgrades2[3].Bought))
    localStorage.setItem("player-buyables1", JSON.stringify(player.buyables[1].Bought.toString()))
    localStorage.setItem("player-buyables2", JSON.stringify(player.buyables[2].Bought.toString()))

    //other
    localStorage.setItem("player-c1", JSON.stringify(player.challenges[1].Reached))
    localStorage.setItem("player-c1-best", JSON.stringify(player.challenges[1].Best))
    localStorage.setItem("player-c1-score", JSON.stringify(player.challenges[1].Score))

    localStorage.setItem("player-currentC", JSON.stringify(player.activeChal))

    //checks
    localStorage.setItem("player-prestiged", JSON.stringify(player.prestiged))

    //settings
    localStorage.setItem("player-setting-enableUpgLogs", JSON.stringify(player.enableUpgLogs))
    localStorage.setItem("player-setting-prestige_confirm", JSON.stringify(player.prestige_confirm))
    localStorage.setItem("player-setting-super_confirm", JSON.stringify(player.super_confirm))
}

function load() {
    if (JSON.parse(localStorage.getItem("player-points")) == null) {forceHReset(); return}

    //main
    player.points = new Decimal(JSON.parse(localStorage.getItem("player-points")) || 0)
    player.bestPoints = new Decimal(JSON.parse(localStorage.getItem("player-best-points")) || 0)
    player.oldBestPoints = new Decimal(JSON.parse(localStorage.getItem("player-oldbest-points")) || 0)
    player.prestige = new Decimal(JSON.parse(localStorage.getItem("player-prestige")) || 0)
    player.spoints = new Decimal(JSON.parse(localStorage.getItem("player-super")) || 0)
    player.boughtUpgrades = JSON.parse(localStorage.getItem("player-boughtUpgrades")) || 0
    player.currentUpgrade = JSON.parse(localStorage.getItem("player-currentUpgrade")) || 1

    //points
    player.boosters[1].Bought = new Decimal(JSON.parse(localStorage.getItem("player-booster1")) || 0)
    player.boosters[1].Cost = get_boosterCost(1)
    player.boosters[2].Bought = new Decimal(JSON.parse(localStorage.getItem("player-booster2")) || 0)
    player.boosters[2].Cost = get_boosterCost(2)
    player.boosters[3].Bought = new Decimal(JSON.parse(localStorage.getItem("player-booster3")) || 0)
    player.boosters[3].Cost = get_boosterCost(3)

    //prestige
    player.upgrades2[1].Bought = JSON.parse(localStorage.getItem("player-upgrade2-1")) || false
    player.upgrades2[2].Bought = JSON.parse(localStorage.getItem("player-upgrade2-2")) || false
    player.upgrades2[3].Bought = JSON.parse(localStorage.getItem("player-upgrade2-3")) || false
    player.buyables[1].Bought = new Decimal(JSON.parse(localStorage.getItem("player-buyables1")) || 0)
    player.buyables[1].Cost = get_buyablesCost(1)
    player.buyables[2].Bought = new Decimal(JSON.parse(localStorage.getItem("player-buyables2")) || 0)
    player.buyables[2].Cost = get_buyablesCost(2)

    //other
    player.challenges[1].Reached = JSON.parse(localStorage.getItem("player-c1")) || false
    player.challenges[1].Best = new Decimal(JSON.parse(localStorage.getItem("player-c1-best")) || 0)
    player.challenges[1].Score = new Decimal(JSON.parse(localStorage.getItem("player-c1-score")) || 0)

    player.activeChal = JSON.parse(localStorage.getItem("player-currentC")) || 0

    //checks
    player.prestiged = JSON.parse(localStorage.getItem("player-prestiged")) || false

    //settings
    player.enableUpgLogs = JSON.parse(localStorage.getItem("player-setting-enableUpgLogs"))
    player.prestige_confirm = JSON.parse(localStorage.getItem("player-setting-prestige_confirm"))
    player.super_confirm = JSON.parse(localStorage.getItem("player-setting-super_confirm"))

    //debug
    console.log("Game loaded")
}

function cleanPlayer() {
    player.points = new Decimal(0)
    player.bestPoints = new Decimal(0)
    player.oldBestPoints = new Decimal(0)
    player.prestige = new Decimal(0)
    player.spoints = new Decimal(0)
    
    player.boughtUpgrades = 0
    player.currentUpgrade = 1

    player.boosters[1].Bought = new Decimal(0)
    player.boosters[2].Bought = new Decimal(0)

    player.upgrades2[1].Bought = false
    player.upgrades2[2].Bought = false
    player.upgrades2[3].Bought = false
    player.buyables[1].Bought = new Decimal(0)
    player.buyables[2].Bought = new Decimal(0)

    player.challenges[1].Reached = false
    player.challenges[1].Best = new Decimal(0)
    player.challenges[1].Score = new Decimal(0)

    player.prestiged = false

    player.enableUpgLogs = true
    player.prestige_confirm = true
    player.super_confirm = true
}

function forceHReset() {
    cleanPlayer()
    save()
    location.reload()
}

function hardReset() {
    let al = confirm("Are you sure you want to hard reset the game? You cant undo the process.")
    if (al == true) {
        cleanPlayer()
        save()
        location.reload()
    }
}

console.log(maxUpgrades)

load()

setInterval(save, 1000)