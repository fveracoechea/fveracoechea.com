export type ObjectAny = Record<PropertyKey, unknown>;

export interface OverridableTypeMap {
  props: ObjectAny;
  defaultComponent: React.ElementType;
}

/**
 * Simplifies the display of a type (without modifying it).
 * Taken from https://effectivetypescript.com/2022/02/25/gentips-4-display/
 */
// deno-lint-ignore ban-types
export type Simplify<T> = T extends Function ? T : { [K in keyof T]: T[K] };

/**
 * Remove properties `K` from `T`.
 * Distributive for union types.
 */
type DistributiveOmit<T, K extends keyof ObjectAny> = T extends ObjectAny
  ? Omit<T, K>
  : never;

/**
 * Like `T & U`, but using the value types from `U` where their properties overlap.
 */
export type Overwrite<T, U> = DistributiveOmit<T, keyof U> & U;

/**
 * Props defined on the component.
 */
type BaseProps<M extends OverridableTypeMap> = M["props"];

/**
 * Props if `as={Component}` is NOT used.
 */
export type DefaultComponentProps<M extends OverridableTypeMap> =
  & BaseProps<M>
  & DistributiveOmit<
    React.ComponentPropsWithRef<M["defaultComponent"]>,
    keyof BaseProps<M>
  >;

/**
 * Own props of the component augmented with props of the root component.
 */
export type PolymorphicProps<
  TypeMap extends OverridableTypeMap,
  RootComponent extends React.ElementType,
> =
  & TypeMap["props"]
  & DistributiveOmit<
    React.ComponentPropsWithRef<RootComponent>,
    keyof TypeMap["props"]
  >
  & {
    as?: React.ElementType;
  };

/**
 * Props of the component if `as={Component}` is used.
 */
type OverrideProps<
  M extends OverridableTypeMap,
  C extends React.ElementType,
> =
  & BaseProps<M>
  & DistributiveOmit<React.ComponentPropsWithRef<C>, keyof BaseProps<M>>;

/**
 * A component whose root component can be controlled via an `as` prop.
 *
 * Adjusts valid props based on the type of `as`.
 */
export interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends React.ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      as: C;
    } & OverrideProps<M, C>,
  ): JSX.Element | null;
  (props: DefaultComponentProps<M>): JSX.Element | null;
  propTypes?: ObjectAny;
}
