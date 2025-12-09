interface WarframeWorldState {
    id: string;
    expiry: string;
    activation: string;
    startString: string;
    activeMissions: ActiveMission[];
    alerts: Alert[];
    archonHunt: ArchonHunt;
    arbitration: Arbitration;
    cambionCycle: CambionCycle;
    cetusCycle: CetusCycle;
    constructionProgress: ConstructionProgress;
    dailyDeals: DailyDeal[];
    darkSectors: DarkSector[];
    earthCycle: EarthCycle;
    events: Event[];
    fissures: Fissure[];
    flashSales: FlashSale[];
    globalUpgrades: GlobalUpgrade[];
    invasions: Invasion[];
    kuva: Kuva[];
    news: News[];
    nightwave: Nightwave;
    persistentEnemies: PersistentEnemy[];
    primeTime: PrimeTime;
    primeVaultTraders: PrimeVaultTrader[];
    riven: Riven;
    sanctum: Sanctum;
    sentientOutposts: SentientOutpost;
    sortie: Sortie;
    steelPath: SteelPath;
    syndicateMissions: SyndicateMission[];
    timestamp: string;
    upgrades: Upgrade[];
    voidStorms: VoidStorm[];
    voidTrader: VoidTrader;
    weeklyChallenges: WeeklyChallenge[];
}

// Définitions des sous-interfaces (exemples pour les principales)
interface ActiveMission {
    node: string;
    type: string;
    startString: string;
    expiry: string;
    active: boolean;
    rewardTypes: string[];
}

interface Alert {
    id: string;
    expiry: string;
    activation: string;
    startString: string;
    active: boolean;
    mission: Mission;
    rewardTypes: string[];
}

interface Mission {
    node: string;
    type: string;
    faction: string;
    reward: Reward;
    minEnemyLevel: number;
    maxEnemyLevel: number;
    maxWaveNum: number;
    nightmare: boolean;
    archwingRequired: boolean;
}

interface Reward {
    items: string[];
    countedItems: CountedItem[];
    credits: number;
    asString: string;
    itemString: string;
    thumbnail: string;
    color: number;
}

interface CountedItem {
    count: number;
    type: string;
}

// Ajoutez les autres interfaces selon les besoins (ArchonHunt, Arbitration, etc.)
// Pour une couverture complète, étendez avec les structures JSON réelles.

interface ArchonHunt {