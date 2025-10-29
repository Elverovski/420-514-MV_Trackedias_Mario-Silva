import { SerieModel as Serie } from '../models/serie.model';
import * as fs from 'fs';
import * as path from 'path';

const filepath = path.join(process.cwd(), 'src/v2/data/series.json');

if (!fs.existsSync(filepath)) fs.writeFileSync(filepath, "[]", "utf8");

export class SerieService {
    public static async getAllSeries(): Promise<Serie[]> {
        const data = fs.readFileSync(filepath, "utf8");
        return JSON.parse(data || "[]");
    }

    public static async getSerieById(id: string): Promise<Serie | undefined> {
        const series = await this.getAllSeries();
        return series.find(s => s.id === id);
    }

    public static async createSerie(newSerie: Serie): Promise<void> {
        const series = await this.getAllSeries();
        series.push(newSerie);
        fs.writeFileSync(filepath, JSON.stringify(series, null, 2), "utf8");
    }

    public static async updateSerie(updatedSerie: Serie): Promise<void> {
        const series = await this.getAllSeries();
        const index = series.findIndex(s => s.id === updatedSerie.id);
        if (index !== -1) series[index] = updatedSerie;
        else series.push(updatedSerie);
        fs.writeFileSync(filepath, JSON.stringify(series, null, 2), "utf8");
    }

    public static async deleteSerie(id: string): Promise<void> {
        const series = await this.getAllSeries();
        const filtered = series.filter(s => s.id !== id);
        fs.writeFileSync(filepath, JSON.stringify(filtered, null, 2), "utf8");
    }
}
