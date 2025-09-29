import { SerieModel as Serie } from '../models/serie.model'
import * as fs from 'fs';

const filepath = "./src/data/db.json";
const serie: Serie[] = [];

export class SerieService {
    public static async getAllSeries(): Promise<Serie[]> {
        const serieData = fs.readFileSync(filepath, "utf8");
        return JSON.parse(serieData)["serie"]
    }

    public static async getSerieById(id: string): Promise<Serie | undefined> {
        return serie.find(serie => serie.id === id);
    }    
}
    

    

    
