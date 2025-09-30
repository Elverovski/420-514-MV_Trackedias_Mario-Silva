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
        const serieData = fs.readFileSync(filepath, "utf8");
        const series: Serie[] = JSON.parse(serieData)["serie"];
        return series.find(serie => serie.id === id);
    }  
    
    public static async createSerie(newSerie: Serie): Promise<void> {
        const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
        if (!data["serie"]) data["serie"] = [];
        data["serie"].push(newSerie);
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf8");
    }

}
    

    

    
