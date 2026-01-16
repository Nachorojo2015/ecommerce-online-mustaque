import { MercadoPagoConfig } from 'mercadopago';
export const client = new MercadoPagoConfig({ accessToken: process.env.TEST_ACCESS_TOKEN ?? '' });