let lastUpdate = Date.now()
let canReset_Prestige = true
let amtLogs = 0

function upgrade() {
    if (player.currentUpgrade == maxUpgrades+1) {return}
    let upg = upgrades[player.currentUpgrade]
    if (player.points.lt(upg.Cost)) {return}
    player.points = player.points.sub(upg.Cost)
    player.currentUpgrade += 1
    player.boughtUpgrades += 1
}

function upgrade2(id) {
    let upg = player.upgrades2[id]
    if (upg.Bought == true) {return}
    if (player.prestige.lt(upg.Cost)) {return}
    upg.Bought = true
    player.prestige = player.prestige.sub(upg.Cost)
}

function buyBooster(bo, type) {
    const b = player.boosters[bo]
    if (player.points.lt(b.Cost)) {return}
    b.Bought = get_boosterLevel(bo, type)
    b.Cost = get_boosterCost(bo)
    player.points = new Decimal(0)
}

function buyBuyable(bo, type) {
    const b = player.buyables[bo]
    if (player.prestige.lt(b.Cost)) {return}
    b.Bought = get_buyablesLevel(bo, type)
    b.Cost = get_buyablesCost(bo)
    player.prestige = player.prestige.sub(b.Cost.div(b.Exp))
}

function prestige_reset() {
    player.points = new Decimal(0)
    player.boughtUpgrades = 0
    player.currentUpgrade = 1
    player.boosters[1].Bought = new Decimal(0)
    player.boosters[2].Bought = new Decimal(0)
    player.boosters[1].Cost = get_boosterCost(1)
    player.boosters[2].Cost = get_boosterCost(2)
}

function p() {
    canReset_Prestige = false
    player.prestige = player.prestige.add(calc_prestige())
    player.prestiged = true
    prestige_reset()
    for (i=amtLogs;i>0;i--) {
        document.getElementById("log-"+i).remove()
    }
    amtLogs = 0
    setTimeout(function() {
        canReset_Prestige = true
    }, 500)
}

function prestige() {
    if (canReset_Prestige == false) {return}
    if (player.points.lt(1e14)) {return}
    if (player.prestige_confirm) {
        let confirmat = confirm("Are you sure you want to Prestige?")
        if (confirmat) {
            p()
        }
    } else {
        p()
    }
}

function checkUnlocks() {
    if (hasUpgrade(10)) {document.getElementById("tab-points").style.display = "inline-block"} else {document.getElementById("tab-points").style.display = "none"}
    //if (hasUpgrade(14)) {document.getElementById("row2Boosters").style.display = "inline-block"} else {document.getElementById("row2Boosters").style.display = "none"}
    if (hasUpgrade(16) || player.prestiged) {document.getElementById("tab-prestige").style.display = "inline-block"} else {document.getElementById("tab-prestige").style.display = "none"}
    if (player.prestiged) {document.getElementById("tab-prestige-upgrades").style.display = "inline-block"} else {document.getElementById("tab-prestige-upgrades").style.display = "none"}
    if (player.prestiged) {document.getElementById("tab-prestige-buyables").style.display = "inline-block"} else {document.getElementById("tab-prestige-buyables").style.display = "none"}

    if (player.upgrades2[1].Bought == true) {document.getElementById("upgrade-pres-1").style.display = "none"} else {document.getElementById("upgrade-pres-1").style.display = "inline-block"}
    if (player.upgrades2[2].Bought == true) {document.getElementById("upgrade-pres-2").style.display = "none"} else {document.getElementById("upgrade-pres-2").style.display = "inline-block"}

    if (player.prestiged) {document.getElementById("setting-100").style.display = "inline-block"} else {document.getElementById("setting-100").style.display = "none"}
    if (player.enableUpgLogs == true) {document.getElementById("upgrade-log").style.display = "inline-block"} else {document.getElementById("upgrade-log").style.display = "none"}
}

function updateUpgradeLog() {
    if (amtLogs >= 1) {
        for (i=amtLogs;i>0;i--) {
            document.getElementById("log-"+i).remove()
        }
    }
    for (i=player.boughtUpgrades;i>0;i--) {
        let newlog = document.createElement("p")
        let upg = upgrades[i]
        newlog.id = "log-"+i
        newlog.innerHTML = "<b>[#"+i+" / "+upg.Title+"]</b> - "+upg.Info+" - <b>"+frt(upg.Cost)+" Points</b>"
        document.getElementById("upgrade-log").appendChild(newlog);
        if (i >= amtLogs) {
            amtLogs = i
        }
    }
}

function updateTxtEffects() {
    upgrades[14].Info = "Points are boosted based on Points (x"+frt(player.points.add(1).pow(0.1))+")"

    if (player.points.lt(1e14)) {
        player.prestige_gain_desc = "Required 100T Points"
    } else {
        player.prestige_gain_desc = "+"+frt(calc_prestige())+" Prestige Points on reset"
    }

    updateUpgradeLog()
}

function gameLoop() {
    const diff = (Date.now()-lastUpdate)/1000

    player.points = player.points.add(calc_points().mul(diff))
    player.prestige_gain = calc_prestige()

    updateEffects()

    lastUpdate = Date.now()
}

setInterval(gameLoop, 50)
setInterval(checkUnlocks, 100)
setInterval(updateTxtEffects, 500)