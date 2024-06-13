export class SanitizeService {
  sanitizeRegion(countryAndState: { country: string; state: string }): string {
    // Concatenate country and state with a separator that's URL-safe, like a hyphen
    let region = `${countryAndState.country}-${countryAndState.state}`;

    // Remove any non-alphanumeric characters (except for the hyphen used as a separator)
    region = region.replace(/[^a-zA-Z0-9-]/g, '');

    // Optionally, convert the string to lowercase to ensure consistency
    region = region.toLowerCase();

    return region;
  }
}
