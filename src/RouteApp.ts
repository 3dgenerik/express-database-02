import express from 'express';

export class RouteApp {
    private static instance: express.Router;
    public static getInstance(): express.Router {
        if (!RouteApp.instance) {
            RouteApp.instance = express.Router();
        }
        return RouteApp.instance;
    }
}
