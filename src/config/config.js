import convict from 'convict';

const config = convict({
  logLevel: {
    doc: 'The logging level',
    format: 'String',
    default: 'info',
    env: 'LOG_LEVEL',
  },
  appPort: {
    doc: 'The port for the APP',
    format: 'port',
    default: 8004,
    env: 'APP_PORT',
  },
  homepage: {
    doc: 'The port for the APP',
    format: 'url',
    default: 'http://datalab.datalabs.nerc.ac.uk',
    env: 'HOMEPAGE',
  },
});

export default config;
