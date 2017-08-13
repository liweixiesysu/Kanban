import express from 'express';
import fs from 'fs';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import routes from './app/Routes';
import ServerWithWS from './serverWithWS';

let app = express();
app.set('views', './');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

let server = new ServerWithWS();
server.on('request', app);

const cards = JSON.parse(fs.readFileSync(__dirname + '/public/data.json', 'utf8'));

let getPropsFromRoute = ({routes}, componentProps) => {
    let props = {};
    let lastRoute = routes[routes.length - 1];
    routes.reduceRight((prevRoute, currrRoute) => {
        componentProps.forEach(componentProp => {
            if (!props[componentProp] && currrRoute.component[componentProp]) {
                props[componentProp] = currrRoute.component[componentProp];
            }
        });
    }, lastRoute);

    return props;
}

let renderRoute = (response, renderProps) => {
    let routeProps = getPropsFromRoute(renderProps, ['requestInitialData']);
    if (routeProps.requestInitialData) {
        let handleCreateElement = (Component, props) => {
            return <Component initialData={cards}{...props}/>
        };

        response.render('index', {
            initialData: JSON.stringify(cards),
            content: renderToString(<RoutingContext createElement={handleCreateElement}{...renderProps}/>)
        });
    }
    else
    {
        response.render('index', {
            initialData: null,
            content: renderToString(<RoutingContext {...renderProps}/>)
        })
    }
};

app.get('*', (request, response) => {
    console.log(request.url)
    match({routes, location: request.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            response.status(500).send(error.message);
            return;
        }

        if (redirectLocation) {
            response.redirect(302, redirectLocation.pathname + redirectLocation.search);
            return;
        }

        if (renderProps) {
            renderRoute(response, renderProps);
            return;
        }

        response.status(404).send('Not found');
    })
});

server.listen(3000, () => {
    console.log('Express app listening on port 3000');
});
