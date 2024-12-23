
export const getWarframeStats = async () => {
    const response = await fetch('https://api.warframestat.us/pc');
    return response.json();
}
