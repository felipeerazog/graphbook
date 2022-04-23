import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
import services from './services';

const app = express();

if (process.env.NODE_ENV === 'production') {
    // add some cross-site scripting (XSS) protection tactics, remove the X-Powered-By HTTP header
    app.use(helmet());
    // to ensure that no one can inject malicious code, add the Content-Security-Policy HTTP header
    // This header prevents attackers from loading resources from external URLs.
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "*.amazonaws.com"] // download images only from these URLs.
        }
    }));
    // apply referrer enhancement only when requesting from the same host
    app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
}

// enable the compress to save user bandwidth
app.use(compress());
// allow cross-origin resource sharing (CORS) to let the api be accessible from other websites
app.use(cors());

// bind graphql server with express.js
const serviceNames = Object.keys(services);
for (let i = 0; i < serviceNames.length; i += 1) {
    const name = serviceNames[i];
    if (name === 'graphql') {
        (async () => {
            await services[name].start();
            services[name].applyMiddleware({ app });
        })();
    } else {
        app.use('/${name}', services[name]);
    }
}

const root = path.join(__dirname, '../../');

// app.use allows app to add commands to paths
app.use('/', express.static(path.join(root, 'dist/client')));
// allow serving static files (images)
app.use('/uploads', express.static(path.join(root, 'uploads')));

// app.post, app.put goes here
app.get('/', (req, res, next) => {
    res.sendFile(path.join(root, '/dist/client/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000!'));
