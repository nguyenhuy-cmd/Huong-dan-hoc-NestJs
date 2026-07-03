// joi là kiểm dữ liệu xem có đúng không và đủ không trước khi hoạt động, sai thì báo lỗi 
import Joi from 'joi';

export default Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    POST: Joi.number().default(5432),
    USER: Joi.string().required(),
    PASSWORD: Joi.string().required(),
    HOST: Joi.string().default('localhost'),
    NAME: Joi.string().required(),
    SYNC: Joi.boolean().default(false),
    AUTOLOAD: Joi.boolean().default(true),
    PROFILE_API_KEY: Joi.string().required(),
})