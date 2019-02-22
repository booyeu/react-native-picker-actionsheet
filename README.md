# react-native-picker-actionsheet [![Monthly download](https://img.shields.io/npm/dm/react-native-picker-actionsheet.svg)](https://img.shields.io/npm/dm/react-native-picker-actionsheet.svg) [![Total downloads](https://img.shields.io/npm/dt/react-native-picker-actionsheet.svg)](https://img.shields.io/npm/dt/react-native-picker-actionsheet.svg)

## Install

```bash
npm install react-native-picker-actionsheet --save
```

## Usage

```javascript
import PickerActionSheet from 'react-native-picker-actionsheet';

<PickerActionSheet />
```

## Example

![ios](https://raw.githubusercontent.com/BooYeu/react-native-picker-actionsheet/master/images/ios.jpg)
![android](https://raw.githubusercontent.com/BooYeu/react-native-picker-actionsheet/master/images/android.jpg)

## Properties

| Prop  | Default  | Required | Description |
| :------------ |:---------------:| :---------------:| :-----|
| show | false | yes | Controller whether or not show it |
| height | 120 | yes | The height of the container,you have to change it for your requirement |
| title | '' | no | The title text of the container |
| titleRight | null | no | The compoment on the right hand of title |
| data | [] | no | The data you give users to picker |
| renderItem | ({item,index})=>{} | no | Function that shows data | 
| onCancel | ()=>{} | no | Function that is called when user cancels it |
| onSubmit | (text)=>{} | no | Function that is called when user submits it |
| cancelText | 'cancel' | no | The string that is displayed on the cancel button |
| submitText | 'submit' | no | The string that is displayed on the submit button |
| shadowClick | 'submit' | no | The string that is 'cancel' or 'submit' when shadow is clicked |
