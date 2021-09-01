/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
import _logger from 'clear-logger';
const logger = _logger.customName('EQB_DATA_VERIFIER');

export class DataVerifierBlueprint<PropertiesType = {}> {
  private __properties__: Partial<PropertiesType>;

  get properties() {
    return this.__properties__;
  }

  constructor(properties: Partial<PropertiesType> = {}) {
    this.__properties__ = properties;
  }
}

export interface DataVerifierInterface<T> {
  typeguard: (data: any) => data is T;
  transformer: (data: any, key: string) => T;
}

type nully = null | undefined;

export type ProcessorType = {
  [key: string]: ProcessorType | PureProcessorType;
};

export type PureProcessorType = ReturnType<ValueOf<typeof __DataTypes>>;

export type RecursiveVerifiedType<T> = {
  [P in keyof T]: T[P] extends DataVerifierInterface<any>
    ? Extract<TypeGuard<T[P]['typeguard']>, nully> extends never
      ? TypeGuard<T[P]['typeguard']>
      : Exclude<TypeGuard<T[P]['typeguard']>, nully> | null
    : T[P] extends Record<string, any>
    ? RecursiveVerifiedType<T[P]>
    : any;
};

function isPureProcessorType(
  processor: ProcessorType | PureProcessorType,
): processor is PureProcessorType {
  return (processor as any).__properties__ !== undefined;
}

function isObjectProcessorType(data: any): data is ProcessorType {
  // TODO : improve this type guard
  // maybe can use instanceof something
  if (typeof data === 'object') return true;
  return false;
}

function verifier<T>(
  data: any,
  dataVerifier: DataVerifierInterface<T>,
  key: string,
): T {
  //checking null by logical idea
  if (isNully(data) && !dataVerifier.typeguard(data)) {
    throw new Error('Parameter Null');
  }
  return dataVerifier.transformer(data, key);
}

export function verificationWrapper(globalData: Record<string, any>) {
  return function verifyIterator<T>(
    processors: T extends Record<string, ProcessorType | PureProcessorType>
      ? T
      : any,
    data: Record<string, any> = globalData,
    objectHierarchy: string[] = [],
  ): RecursiveVerifiedType<T> {
    const returnData: RecursiveVerifiedType<any> = {};
    if (isObjectProcessorType(processors)) {
      Object.entries(processors).forEach(([key, processor]) => {
        if (!isPureProcessorType(processor)) {
          // Not Pure processor type
          if (!processor) {
            // Weird thing came inside.
            logger.debug('Processor is invalid!');
            process.exit(1);
          }

          const _result = verifyIterator(processor, data[key], [
            ...objectHierarchy,
            key,
          ]);
          Object.assign(returnData, { [key]: _result });
          return;
        }
        // Pure Processor type
        const result = verifier(
          data[key],
          processor,
          [...objectHierarchy, key].reduce((acc, cur) => `${acc}.${cur}`),
        ); //verifierBuilder(value)(data, key);
        Object.assign(returnData, { [key]: result });
      });
    } else {
      logger.debug('Verification Type is Invalid!');
      process.exit(1);
    }
    return returnData;
  };
}

function isNully(data: any): boolean {
  if (data === null || data === undefined) {
    return true;
  }
  return false;
}

function returnRecord(data: any): Record<any, any> | null {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      return null;
    }
  }
  return data;
}

function returnArray<T>(data: any): T[] {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      data = JSON.parse(`[${data}]`);
    }
  }
  return data;
}

function ArrayParser<T>(data: any, key: string): T[] {
  try {
    if (new ArrayVerifier().typeguard(data)) return data as T[];
    if (new StringVerifier().typeguard(data)) {
      const r = returnArray<T>(data);
      logger.debug('String parsed to array, DO NOT USE THIS IN PRODUCTION!');
      return r;
    }
    throw new Error('Parameter Invalid');
  } catch {
    throw new Error('Parameter Invalid');
  }
}

export class StringVerifier
  extends DataVerifierBlueprint
  implements DataVerifierInterface<string>
{
  typeguard(data: any): data is string {
    return typeof data === 'string';
  }

  transformer(data: any, key: string): string {
    if (this.typeguard(data) && data) return data;
    throw new Error('Parameter Invalid');
  }
}
export class StringNullVerifier
  extends DataVerifierBlueprint
  implements DataVerifierInterface<string | nully>
{
  typeguard(data: any): data is string | nully {
    return typeof data === 'string' || isNully(data);
  }

  transformer(data: any, key: string): string | nully {
    if (isNully(data)) {
      return null;
    }
    if (data) if (this.typeguard(data) && data) return data;
    throw new Error('Parameter Invalid');
  }
}

