import { newMusic, recommendMusic } from "./Home";
import {hotSearch,searchReasultList} from './Search';
import { getSongById,getLyricById } from "./Play";

export const recommendMusicAPI = recommendMusic

export const newMusicAPI = newMusic
export const hotSearchAPI = hotSearch
export const searchReasultListAPI = searchReasultList

export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById