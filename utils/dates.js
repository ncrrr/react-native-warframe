export const getActivePeriod = (item) => {
    if(item) {
        return new Date(item?.expiry).getTime() - new Date(item?.activation).getTime()
    } else { return 0 }
}
