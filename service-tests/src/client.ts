import * as supertest from 'supertest';
import * as superagentUse from 'superagent-use';
import {logger} from 'logger';

export const client = superagentUse(supertest('http://localhost:8080')).use(logger);
