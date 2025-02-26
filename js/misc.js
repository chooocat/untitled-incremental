function set(id) {
    if (id == 1) {
        player.enableUpgLogs = !player.enableUpgLogs
        if (player.enableUpgLogs) {
            document.getElementById("setting-"+id).innerHTML = "Enable upgrade log: ON"
        } else {
            document.getElementById("setting-"+id).innerHTML = "Enable upgrade log: OFF"
        }
    } else if (id == 100) {
        player.prestige_confirm = !player.prestige_confirm
        if (player.prestige_confirm) {
            document.getElementById("setting-"+id).innerHTML = "Prestige: ON"
        } else {
            document.getElementById("setting-"+id).innerHTML = "Prestige: OFF"
        }
    } else if (id == 101) {
        player.super_confirm = !player.super_confirm
        if (player.super_confirm) {
            document.getElementById("setting-"+id).innerHTML = "Super-Points: ON"
        } else {
            document.getElementById("setting-"+id).innerHTML = "Super-Points: OFF"
        }
    }

    save()
}

if (player.enableUpgLogs) {
    document.getElementById("setting-"+1).innerHTML = "Enable upgrade log: ON"
} else {
    document.getElementById("setting-"+1).innerHTML = "Enable upgrade log: OFF"
}

if (player.prestige_confirm) {
    document.getElementById("setting-"+100).innerHTML = "Prestige: ON"
} else {
    document.getElementById("setting-"+100).innerHTML = "Prestige: OFF"
}

if (player.super_confirm) {
    document.getElementById("setting-"+101).innerHTML = "Super-Points: ON"
} else {
    document.getElementById("setting-"+101).innerHTML = "Super-Points: OFF"
}

function swtichOnClick_upgrades() {
    document.getElementById("upgrades-tab").style.display = "inline-block"
    document.getElementById("points-tab").style.display = "none"
    document.getElementById("settings-tab").style.display = "none"
    document.getElementById("prestige-tab").style.display = "none"
}

function swtichOnClick_points() {
    document.getElementById("upgrades-tab").style.display = "none"
    document.getElementById("points-tab").style.display = "inline-block"
    document.getElementById("settings-tab").style.display = "none"
    document.getElementById("prestige-tab").style.display = "none"
}

function swtichOnClick_prestige() {
    document.getElementById("upgrades-tab").style.display = "none"
    document.getElementById("points-tab").style.display = "none"
    document.getElementById("settings-tab").style.display = "none"
    document.getElementById("prestige-tab").style.display = "inline-block"
}

function swtichOnClick_settings() {
    document.getElementById("upgrades-tab").style.display = "none"
    document.getElementById("points-tab").style.display = "none"
    document.getElementById("settings-tab").style.display = "inline-block"
    document.getElementById("prestige-tab").style.display = "none"
}

function swtichOnClick_boostersPoints() {
    document.getElementById("booster-points-tab").style.display = "inline-block"
    document.getElementById("super-points-tab").style.display = "none"
}

function swtichOnClick_superPoints() {
    document.getElementById("booster-points-tab").style.display = "none"
    document.getElementById("super-points-tab").style.display = "inline-block"
}

function swtichOnClick_resetPrestige() {
    document.getElementById("reset-prestige-tab").style.display = "inline-block"
    document.getElementById("upgrades-prestige-tab").style.display = "none"
    document.getElementById("buyables-prestige-tab").style.display = "none"
}

function swtichOnClick_upgradesPrestige() {
    document.getElementById("reset-prestige-tab").style.display = "none"
    document.getElementById("upgrades-prestige-tab").style.display = "inline-block"
    document.getElementById("buyables-prestige-tab").style.display = "none"
}

function swtichOnClick_buyablesPrestige() {
    document.getElementById("reset-prestige-tab").style.display = "none"
    document.getElementById("upgrades-prestige-tab").style.display = "none"
    document.getElementById("buyables-prestige-tab").style.display = "inline-block"
}