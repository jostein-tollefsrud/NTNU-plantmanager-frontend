const ONE_DAY = 86400000;
const currentDate = Date.now();

export function daysLeft (lastWatered, waterfrequency) {

    const dbDate = new Date(lastWatered).getTime();

    const nextWaterDate = (dbDate + (ONE_DAY * waterfrequency)) - currentDate;
    const daysLeftUntilWater = Math.round(nextWaterDate / ONE_DAY);

    return daysLeftUntilWater;
}

export function daysSince(lastWatered) {
    const dbDate = new Date(lastWatered).getTime();

    const difference = Math.round((currentDate - dbDate) / ONE_DAY);
    return difference;
}