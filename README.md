# React Native `Development-helper`

Provides a React component that renders a development-helper.

## Platforms Supported

- [x] iOS
- [x] Android
- [x] Web

## Getting Started

### Installation

```sh
npm install -D rn-development-helper
```

```sh
yarn add -D rn-development-helper
```

```sh
bun install -D rn-development-helper
```

```sh
pnpm install -D rn-development-helper
```

## Usage (recommended)

Since the Development-Helper should only be available in Development and Test Environments you should build a shell around it so you can block it from reaching production code.

```jsx
import React from "react";
import DevelopmentHelper from "rn-development-helper";
import { DevelopmentHelperProps } from "rn-development-helper/src/types";

const UIDevelopmentHelper = (props: DevelopmentHelperProps) => {
  /* 
  * Figure out in which environment you are:
  * This is different for each project.
  * 
  * You should set isVisible based on which environments 
  * you want it to be shown
  */
  const isVisible = true

  if (!isVisible) {
    return null;
  }

  return <DevelopmentHelper {...props} />;
};

export default UIDevelopmentHelper;
```

## Usage (standalone - showing on all Environments)

!!! This should never be available in a Production Environment. !!!

Import the `DevelopmentHelper` component from `rn-development-helper` and use it like so:

```jsx
import React from 'react';
import DevelopmentHelper from "rn-development-helper";

const YourComponent = () => {
  const [someData, setSomeData] = React.useState();
  const [someOtherData, setSomeOtherData] = React.useState();

  return (
    <DevelopmentHelper
      properties={{someData, someOtherData}}
      actions={} />
  );
}

export default YourComponent
```

### Props

- [`properties`](#properties)

- [`actions`](#actions)

### Reference

### `properties`

Here you define, which Variables you want to inspect, this can be any Javascript understandable Type (string, number, boolean, object, array, function, etc.). 

```html
<DevelopmentHelper 
  properties={{ testVariable, someOtherTestVariable }}
/>
```

#### User specified name
```html
<DevelopmentHelper 
  properties={{ 
    test: testVariable, 
    otherTest: someOtherTestVariable 
  }}
/>
```

### `actions`

Here you define custom actions that you need to access during development or testing.

```html
<DevelopmentHelper 
  actions={{
    test: () => someTestFunction(),
    someOtherTest: () => someOtherTestFunction(),
  }}
/>
```

<!-- badges -->

[package]: https://www.npmjs.com/package/rn-development-helper
[license-badge]: https://img.shields.io/npm/l/@react-native-masked-view/masked-view.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT