import React from "react";
import { PanResponder, View, Text} from 'react-native'
import { ProcessingView } from "expo-processing";
import KeyEvent from 'react-native-keyevent';
import {draw, setup, startNewGame as start, touch, untouch} from './sketch.js'

// Scale 0.9 for web
// Scale 3 for phone
let scale = 0.9;
let swapAxis = false;

let width = 0;
let height = 0;
let touchX = 0;
let touchY = 0;

export default class App extends React.Component {
    render() {
        
        return (
        <View style={{flex: 1,backgroundColor: 'transparent'}}{...this.panResponder.panHandlers}>
        <ProcessingView style={{ flex: 1 }} sketch={this._sketch} />
        </View>
        );
    }

    swap_xy = true;
    
    _sketch = p => {
      p.setup = () =>{
        if(swapAxis){
          width = p.height;
          height = p.width;
        }else{
          width  = p.width;
          height = p.height;
        }
        setup(p, width, height, swapAxis);
        start();
      }
      p.draw = () => {
        draw(p);
      };
    };
    
    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onStartShouldSetPanResponderCapture: (event, gestureState) => true,
        onMoveShouldSetPanResponder: (event, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
        onPanResponderGrant: (event, gestureState) => {
          if(swapAxis){
            touchY = event.nativeEvent.locationX*scale;
            touchX = event.nativeEvent.locationY*scale;
          }else
          {
            touchX = event.nativeEvent.locationX*scale;
            touchY = event.nativeEvent.locationY*scale;
          }
          touch(touchX,touchY);
        },
        onPanResponderMove: (event, gestureState) => {
          if(swapAxis){
            touchY = event.nativeEvent.locationX*scale;
            touchX = event.nativeEvent.locationY*scale;
          }else
          {
            touchX = event.nativeEvent.locationX*scale;
            touchY = event.nativeEvent.locationY*scale;
          }
          touch(touchX,touchY);
        },
        onPanResponderRelease: (event, gestureState) => {
          untouch();
        },
    });
}
