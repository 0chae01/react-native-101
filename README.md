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

- StatusBar는 3rd-party 패키지로, 모바일 운영체제의 상태바를 말한다.
