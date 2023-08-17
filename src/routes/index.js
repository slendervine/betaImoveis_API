import express from 'express';
import textosRoutes from './textosRoutes.js';


const routes = (app) => {

    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'Slendernotee'})

    })

    app.use(
        express.json(),
        textosRoutes
    )
}

export default routes;