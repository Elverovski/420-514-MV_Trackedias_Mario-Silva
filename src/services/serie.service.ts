import { SerieModel as Serie } from '../models/serie.model'
import * as fs from 'fs';

const filepath = "./src/data/db.json";

export class SerieService {
    public static async getAllSeries(): Promise<Serie[]> {
        const serieData = fs.readFileSync(filepath, "utf8");
        let serie: Serie[] = [];
        return JSON.parse(serieData)["serie"]
    }

    

    

    
}