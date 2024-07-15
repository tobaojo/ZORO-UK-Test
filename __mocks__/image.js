const React = require('react');
module.exports = function Image({ src, alt, width, height, ...props }) {
  return React.createElement('img', { src, alt, width, height, ...props });
};
