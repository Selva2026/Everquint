function maxProfit(totalTime) {

    // highest earning found so far
    let maxProfit = 0

    // best combination store
    let bestTheatreCount = 0
    let bestPubCount = 0
    let bestCommercialCount = 0


    // Try different number of Theatres
    // One theatre takes 5 units time
    for (let theatreCount = 0; theatreCount <= Math.floor(totalTime / 5); theatreCount++) {

        // Try different number of Pubs
        // One pub takes 4 units time
        for (let pubCount = 0; pubCount <= Math.floor(totalTime / 4); pubCount++) {

            // Try different number of Commercial Parks
            // One commercial park takes 10 units time
            for (let commercialCount = 0; commercialCount <= Math.floor(totalTime / 10); commercialCount++) {


                // Calculate total construction time for this combination
                let totalConstructionTime =
                    (theatreCount * 5) +
                    (pubCount * 4) +
                    (commercialCount * 10)


                // If construction time exceeds available time → skip
                if (totalConstructionTime > totalTime) {
                    continue
                }


                // Track construction progress
                let currentTime = 0

                // Track total earnings for this combination
                let currentProfit = 0


                // -------------------------------
                // Build Theatres
                // -------------------------------

                for (let i = 0; i < theatreCount; i++) {

                    // theatre construction finished
                    currentTime = currentTime + 5

                    // remaining operational time
                    let remainingTime = totalTime - currentTime

                    // theatre earning
                    currentProfit =
                        currentProfit + (remainingTime * 1500)
                }


                // -------------------------------
                // Build Pubs
                // -------------------------------

                for (let i = 0; i < pubCount; i++) {

                    // pub construction finished
                    currentTime = currentTime + 4

                    let remainingTime = totalTime - currentTime

                    currentProfit =
                        currentProfit + (remainingTime * 1000)
                }


                // -------------------------------
                // Build Commercial Parks
                // -------------------------------

                for (let i = 0; i < commercialCount; i++) {

                    currentTime = currentTime + 10

                    let remainingTime = totalTime - currentTime

                    currentProfit =
                        currentProfit + (remainingTime * 2000)
                }


                // -------------------------------
                // Check if this combination is best
                // -------------------------------

                if (currentProfit > maxProfit) {

                    maxProfit = currentProfit

                    bestTheatreCount = theatreCount
                    bestPubCount = pubCount
                    bestCommercialCount = commercialCount
                }

            }
        }
    }


    // Final best result
    console.log("Best Combination:")
    console.log("Theatres:", bestTheatreCount)
    console.log("Pubs:", bestPubCount)
    console.log("Commercial Parks:", bestCommercialCount)

    console.log("Total Earnings: $" + maxProfit)

}


// Example run
maxProfit(25)