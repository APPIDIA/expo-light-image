<h1 align="center">
  ⚡️ LightImage
</h1>

<div align="center">
Performant Expo image component.
</div>
<br/>

<p align="center">
  <kbd>
    <img
      src="./assets/example.gif"
      title="Example"
    >
  </kbd>
  <br>
  <em>LightImage example</em>
</p>

## Usage

```bash
yarn add expo-light-image

or

npm install expo-light-image
```

```jsx
import LightImage from "expo-light-image";

const YourImage = () => (
  <LightImage
    style={{ width: 200, height: 200 }}
    source={{
      uri: "https://unsplash.it/400/400?image=1",
    }}
  />
);
```