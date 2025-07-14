import { Productsmakelijke } from '../types/type';

export const isSerialized = (str: unknown): str is string =>
  typeof str === 'string' && (str.startsWith('a:') || str.startsWith('O:') || str.startsWith('s:'));

export const parseSerialized = (str: string): Record<string, any> => {
  try {
    if (str.startsWith('a:')) {
      const matches = str.match(/a:(\d+):\{.*\}/);
      if (matches) {
        const content = matches[0];
        const keyValuePairs = content.match(/s:\d+:"([^"]+)";s:\d+:"([^"]+)";/g);
        if (keyValuePairs) {
          const result: Record<string, any> = {};
          keyValuePairs.forEach((pair) => {
            const [key, value] = pair
              .replace(/s:\d+:"([^"]+)";/g, '$1')
              .split(';')
              .filter(Boolean);
            result[key] = value;
          });
          return result;
        }
      }
    }
    return {};
  } catch (error) {
    console.error('Error parsing serialized string:', error);
    return {};
  }
};

export const weightOf = (item: Productsmakelijke): number => {
  console.log(item, 'item');
  if (!item.metadata) return 500;
  console.log('hey');
  const nutri = item.metadata.nutretions_data;
  console.log(nutri, 'nutri');
  if (nutri && isSerialized(nutri)) {
    const parsed = phpDeserializeStrings(nutri);
    return parsed.weight ? parseFloat(parsed.weight) : 500;
  }
  return nutri?.weight ? parseFloat(nutri.weight) : 500;
};
export function phpDeserializeStrings(input: string): Record<string, string> {
  let i = 0;

  const readUntil = (stopChar: string) => {
    let start = i;
    while (i < input.length && input[i] !== stopChar) i++;
    const value = input.slice(start, i);
    i++;
    return value;
  };

  const expect = (char: string) => {
    if (input[i] !== char) {
      throw new Error(`Expected "${char}" at position ${i}, found "${input[i]}"`);
    }
    i++;
  };

  const parseString = (): string => {
    expect('s');
    expect(':');
    const length = parseInt(readUntil(':'), 10);
    expect('"');
    const value = input.slice(i, i + length);
    i += length;
    expect('"');
    expect(';');
    return value;
  };

  // Start of associative array
  expect('a');
  expect(':');
  const count = parseInt(readUntil(':'), 10);
  expect('{');

  const result: Record<string, string> = {};

  for (let n = 0; n < count; n++) {
    const key = parseString();
    const value = parseString();
    result[key] = value;
  }

  expect('}');

  return result;
}
export const totalPrice = (items: Productsmakelijke[]) =>
  items.reduce((sum, i) => sum + (i.quantity || 1) * Number(i.metadata._price), 0);

export const totalWeight = (items: Productsmakelijke[]) =>
  items.reduce((sum, i) => sum + (i.quantity || 1) * weightOf(i), 0);

export const supplementsTotal = (items: Productsmakelijke[]) =>
  items
    .filter((i) => i.categories.includes('Supplements'))
    .reduce((s, i) => s + (i.quantity || 1) * Number(i.metadata._price), 0);

export const itemTax = (item: Productsmakelijke) => {
  const rate = item.categories[0] === 'Accessories' ? 0.21 : 0.09;
  const base = Number(item.metadata._price) / (1 + rate);
  return Number(item.metadata._price) - base;
};

export const cartTax = (items: Productsmakelijke[]) =>
  items.reduce((sum, i) => sum + itemTax(i) * (i.quantity || 1), 0);
export const tryAlternativeLocationDetection = () => {
  try {
    // Try to detect timezone first (most reliable)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timezone === 'Europe/Brussels') {
      return 'BE';
    } else if (timezone === 'Europe/Amsterdam') {
      return 'NL';
    }

    // // Check browser locale information
    // try {
    //   const locale = new Intl.Locale(navigator.language);
    //   if (locale.region === 'BE') {
    //     return 'BE';
    //   } else if (locale.region === 'NL') {
    //     return 'NL';
    //   }
    // } catch (localeError) {
    //   // Locale API not supported, continue with other methods
    // }

    // Check for other European timezones that might indicate Belgium
    if (timezone.includes('Brussels') || timezone.includes('Belgium')) {
      return 'BE';
    }

    // Check for Netherlands timezone patterns
    if (timezone.includes('Amsterdam') || timezone.includes('Netherlands')) {
      return 'NL';
    }

    // Check if browser languages array contains Belgian languages
    // if (navigator.languages) {
    //   const hasBeLanguage = navigator.languages.some(
    //     (lang) => lang.includes('nl-BE') || lang.includes('fr-BE') || lang.includes('de-BE')
    //   );
    //   const hasNlLanguage = navigator.languages.some(
    //     (lang) => lang.includes('nl-NL') || lang.startsWith('nl')
    //   );

    //   if (hasBeLanguage) {
    //     return 'BE';
    //   } else if (hasNlLanguage) {
    //     return 'NL';
    //   }
    // }

    // Final fallback to Netherlands
    return 'NL';
  } catch (error) {
    console.error('Alternative location detection failed:', error);
    return 'NL';
  }
};
