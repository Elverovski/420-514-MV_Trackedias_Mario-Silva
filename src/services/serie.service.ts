import { SerieModel as Serie } from '../models/serie.model'
import * as fs from 'fs';

const filepath = "./src/data/db.json";
const serie: Serie[] = [];

export class SerieService {
    // Methode GET pour obtenir touts les series
    public static async getAllSeries(): Promise<Serie[]> {
        return JSON.parse(fs.readFileSync(filepath, "utf8"))["serie"]
    }


    // Methode GET pour obtenir une serie specifique par le id
    public static async getSerieById(id: string): Promise<Serie | undefined> {
        const series: Serie[] = JSON.parse(fs.readFileSync(filepath, "utf8"))["serie"];
        return series.find(serie => serie.id === id);
    }


    // Methode POST pour creer une serie
    public static async createSerie(newSerie: Serie): Promise<void> {
        const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
        if (!data["serie"]) data["serie"] = [];
        data["serie"].push(newSerie);
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf8");
    }

    // METHODE PUT pour mettre a jour une serie
    public static async updateSerie(newSerie: Serie): Promise<void> {
        const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
        if (!data["serie"]) data["serie"] = [];
        const index = data["serie"].findIndex((s: Serie) => s.id === newSerie.id);

        if (index !== -1) {
            data["serie"][index] = newSerie;
        } else {
            data["serie"].push(newSerie);
        }
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf8");
    }


    // METHODE DELETE pour efface une serie
    public static async deleteSerie(id: string): Promise<void> {
        const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
        if (!data["serie"]) data["serie"] = [];
        data["serie"] = data["serie"].filter((s: Serie) => s.id !== id);
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf8");
    }




}





