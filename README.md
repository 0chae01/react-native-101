# React-Native 101

## #1 INTRODUCTION

### Expo 설치

- React-Native 앱은 Javascript로만 이루어지지 않는다. 오히려 앱에서 가장 작은 부분이다. 가장 중요한 부분은 Bridge들을 통해 코드가 운영체제와 통신할 수 있도록 하는 인프라 시설이다.
  ![image1](/readmeImages/1.png)
- 따라서 RN 앱을 만들 때 안드로이드를 위한 Java, iOS를 위한 Xcode가 필요하다. Java와 Xcode로 이 인프라를 가져와서 각각 apk와 ipa 안에 넣어준다.
- Expo를 사용하면, 시뮬레이터나 Java, Xcode 같은 것들을 설치하지 않고도 JavaScript와 스타일링 코드들만 작성해서 즉시 코드를 테스트할 수 있다.
- `npm install --global expo-cli`
- `brew update`, `brew install watchman`

### 모바일 Expo / Expo Go 앱 설치

- Expo 또는 Expo Go 앱에서 Expo 앱으로 작성한 코드의 반영사항을 바로 확인할 수 있다.

### React Native의 작동방식

![image2](/readmeImages/2.png)

- 우리는 JavaScript 파트의 코드만 작성한다.
- 사용자가 화면을 누르는 등 event가 발생하면, Native 파트(iOS or 안드로이드)에서 기록된다.
- React Native는 그 정보를 가지고 JSON메시지를 생성해 전송하고, JavaScript 파트에서 메시지를 받는다.
- 메시지를 받은 JavaScript 파트에서는 어떤 코드를 실행시키고, 다시 native에 메시지를 보낸다.

### Creating The App

- `npx creat-expo-app [앱이름]`으로 CRA처럼 프로젝트를 시작한다.
- `npm start`를 하면 qr코드와 commands가 보인다.
- `npx expo login`으로 Expo계정 로그인을 하고 다시 `npm start`를 해주면 모바일 Expo앱에 해당 프로젝트가 보인다. 코드를 수정하고 저장하면 Expo앱에 바로 반영되는 것을 확인할 수 있다.

## #2 WEATHER APP

### Rules of Native

- React Native는 웹사이트가 아니기 때문에 html을 쓰지 않는다. 즉 div를 쓸 수 없다. 대신 View를 사용한다.(import 필수)
- React Native에서 모든 text는 Text 컴포넌트 안에 써야 한다.
- style 속성을 사용할 수 있지만 모든 스타일이 사용가능한 것은 아니다. ex) border 속성은 사용불가
- `StyleSheet.create`는 styles object를 생성하는 데 사용한다. `StyleSheet.create`를 사용하면 CSS 자동완성 기능을 사용할 수 있고, 스타일 컴포넌트들을 정리하기 좋다.

### StatusBar

- Expo에서 사용된 StatusBar는 3rd-party 패키지로, 모바일 운영체제의 상태바를 말한다.
- React Native에서 제공하는 StatusBar 컴포넌트와 props와 함수가 다르다.(자체적으로 만든 컴포넌트이기 때문)

### Third-party packages

- React Native는 더 빠른 속도를 위해, 그리고 사람들이 컴포넌트와 API를 쉽게 만들 수 있게 만들수 있도록 많은 컴포넌트들과 API들을 없앴다.
- 컴포넌트는 화면에 렌더링할 항목이다. ex) View, StatusBar
- API는 자바스크립트 코드로, 다양한 기능들을 제공해준다. ex) Vibration
- React Native 팀이 제공하는 패키지 외에 Third-party 패키지들은 React Native Directory에서 볼 수 있다.
- Expo 팀은 자체적으로 Packages와 APIs를 만들었고, 이를 Expo SDK라고 한다.

### Layout System

- React Native의 Flexbox는 웹에서와 거의 같은 방식이다.
- React Native의 Flexbox와 웹의 Flexbox의 차이점
  - React Native에서는 display: block, inline-block, grid가 없다. Flexbox만 있다.
  - 요소의 기본 속성이 Flex로, direction은 column으로 설정된다.
  - 다양한 기기의 사이즈를 고려해 아이콘, 아바타가 아닌 레이아웃에는 width와 height 속성과 픽셀값을 사용하지 않고, flex size 비율을 설정해 준다.

### ScrollView

- React Native에서는 웹과 달리 아이템이 많아졌을 때 자동으로 스크롤이 생기지 않는다.
- ScrollView 컴포넌트를 사용하면 스크롤을 할 수 있다.
- ScrollView의 스타일은 style prop이 아닌 contentContainerStyle prop을 사용해야 한다.
- ScrollView는 스크린보다 더 나아가야 하기 때문에 Flex 사이즈를 줄 필요가 없다.
- horizontal 속성으로 가로 스크롤 구현이 가능하다.
- pagingEnabled 속성으로 페이지가 생성된다.
- showsHorizontalScrollIndicator 속성으로 페이지 indicator를 제어할 수 있다.
- indicatorStyle 속성으로 indicator 스타일을 변경할 수 있다.(only iOS)

### Dimensions

- 기기의 사이즈를 기준으로 값을 설정하고 싶을 때 Dimensions API을 이용해 화면 크기를 얻을 수 있다.
