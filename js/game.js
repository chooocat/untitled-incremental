let lastUpdate = Date.now()
let endgame = new Decimal("1e130")
let canReset_Prestige = true
let canReset_Super = true
let amtLogs = 0
let canApplyBest = false

document.getElementById("overheadstuff").innerHTML = "Endgame: <b>"+frt(endgame)+" Points</b>"

if (player.activeChal != 0) {
    document.getElementById("overheadstuff").innerHTML = "<b>Currently you're inside C"+player.activeChal+"</b>"
}

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
    player.bestPoints = new Decimal(0)
    player.oldBestPoints = new Decimal(1e100)
    player.spoints = new Decimal(0)
    player.boughtUpgrades = 0
    player.currentUpgrade = 1
    player.boosters[1].Bought = new Decimal(0)
    player.boosters[2].Bought = new Decimal(0)
    player.boosters[3].Bought = new Decimal(0)
    player.boosters[1].Cost = get_boosterCost(1)
    player.boosters[2].Cost = get_boosterCost(2)
    player.boosters[3].Cost = get_boosterCost(3)
}

function super_reset() {
    player.boosters[1].Bought = new Decimal(0)
    player.boosters[2].Bought = new Decimal(0)
    player.boosters[3].Bought = new Decimal(0)
    player.boosters[1].Cost = get_boosterCost(1)
    player.boosters[2].Cost = get_boosterCost(2)
    player.boosters[3].Cost = get_boosterCost(3)
    if (hasUpgrade(31)) {
        player.prestige = player.prestige.pow(0.1)
    } else {
        player.prestige = new Decimal(0)
    }
    setTimeout(function() {
        player.points = new Decimal(0)
    }, 100)
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
    swtichOnClick_boostersPoints()
    setTimeout(function() {
        canReset_Prestige = true
    }, 500)
}

function sp() {
    canReset_Super = false
    player.spoints = player.spoints.add(calc_super())
    //player.prestiged = true
    player.oldBestPoints = player.bestPoints
    super_reset()
    setTimeout(function() {
        canReset_Super = true
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

function superreset() {
    if (canReset_Super == false) {return}
    if (player.points.lt(player.oldBestPoints)) {return}
    if (player.super_confirm) {
        let confirmat = confirm("Are you sure you want to Super-Point reset?")
        if (confirmat) {
            sp()
        }
    } else {
        sp()
    }
}

function startChallenge(id) {
    if (id == 1) {
        sp()
    }

    player.activeChal = id
    document.getElementById("overheadstuff").innerHTML = "<b>Currently you're inside C"+id+"</b>"
    setTimeout(function() {
        canApplyBest = true
    }, 100)
}

function leaveChallenge(id) {
    if (id == 1) {
        if (player.points.gte(player.challenges[1].Require)) {
            player.challenges[1].Reached = true
            player.challenges[1].Score = player.points.div(1e12).pow(0.95)
        }
        sp()
    }

    player.activeChal = 0
    document.getElementById("overheadstuff").innerHTML = "Endgame: <b>"+frt(endgame)+" Points</b>"
    canApplyBest = false
}

function enterChallenge(id) {
    if (player.activeChal != 0) {
        if (player.activeChal == id) {
            let confirmat = confirm("Leave challenge?")
            if (confirmat == false) {return}
            leaveChallenge(id)
        } else {
            let confirmat = confirm("Leave C"+player.activeChal+" and start this one?")
            if (confirmat == false) {return}
            leaveChallenge(player.activeChal)
            startChallenge(id)
        }
    } else {
        let confirmat = confirm("Are you sure you want to enter challenge?")
        if (confirmat == false) {return}
        startChallenge(id)
    }
}

function checkUnlocks() {
    if (hasUpgrade(10)) {document.getElementById("tab-points").style.display = "inline-block"} else {document.getElementById("tab-points").style.display = "none"}
    //if (hasUpgrade(14)) {document.getElementById("row2Boosters").style.display = "inline-block"} else {document.getElementById("row2Boosters").style.display = "none"}
    if (hasUpgrade(16) || player.prestiged) {document.getElementById("tab-prestige").style.display = "inline-block"} else {document.getElementById("tab-prestige").style.display = "none"}
    if (hasUpgrade(30)) {document.getElementById("tab-points-super").style.display = "inline-block"} else {document.getElementById("tab-points-super").style.display = "none"}

    if (player.prestiged) {document.getElementById("tab-prestige-upgrades").style.display = "inline-block"} else {document.getElementById("tab-prestige-upgrades").style.display = "none"}
    if (player.prestiged) {document.getElementById("tab-prestige-buyables").style.display = "inline-block"} else {document.getElementById("tab-prestige-buyables").style.display = "none"}
    if (player.upgrades2[3].Bought == true) {document.getElementById("booster3").style.display = "inline-block"} else {document.getElementById("booster3").style.display = "none"}

    if (player.upgrades2[1].Bought == true) {document.getElementById("upgrade-pres-1").style.display = "none"} else {document.getElementById("upgrade-pres-1").style.display = "inline-block"}
    if (player.upgrades2[2].Bought == true) {document.getElementById("upgrade-pres-2").style.display = "none"} else {document.getElementById("upgrade-pres-2").style.display = "inline-block"}
    if (player.upgrades2[3].Bought == true) {document.getElementById("upgrade-pres-3").style.display = "none"} else {document.getElementById("upgrade-pres-3").style.display = "inline-block"}

    if (player.challenges[1].Reached == true) {document.getElementById("c1").style.backgroundColor = "rgb(0, 48, 0)"} else {document.getElementById("c1").style.backgroundColor = "#000000"}
    if (player.challenges[1].Reached == true) {document.getElementById("milestones-1-txt").style.display = "block"} else {document.getElementById("milestones-1-txt").style.display = "none"}
    if (player.challenges[1].Reached == true) {document.getElementById("milestones-1").style.display = "flex"} else {document.getElementById("milestones-1").style.display = "none"}

    if (player.prestiged) {document.getElementById("setting-100").style.display = "inline-block"} else {document.getElementById("setting-100").style.display = "none"}
    if (hasUpgrade(30)) {document.getElementById("setting-101").style.display = "inline-block"} else {document.getElementById("setting-101").style.display = "none"}
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
    upgrades[27].Info = "Points are boosted based on Points (x"+frt(player.points.add(10).log(6).pow(0.4))+")"

    if (player.points.lt(1e14)) {
        player.prestige_gain_desc = "Required 100T Points"
    } else {
        player.prestige_gain_desc = "+"+frt(calc_prestige())+" Prestige Points on reset"
    }

    if (player.points.lt(player.oldBestPoints)) {
        player.super_gain_desc = "Required "+frt(player.oldBestPoints)+" Points"
    } else {
        player.super_gain_desc = "+"+frt(calc_super())+" Super-Points on reset"
    }

    updateUpgradeLog()
}

function gameLoop() {
    const diff = (Date.now()-lastUpdate)/1000

    player.points = player.points.add(calc_points().mul(diff))
    if (player.points.gte(player.bestPoints)) {player.bestPoints = player.points}
    if (canApplyBest && player.activeChal != 0 && player.points.gte(player.challenges[player.activeChal].Best)) {player.challenges[player.activeChal].Best = player.points}
    player.prestige_gain = calc_prestige()
    player.super_gain = calc_super()
    player.spoints_cap = calc_superCap()

    updateEffects() 

    lastUpdate = Date.now()
}

setInterval(gameLoop, 50)
setInterval(checkUnlocks, 100)
setInterval(updateTxtEffects, 500)