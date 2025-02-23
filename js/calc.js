function hasUpgrade(val) {
    return player.boughtUpgrades >= val
}

function hasUpgrade2(val) {
    return player.upgrades2[val].Bought == true
}

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

function get_boosterLevel(bo, type) {
    const b = player.boosters[bo]
    let form = 1
    if (bo == 1) {
        form = player.points.div(750).log(2).add(1).floor()
        if (b.Bought.gte(30)) {
            form = player.points.div(5000).log(3.5).add(1).floor()
        } else {
            if (form.gte(30)) {
                form = new Decimal(30)
            }
        }
    } else if (bo == 2) {
        form = player.points.div(1e4).log(5).add(1).floor()
        if (b.Bought.gte(35)) {
            form = player.points.div(1e9).log(8).add(1).floor()
        } else {
            if (form.gte(35)) {
                form = new Decimal(35)
            }
        }
    } else if (bo == 3) {
        form = player.points.div(1e15).log(1e3).add(1).floor()
    }
    if (type == "single" && form.gt(b.Bought)) {
        form = b.Bought.add(1)
    }
    return form
}

function get_buyablesLevel(bo, type) {
    const b = player.buyables[bo]
    let form = 1
    if (bo == 1) {
        form = player.prestige.log(2.5).add(1).floor()
    } else if (bo == 2) {
        form = player.prestige.div(10).log(5).add(1).floor()
    }
    if (type == "single" && form.gt(b.Bought)) {
        form = b.Bought.add(1)
    }
    return form
}

function updateEffects() {
    let exp = new Decimal(1.35)
    //booster 1 calcs
    if (hasUpgrade(20)) {exp = exp.add(0.035)};
    player.boosters[1].Effect = new Decimal(exp).pow(player.boosters[1].Bought)

    //other
    player.boosters[2].Effect = new Decimal(1.85).pow(player.boosters[2].Bought)
    player.boosters[3].Effect = new Decimal(2.22).pow(player.boosters[3].Bought)
    player.buyables[1].Effect = new Decimal(2).pow(player.buyables[1].Bought)
    player.buyables[2].Effect = new Decimal(1.1).pow(player.buyables[2].Bought)

    //upgrades2 calcs
    if (player.upgrades2[1].Bought) {
        let form = player.prestige.add(2).pow(0.35)
        if (form.gte(1)) {
            player.upgrades2[1].Effect = form
        } else {player.upgrades2[1].Effect = new Decimal(1)}
    } else {player.upgrades2[1].Effect = new Decimal(1)}

    if (player.upgrades2[2].Bought) {
        let exp = new Decimal(0.4)
        if (hasUpgrade(21)) {exp = exp.add(0.1)}
        let form = player.points.add(1).log(10).pow(exp)
        if (form.gte(1)) {
            player.upgrades2[2].Effect = form
        } else {player.upgrades2[2].Effect = new Decimal(1)}
    } else {player.upgrades2[2].Effect = new Decimal(1)}
}

function calc_points() {
    let base = new Decimal(0)

    if (hasUpgrade(1)) {base = new Decimal(0.1)};
    if (hasUpgrade(2)) {base = base.mul(1.5)};
    if (hasUpgrade(3)) {base = base.mul(1.75)};
    if (hasUpgrade(4)) {base = base.mul(1.66)};
    if (hasUpgrade(5)) {base = base.mul(2.5)};
    if (hasUpgrade(6)) {base = base.mul(2)};
    if (hasUpgrade(7)) {base = base.mul(1.95)};
    if (hasUpgrade(8)) {base = base.mul(1.23)};
    if (hasUpgrade(9)) {base = base.mul(2.75)};
    if (hasUpgrade(11)) {base = base.mul(2.22)};
    if (hasUpgrade(12)) {base = base.mul(3)};
    if (hasUpgrade(13)) {base = base.mul(2)};
    if (hasUpgrade(14)) {base = base.mul(player.points.add(1).pow(0.1))};
    if (hasUpgrade(15)) {base = base.mul(1.99)};
    if (hasUpgrade(16)) {base = base.mul(2)};
    if (hasUpgrade(17)) {base = base.mul(3.5)};
    if (hasUpgrade(18)) {base = base.mul(2.5)};

    if (hasUpgrade(10)) {
        base = base.mul(1.5)
        base = base.mul(player.boosters[1].Effect)
        base = base.mul(player.boosters[2].Effect)
        base = base.mul(player.boosters[3].Effect)
    };

    if (hasUpgrade2(1)) {
        base = base.mul(player.upgrades2[1].Effect)
    }

    if (hasUpgrade2(2)) {
        base = base.mul(player.upgrades2[2].Effect)
    }

    base = base.mul(player.buyables[1].Effect)

    return base
}

function calc_prestige() {
    let base = player.points.div(1e14).pow(0.2)
    
    if (hasUpgrade(18)) {base = base.mul(1.25)};
    if (hasUpgrade(19)) {base = base.mul(1.3)};

    base = base.mul(player.buyables[2].Effect)

    return base
}