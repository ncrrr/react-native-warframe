
export const getWarframeStats = async () => {
    const response = await fetch('https://api.warframestat.us/pc?language=fr');
    return response.json();
}
