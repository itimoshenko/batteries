// eslint-disable-next-line import/prefer-default-export
export const hasProperty = <P extends string>(
  obj: unknown,
  prop: P,
): obj is { [K in P]: unknown } => Object.prototype.hasOwnProperty.call(obj, prop);
