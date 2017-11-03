import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import chalk from 'chalk';
import logger from 'winston';
import config from './config/config';

logger.level = config.get('logLevel');
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { timestamp: true, colorize: true });

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Provide healthz endpoint
app.use('/healthz', (req, res) => {
  res.send({ message: 'OK' });
});

// Return 404 for all other routes
app.use((req, res) => {
  logger.info('Serving default 404');
  res.status(404);
  res.render('index', { homepage: config.get('homepage') });
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = config.get('appPort');
app.listen(port, () => logger.info(chalk.green(`Default Backend listening on port ${port}`)));
