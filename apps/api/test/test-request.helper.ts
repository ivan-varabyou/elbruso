import request from 'supertest';
import { INestApplication } from '@nestjs/common';

const API_PREFIX = '/v1';

export function createRequest(app: INestApplication) {
  return request(app.getHttpServer());
}

export function post<T = any>(supertest: any, endpoint: string, body?: T) {
  return supertest.post(`${API_PREFIX}${endpoint}`).send(body);
}

export function get(supertest: any, endpoint: string) {
  return supertest.get(`${API_PREFIX}${endpoint}`);
}

export function patch<T = any>(supertest: any, endpoint: string, body: T) {
  return supertest.patch(`${API_PREFIX}${endpoint}`).send(body);
}

export function del(supertest: any, endpoint: string) {
  return supertest.delete(`${API_PREFIX}${endpoint}`);
}

export async function postData<T = any, R = any>(
  supertest: any,
  endpoint: string,
  body: T,
): Promise<R> {
  const resp = await supertest.post(`${API_PREFIX}${endpoint}`).send(body);
  return resp.body.data as R;
}

export async function getData<R = any>(
  supertest: any,
  endpoint: string,
): Promise<R> {
  const resp = await supertest.get(`${API_PREFIX}${endpoint}`);
  return resp.body.data as R;
}

export async function patchData<T = any, R = any>(
  supertest: any,
  endpoint: string,
  body: T,
): Promise<R> {
  const resp = await supertest.patch(`${API_PREFIX}${endpoint}`).send(body);
  return resp.body.data as R;
}

export async function delData<R = any>(
  supertest: any,
  endpoint: string,
): Promise<R> {
  const resp = await supertest.delete(`${API_PREFIX}${endpoint}`);
  return resp.body.data as R;
}
