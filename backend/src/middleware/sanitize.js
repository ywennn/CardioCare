import xss from 'xss';

const sanitizeValue = (value) => {
  if (typeof value === 'string') return xss(value.trim());
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, sanitizeValue(v)]),
    );
  }
  if (Array.isArray(value)) return value.map(sanitizeValue);
  return value;
};

const sanitize = (req, res, next) => {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.query) req.query = sanitizeValue(req.query);
  if (req.params) req.params = sanitizeValue(req.params);
  next();
};

export default sanitize;
