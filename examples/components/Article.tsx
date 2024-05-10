import { Container } from './Container.tsx';
import { Text } from './Text.tsx';

export function Article() {
  return (
    <Container as="article">
      <Text as="h2" size="large">
        Title
      </Text>

      <Text as="p" size="medium">
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
        cillum sint consectetur cupidatat
      </Text>

      <Text as="a" href="google.com">
        Link
      </Text>

      <Text as="label" htmlFor="input">
        Label
        <input type="text" id="input" />
      </Text>
    </Container>
  );
}
