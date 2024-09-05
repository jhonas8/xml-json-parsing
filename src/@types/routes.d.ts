import { Router } from 'express';

export namespace Routes {
    export type TRouteInjection = (router: Router) => void;
}