export class NumberVerifier
  extends DataVerifierBlueprint<{ preciseTypeguard: boolean }>
  implements DataVerifierInterface<number>
{
  rough_typeguard(data: any): data is number {
    return typeof data === 'number';
  }

  precise_typeguard(data: any): data is number {
    if (typeof data === 'number') return true;
    try {
      parseFloat(data);
      return true;
    } catch {
      return false;
    }
  }

  typeguard = this.properties.preciseTypeguard
    ? this.precise_typeguard
    : this.rough_typeguard;

  transformer(data: any, key: string): number {
    if (this.typeguard(data) && data) return data;
    try {
      return parseFloat(data);
    } catch {
      throw new Error('Parameter Invalid');
    }
  }
}
export class NumberNullVerifier
  extends DataVerifierBlueprint<{ preciseTypeguard: boolean }>
  implements DataVerifierInterface<number | nully>
{
  rough_typeguard(data: any): data is number | nully {
    return typeof data === 'number' || isNully(data);
  }

  precise_typeguard(data: any): data is number | nully {
    if (typeof data === 'number' || isNully(data)) return true;
    try {
      parseFloat(data);
      return true;
    } catch {
      return false;
    }
  }

  typeguard = this.properties.preciseTypeguard
    ? this.precise_typeguard
    : this.rough_typeguard;

  transformer(data: any, key: string): number | nully {
    if (this.typeguard(data) && data) return data;
    if (isNully(data)) return null;
    try {
      return parseFloat(data);
    } catch {
      throw new Error('Parameter Invalid');
    }
  }
}

