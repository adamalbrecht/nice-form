/**
 * Convert a property name into a human readable string by replacing _ with
 * spaces, and upcasing the first letter of each word.
 *
 * @param {string} property The property name to convert into a readable name.
 * @return {string} The property name converted to a friendly readable format.
 * @private
 */
export default function humanize(property) {
  return property.replace(/_/g, ' ')
    .replace(/(\w+)/g, function(match) {
      return match.charAt(0).toUpperCase() + match.slice(1);
    });
};
