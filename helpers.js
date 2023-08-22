function priceDifference(previousPrices, currentPrices) { 
    for (let i = 0; i < previousPrices.length; i++) {
        let delta = (Math.abs(previousPrices[i].quantity / currentPrices[i].quantity) - 1) * 100
        console.log(`Delta is: ${delta}`)
        if (delta >= 15 || delta <= -15) {
            console.log(`price difference detected of ${delta}`)
            let obj = {
                isLargeDifference: true,
                percentageDifference: delta,
                rank: currentPrices[i].rank,
                address: currentPrices[i].address
            }
            return obj
        } else {
            console.log("no price difference detected")
            let obj = {
                isLargeDifference: false,
            }
            return obj
        }
    }
}

module.exports = { priceDifference };