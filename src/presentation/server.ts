import express, { Router } from "express";
import path from "path";


interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}


export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(private options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;

    }



    async start() {

        //* MIDDLEWARE
        this.app.use(express.json()); // * parse application/json  raw
        this.app.use(express.urlencoded({ extended: true })); // * parse application/x-www-form-urlencoded */

        //* PUBLIC FOLDER
        this.app.use(express.static(this.public_path));

        //* ROUTES
        this.app.use(this.routes);



        //* SPA
        this.app.get(/.*/, (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        });


        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }

}
