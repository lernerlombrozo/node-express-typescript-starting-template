import { RequestHandler } from 'express';

export const get404 : RequestHandler = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: '/404',
    });
};

export const get500: RequestHandler = (req, res, next) => {
    res.status(500).render('500', {
        pageTitle: 'Error!',
        path: '/500',
    });
};