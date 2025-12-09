import { createContext} from 'react';
import type {Context} from 'react';
import {WarframeWorldState} from "@/types/api";
import {DataContext} from "@/types/context";

const defaultContextValue : DataContext = {
    wfStats: null,
    getApiDatas: async () => {}
};

export const DataHandlerContext: Context<DataContext> = createContext(defaultContextValue)
