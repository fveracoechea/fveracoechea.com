export type ObjectAny = Record<PropertyKey, unknown>;

export type IslandProps = {
  visible?: boolean;
  media?: string;
};

export type IslandsConfig = Record<
  string,
  () => Promise<{ default: (props: IslandProps) => JSX.Element }>
>;
