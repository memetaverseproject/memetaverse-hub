import { Joi } from 'koa-joi-router';
import { paginationValidate } from '../../middlewares/pagination';

const color = Joi.object({
  color: Joi.object({
    a: Joi.number(),
    r: Joi.number(),
    g: Joi.number(),
    b: Joi.number(),
  }),
});

const emote = Joi.object({
  slot: Joi.number(),
  urn: Joi.string(),
});

export const userCreateOrUpdateValidate = {
  type: 'json',
  body: {
    name: Joi.string(),
    introduction: Joi.string().allow(''),
    avatar_image: Joi.string().allow(''),
    banner_image: Joi.string().allow(''),
    website: Joi.string().allow(''),
    email: Joi.string().email().allow(''),
    version: Joi.number(),
    tutorialStep: Joi.number(),
    tutorialFlagsMask: Joi.number(),
    avatar: Joi.object({
      bodyShape: Joi.string(),
      eyes: color,
      hair: color,
      skin: color,
      emotes: Joi.array().items(emote),
      wearables: Joi.array().items(Joi.string()).max(10).min(1),
      snapshots: Joi.object({
        face: Joi.string(),
        body: Joi.string(),
        face256: Joi.string(),
        face128: Joi.string(),
      }),
    }),
  },
};

export const userToggleValidate = {
  type: 'json',
  body: {
    userIds: Joi.array().items(Joi.string()).min(1).required(),
    enabled: Joi.bool().required(),
  },
};

export const userListValidate = {
  query: {
    ...paginationValidate.query,
    orderBy: Joi.string().valid('id', 'createdAt').optional(),
    orderDirection: Joi.string().valid('desc', 'asc').optional(),
    ids: Joi.string().optional(),
    id: Joi.string().optional(),
  },
};
