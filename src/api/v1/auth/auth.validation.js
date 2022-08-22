import Joi from "@hapi/joi";

const Validation = {};

const signup = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
});

const signIn = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
});

Validation.signup = async (req) => {
  try {
    const value = await signup.validateAsync(req.body);
    return { err: null, value };
  } catch (err) {
    return { err, value: null };
  }
};

Validation.signIn = async (req) => {
  try {
    const value = await signIn.validateAsync(req.body);
    return { err: null, value };
  } catch (err) {
    return { err, value: null };
  }
};

export default Validation;
