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

- `npx create-expo-app [앱이름]`으로 CRA처럼 프로젝트를 시작한다.
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

### Location

- 위치 정보와 관련된 Expo API. 권한요청을 하고, 유저의 현재 위치를 받아올 수 있고, 이동중인 위치를 계속해서 검색하는 등 다양한 요청이 가능하다.
- requestForegroundPermissionsAsync : 유저에게 앱을 사용하는 동안의 위치정보조회동의를 요청할 수 있다.
- getCurrentPositionAsync : accuracy 옵션을 받아 위치 정보를 받아온다.
- reverseGeocodeAsync : latitude, longitude와 옵션을 가지고 주소를 받아온다.

### WeatherAPI

- openweathermap.org에서 무료로 사용할 수 있는 2가지 WeatherAPI 중 `3-hour Forecast 5 days API`를 사용해 매일 일정 시간의 날씨를 받아온다.

### ActivityIndicator

- React Native에서 제공하는 로딩 상태 표시 indicator. iOS와 안드로이드에서 각각 디자인이 다르다.

### Expo Icons

- Expo에서 제공하는 아이콘들을 이용해 날씨 아이콘을 출력한다.

## #3 WORK HARD TRAVEL HARD APP

### TouchableOpacity

- 누르는 이벤트를 listen할 준비가 된 View라고 할 수 있다.
- 터치를 할 때 투명해지는 모습을 볼 수 있다.
- activeOpacity 속성으로 눌렀을 때의 투명도를 조절 가능하다.

### TouchableHighlight

- TouchableOpacity 보다 많은 속성을 가지고 있다.
- 요소를 클릭했을 때 배경색이 바뀌도록 해준다.
- onPress 속성은 해당 버튼을 눌렀을 때(눌렀다 뗄 때)의 이벤트를 말한다.(onPressIn과 onPressOut의 Combination)
- onPressIn은 손가락이 그 영역에 들어갈 때, onPressOut은 벗어날 때, onLongPress는 손가락이 영역에 들어가서 오랫동안 머무를 때를 말한다.
- TouchableOpacity와 달리 underlayColor를 설정해 배경색도 바꿔줄 수 있다.
- activeOpacity 속성으로 눌렀을 때의 투명도를 조절 가능하다.

### TouchableWithoutFeedback

- 터치 이벤트 리스닝은 가능하지만 그래픽이나 다른 UI 반응을 보여주지 않는다.
- onPress, onPressIn, onPressOut 등의 이벤트들이 포함되어 있다.

### Pressable

- TouchableWithoutFeedback과 같지만 더 섬세한 설정이 가능하다.(더 최근의 기술)
- onPress, onPressIn, onPressOut 등의 이벤트를 리스닝하고, onLongPress, onPressOut 등 다른 이벤트까지 조합되어 발생한다.
- delayLongPress도 설정할 수 있다.(얼마나 오래 누르면 반응할지)
- disabled 속성도 있다.
- hitSlop 속성은 요소 바깥 어디까지의 터치를 감지할지 정하는 속성이다.(손가락 터치 상황 고려)

### TextInput

- TextInput은 React Native에서 유저가 text를 쓸 수 있는 유일한 방법이다. HTML에서의 textarea나 input 등이 없다.
- placeholder 속성 설정이 가능하다.
- onFocus 속성은 터치했을 때 입력할 준비가 됐을 때를 말한다.
- keyboardType으로 이메일이나 전화번호를 입력할 때 등 특정 상황의 키보드타입을 설정할 수 있다.
- returnKeyType 속성으로 자판의 return 버튼의 타입을 바꿀 수 있다. 안드로이드에서만 쓸 수 있는 returnKeyLabel 속성으로는 원하는 아무거나 쓸 수 있다.
- secureTextEntry 속성은 비밀번호를 쓸 때처럼 텍스트 입력을 안보이게 처리해준다.
- multiline 속성은 한 줄 이상 텍스트를 쓰는 경우에 사용한다.
- onChangeText로 입력한 Text를 받을 수 있다. 브라우저에서는 event나 target이 있었지만 RN에서는 없다.
- onSubmitEditing으로 submit 버튼을 눌렀을 때의 이벤트를 리스닝할 수 있다.

### ToDos state setting하기

- toDos를 객체 상태로 저장할 때 mutate를 하지 않기 위해서 여러 개의 객체를 합쳐주는 assign함수를 사용한다.
- assign의 타겟 객체를 빈 객체로 두고, 원래 상태의 toDos와 새로 등록할 toDos를 각각 다음 인자로 넣어서 새로운 객체로 만든다.
- toDos객체 요소는 key를 `Date.now()`로 두고 입력받은 text와 working인지 여부를 객체형태로 value로 설정한다.
- 또는 ES6의 spread operator를 사용해 바로 넣어줘도 된다.

### 객체 맵핑하기

`Object.keys()`로 객체의 key 배열을 받아 map을 돌려서, `toDos[key]`로 text를 출력할 수 있다.

### 데이터 저장하기

- `npx expo install @react-native-async-storage/async-storage`
- Expo API `AsyncStorage`를 이용해 새로고침을 하거나 앱을 재실행 했을 때도 ToDo 데이터가 남아있도록 한다.
- `AsyncStorage`는 브라우저의 `localStorage`처럼 사용할 수 있다.(사용법도 동일함)
- 앱이 처음 실행될 때(useEffect) AsyncStorage에 저장된 toDos를 toDos state에 세팅하는 loadToDos 함수를 실행한다. 이때 저장된 값이 있을 때만 세팅하도록 처리한다.
- toDo를 추가할 때는 AsyncStorage에 같은 key값으로 저장해준다.
- `AsyncStorage`는 기기의 디스크에 접근하고 있기 때문에 메모리 등의 문제로 에러가 발생할 수 있다. 따라서 localStorage와는 달리 getItem, setItem 처리 시 비동기 처리를 해주어야 한다.

### todo 삭제하기

- 원래의 toDos를 newToDos로 할당해주고, 클릭한 todo의 key를 가진 todo를 삭제한다. setState를 하기 전에 새로운 객체를 만들고 mutate를 했기 때문에 문제가 없다.
- 삭제 버튼 icon은 expo vector-icons에서 가져와 사용한다.

### Alert

- RN에서 제공하는 Alert API에서 alert, propmpt 메소드를 사용할 수 있다.(단, propmpt는 iOS only)
- Alert에서는 사용자가 Alert title과 message, buttons를 커스텀할 수 있다. buttons는 text, onPress, style(iOSonly), isPreferred(iOSonly)를 갖는 객체 배열이다.
