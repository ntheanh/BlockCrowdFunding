'use strict';

/**
 * status-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::status-order.status-order');
