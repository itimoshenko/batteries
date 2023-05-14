import { hasProperty } from './hasProperty';

type AggregateByPred<I> = (item: I) => string;

// eslint-disable-next-line import/prefer-default-export
export const aggregateDataBy = <I extends Record<string, unknown>>(
  records: I[],
  aggregateByPreds: AggregateByPred<I>[],
) => records.reduce((acc, r) => {
    const objRef = aggregateByPreds.reduce((ref, aggregateBy, i, array) => {
      const aggregateByField = aggregateBy(r);

      if (!hasProperty(ref, aggregateByField)) {
        Object.defineProperty(ref, aggregateByField, {
          enumerable: true,
          value: i === array.length - 1 ? [] : {},
        });
      }

      if (hasProperty(ref, aggregateByField)) {
        return ref[aggregateByField];
      }

      return ref;
    }, acc);

    if (Array.isArray(objRef)) {
      objRef.push(r);
    }

    return acc;
  }, {} as unknown);
