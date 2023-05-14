import { hasProperty } from './hasProperty';

type CalculatePred<I, R> = (array: I[]) => R;

// eslint-disable-next-line import/prefer-default-export
export const calculate = <I, R>(aggregation: unknown, calculatePred: CalculatePred<I, R>) => {
  const result: unknown = {};
  const stack: [unknown, string[]][] = [[aggregation, []]];

  while (stack.length) {
    const item = stack.pop();

    if (!item) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const [node, path] = item;

    if (!Array.isArray(node) && typeof node === 'object' && node !== null) {
      const entries = Object.entries(node)
        .map(([k, n]) => [n as unknown, [...path, k]] as [unknown, string[]]);

      stack.push(...entries);
    } else if (Array.isArray(node)) {
      path.reduce((ref, prop, i, array) => {
        if (!hasProperty(ref, prop)) {
          Object.defineProperty(ref, prop, {
            enumerable: true,
            value: i === array.length - 1 ? calculatePred(node) : {},
          });
        }

        if (hasProperty(ref, prop)) {
          return ref[prop];
        }

        return ref;
      }, result);
    }
  }

  return result;
};
