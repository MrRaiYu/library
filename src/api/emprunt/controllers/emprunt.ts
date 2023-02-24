/**
 * emprunt controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::emprunt.emprunt', ({strapi}) => ({
    async create(ctx) {
        // some logic here
        const response = await super.create(ctx);
        // some more logic
        return response;
    }
}));