export class DateVerifier
  extends DataVerifierBlueprint<{ preciseTypeguard: boolean }>
  implements DataVerifierInterface<Date>
{
  precise_typeguard(data: any): data is Date {
    if (this.rough_typeguard(data)) {
      try {
        const d = new Date(data);

        if (isNaN(d as any)) {
          return false;
        }

        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  rough_typeguard(data: any): data is Date {
    const t = typeof data;
    if (t === 'string' || t === 'object') {
      return true;
    }
    return false;
  }

  typeguard = this.properties.preciseTypeguard
    ? this.precise_typeguard
    : this.rough_typeguard;

  transformer(data: any, key: string): Date {
    try {
      return new Date(data);
    } catch {
      throw new Error('Parameter Invalid');
    }
  }
}

export class DateNullVerifier
  extends DataVerifierBlueprint<{ preciseTypeguard: boolean }>
  implements DataVerifierInterface<Date | nully>
{
  precise_typeguard(data: any): data is Date {
    if (isNully(data)) {
      return true;
    }
    if (typeof data === 'string') {
      try {
        new Date(data);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  rough_typeguard(data: any): data is Date {
    return typeof data === 'string' || isNully(data);
  }

  typeguard = this.properties.preciseTypeguard
    ? this.precise_typeguard
    : this.rough_typeguard;

  transformer(data: any, key: string): Date | nully {
    if (isNully(data)) {
      return null;
    }
    try {
      return new Date(data);
    } catch {
      throw new Error('Parameter Invalid');
    }
  }
}

export class ObjectVerifier
  extends DataVerifierBlueprint<{ preciseTypeguard: boolean }>
  implements DataVerifierInterface<Record<string, any>>
{
  rough_typeguard(data: any): data is Record<string, any> {
    return data !== null && typeof data === 'object';
  }

  precise_typeguard(data: any): data is Record<string, any> {
    if (this.rough_typeguard(data)) return true;
    try {
      JSON.parse(data);
      return true;
    } catch {
      return false;
    }
  }

  typeguard = this.properties.preciseTypeguard
    ? this.precise_typeguard
    : this.rough_typeguard;

  transformer(data: any, key: string): Record<string, any> {
    if (this.typeguard(data)) return data;
    const record = returnRecord(data);
    if (this.typeguard(record)) return record;
    throw new Error('Parameter Invalid');
  }
}
export class ObjectNullVerifier
  extends DataVerifierBlueprint<{ preciseTypeguard: boolean }>
  implements DataVerifierInterface<Record<string, any> | nully>
{
  rough_typeguard(data: any): data is Record<string, any> | nully {
    return isNully(data) && typeof data === 'object';
  }

  precise_typeguard(data: any): data is Record<string, any> | nully {
    if (this.rough_typeguard(data)) return true;
    try {
      JSON.parse(data);
      return true;
    } catch {
      return false;
    }
  }

  typeguard = this.properties.preciseTypeguard
    ? this.precise_typeguard
    : this.rough_typeguard;

  transformer(data: any, key: string): Record<string, any> | nully {
    if (isNully(data)) {
      return null;
    }
    if (this.typeguard(data)) return data;
    const record = returnRecord(data);
    if (this.typeguard(record)) return record;
    throw new Error('Parameter Invalid');
  }
}
export class ArrayVerifier<T = any>
  extends DataVerifierBlueprint<
    | {
        valueVerifier: DataVerifierInterface<T>;
        preciseTypeguard: boolean;
      }
    | undefined
  >
  implements DataVerifierInterface<T[]>
{
  precise_typeguard(data: any): data is T[] {
    if (this.rough_typeguard(data)) {
      return true;
    }
    try {
      data = ArrayParser(data, '');
      if (this.properties?.valueVerifier) {
        if (
          data.filter((d: any) => !this.properties?.valueVerifier?.typeguard(d))
            .length !== 0
        ) {
          return false;
        }
        return true;
      } else {
        return Array.isArray(data);
      }
    } catch {
      return false;
    }
  }
  rough_typeguard(data: any): data is T[] {
    return Array.isArray(data);
  }
  typeguard = this.properties?.preciseTypeguard
    ? this.precise_typeguard
    : this.rough_typeguard;
  arrayVerifyingTransformer(data: any, key: string): T[] {
    data = ArrayParser(data, key);
    if (this.typeguard(data) && data) {
      if (
        data.filter((d) => !this.properties?.valueVerifier?.typeguard(d))
          .length !== 0
      ) {
        throw new Error('Parameter Invalid');
      }
      return data;
    }
    throw new Error('Parameter Invalid');
  }
  plainTransformer(data: any, key: string): T[] {
    data = ArrayParser(data, key);
    if (this.typeguard(data) && data) return data;
    throw new Error('Parameter Invalid');
  }
  transformer = this.properties?.valueVerifier
    ? this.arrayVerifyingTransformer
    : this.plainTransformer;
}
export class ArrayNullVerifier<T = any>
  extends DataVerifierBlueprint<
    | {
        valueVerifier: DataVerifierInterface<T>;
        preciseTypeguard: boolean;
      }
    | undefined
  >
  implements DataVerifierInterface<T[] | nully>
{
  precise_typeguard(data: any): data is T[] | nully {
    if (this.rough_typeguard(data)) {
      return true;
    }
    try {
      data = ArrayParser(data, '');
      if (this.properties?.valueVerifier) {
        if (
          data.filter((d: any) => !this.properties?.valueVerifier?.typeguard(d))
            .length !== 0
        ) {
          return false;
        }
        return true;
      } else {
        return Array.isArray(data);
      }
    } catch {
      return false;
    }
  }
  rough_typeguard(data: any): data is T[] | nully {
    return Array.isArray(data) || isNully(data);
  }
  typeguard = this.properties?.preciseTypeguard
    ? this.precise_typeguard
    : this.rough_typeguard;
  arrayVerifyingTransformer(data: any, key: string): T[] | nully {
    if (isNully(data)) {
      return null;
    }
    data = ArrayParser(data, key);
    if (this.typeguard(data) && data) {
      if (
        data.filter((d) => !this.properties?.valueVerifier?.typeguard(d))
          .length !== 0
      ) {
        throw new Error('Parameter Invalid');
      }
      return data;
    }
  }
  plainTransformer(data: any, key: string): T[] | nully {
    if (isNully(data)) {
      return null;
    }
    data = ArrayParser(data, key);
    if (this.typeguard(data) && data) return data;
    throw new Error('Parameter Invalid');
  }
  transformer = this.properties?.valueVerifier
    ? this.arrayVerifyingTransformer
    : this.plainTransformer;
}
export class BooleanVerifier
  extends DataVerifierBlueprint<{ preciseTypeguard: boolean }>
  implements DataVerifierInterface<boolean>
{
  precise_typeguard(data: any): data is boolean {
    return this.rough_typeguard(data) || data === 'true' || data === 'false';
  }
  rough_typeguard(data: any): data is boolean {
    return typeof data === 'boolean';
  }
  typeguard = this.properties.preciseTypeguard
    ? this.precise_typeguard
    : this.rough_typeguard;
  transformer(data: any, key: string): boolean {
    if (this.typeguard(data)) return data;
    if (new StringVerifier().typeguard(data)) {
      switch (data) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          throw new Error('Parameter Invalid');
      }
    }
    throw new Error('Parameter Invalid');
  }
}
export class BooleanNullVerifier
  extends DataVerifierBlueprint<{ preciseTypeguard: boolean }>
  implements DataVerifierInterface<boolean | nully>
{
  precise_typeguard(data: any): data is boolean | nully {
    return this.rough_typeguard(data) || data === 'true' || data === 'false';
  }
  rough_typeguard(data: any): data is boolean | nully {
    return typeof data === 'boolean' || isNully(data);
  }
  typeguard = this.properties.preciseTypeguard
    ? this.precise_typeguard
    : this.rough_typeguard;
  transformer(data: any, key: string): boolean | nully {
    if (this.typeguard(data)) return data;
    if (new StringVerifier().typeguard(data)) {
      switch (data) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          throw new Error('Parameter Invalid');
      }
    }
    throw new Error('Parameter Invalid');
  }
}
export class NotNullVerifier
  extends DataVerifierBlueprint
  implements DataVerifierInterface<Some>
{
  typeguard(data: any): data is Some {
    return !isNully(data);
  }
  transformer(data: any, key: string): Some {
    if (this.typeguard(data)) return data;
    throw new Error('Parameter Invalid');
  }
}
export class AnyVerifier
  extends DataVerifierBlueprint
  implements DataVerifierInterface<any>
{
  typeguard(data: any): data is any {
    return true;
  }
  transformer(data: any, key: string): string {
    return data;
  }
}
export class NullVerifier
  extends DataVerifierBlueprint
  implements DataVerifierInterface<null>
{
  typeguard(data: any): data is null {
    return data === null;
  }
  transformer(data: any, key: string): null {
    return null;
  }
}
export class FunctionVerifier
  extends DataVerifierBlueprint
  implements DataVerifierInterface<Function>
{
  typeguard(data: any): data is Function {
    return typeof data === 'function';
  }
  transformer(data: any, key: string): Function {
    if (this.typeguard(data)) {
      return data;
    }
    throw new Error('Parameter Invalid');
  }
}
export class FunctionNullVerifier
  extends DataVerifierBlueprint
  implements DataVerifierInterface<Function | nully>
{
  typeguard(data: any): data is Function | nully {
    return typeof data === 'function' || isNully(data);
  }
  transformer(data: any, key: string): Function | nully {
    if (this.typeguard(data)) {
      return data;
    }
    throw new Error('Parameter Invalid');
  }
}
const __DataTypes = {
  string(...props: ConstructorParameters<typeof StringVerifier>) {
    return new StringVerifier(...props);
  },
  stringNull(...props: ConstructorParameters<typeof StringNullVerifier>) {
    return new StringNullVerifier(...props);
  },
  date(...props: ConstructorParameters<typeof DateVerifier>) {
    return new DateVerifier(...props);
  },
  dateNull(...props: ConstructorParameters<typeof DateNullVerifier>) {
    return new DateNullVerifier(...props);
  },
  object(...props: ConstructorParameters<typeof ObjectVerifier>) {
    return new ObjectVerifier(...props);
  },
  objectNull(...props: ConstructorParameters<typeof ObjectNullVerifier>) {
    return new ObjectNullVerifier(...props);
  },
  array<T = any>(
    props?: Partial<{
      valueVerifier: DataVerifierInterface<T>;
      preciseTypeGuard: boolean;
    }>,
  ) {
    return new ArrayVerifier<T>(props);
  },
  arrayNull<T = any>(
    props?: Partial<{
      valueVerifier: DataVerifierInterface<T>;
      preciseTypeGuard: boolean;
    }>,
  ) {
    return new ArrayNullVerifier<T>(props);
  },
  boolean(...props: ConstructorParameters<typeof BooleanVerifier>) {
    return new BooleanVerifier(...props);
  },
  booleanNull(...props: ConstructorParameters<typeof BooleanNullVerifier>) {
    return new BooleanNullVerifier(...props);
  },
  number(...props: ConstructorParameters<typeof NumberVerifier>) {
    return new NumberVerifier(...props);
  },
  numberNull(...props: ConstructorParameters<typeof NumberNullVerifier>) {
    return new NumberNullVerifier(...props);
  },
  notNull(...props: ConstructorParameters<typeof NotNullVerifier>) {
    return new NotNullVerifier(...props);
  },
  any(...props: ConstructorParameters<typeof AnyVerifier>) {
    return new AnyVerifier(...props);
  },
  null(...props: ConstructorParameters<typeof NullVerifier>) {
    return new NullVerifier(...props);
  },
  function(...props: ConstructorParameters<typeof FunctionVerifier>) {
    return new FunctionVerifier(...props);
  },
  functionNull(...props: ConstructorParameters<typeof FunctionNullVerifier>) {
    return new FunctionNullVerifier(...props);
  },
};
export function preciseTypeof(data: any) {
  const dataProp = {
    undefined: { typeguard: (data: any) => data === undefined },
    boolean: __DataTypes.boolean(),
    function: __DataTypes.function(),
    number: __DataTypes.number(),
    array: __DataTypes.array(),
    null: __DataTypes.null(),
    date: __DataTypes.date({ preciseTypeguard: true }),
    string: __DataTypes.string(),
    object: __DataTypes.object(),
    bigint: { typeguard: (data: any) => typeof data === 'bigint' },
    symbol: { typeguard: (data: any) => typeof data === 'symbol' },
  };
  for (const [key, value] of Object.entries(dataProp)) {
    if (value.typeguard(data)) {
      return key;
    }
  }
}
export default __DataTypes;
