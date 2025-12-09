import Warframe from 'warframe.js'

export interface DataContext {
    wfInstance: Warframe | null,
    getApiDatas: () => Promise<void>
}
