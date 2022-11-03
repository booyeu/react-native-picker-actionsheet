import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  masker: {
    backgroundColor: '#000',
    flex: 1,
  },
  item_container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  item_top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderColor: '#ddd',
    borderBottomWidth: 0.5,
    backgroundColor: '#f3f3f3',
  },
  item_top_btn: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 12,
    position: 'absolute',
    right: 12,
  },
  item_top_btn_left: {
    left: 12,
    right: 'auto',
  },
  item_top_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_top_title: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  items: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  items_scroll: {
    paddingVertical: 6,
  },
});

const PickerActionSheet = props => {
  const {
    show,
    height = 120,
    bottom = 0,
    title,
    titleRight,
    data,
    renderItem,
    cancelText = 'cancel',
    submitText = 'submit',
    onSubmit = () => {},
    onCancel = () => {},
    onMask,
    shadowClick = 'submit',
    showHeader = true,
    maskerChildren,
    topStyle,
    containerStyle,
    titlePress,
    children,
    ListEmptyComponent,
    Footer,
    scrollEnabled,
    titleStyle,
  } = props;

  const maskerOpacity = useRef(new Animated.Value(show ? 0.5 : 0));
  const bottomPosition = useRef(new Animated.Value(show ? 1 : 0));

  const [currentShow, setCurrentShow] = useState(show);

  const onShadowPress = useCallback(() => {
    onMask ? onMask() : shadowClick === 'submit' ? onSubmit() : onCancel();
  }, [onCancel, onMask, onSubmit, shadowClick]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(maskerOpacity.current, {
        toValue: show ? 0.5 : 0,
        duration: show ? 160 : 100,
        useNativeDriver: true,
      }),
      Animated.timing(bottomPosition.current, {
        toValue: show ? 1 : 0,
        duration: show ? 160 : 100,
        useNativeDriver: true,
      }),
    ]).start(() => setCurrentShow(show));
  }, [show]);

  return (
      <Modal
          transparent={true}
          onRequestClose={onCancel}
          visible={show || currentShow}>
        <TouchableWithoutFeedback onPress={onShadowPress}>
          <Animated.View
              style={[styles.masker, {opacity: maskerOpacity.current}]}
          />
        </TouchableWithoutFeedback>
        {maskerChildren}
        <Animated.View
            style={[
              styles.item_container,
              {
                height: height + bottom,
                paddingBottom: bottom,
                transform: [
                  {
                    translateY: bottomPosition.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height, 0],
                    }),
                  },
                ],
              },
              containerStyle,
            ]}>
          {showHeader ? (
              <View style={[styles.item_top, topStyle]}>
                <Text
                    style={[styles.item_top_btn, styles.item_top_btn_left]}
                    onPress={onCancel}>
                  {cancelText}
                </Text>
                <TouchableWithoutFeedback onPress={titlePress}>
                  <View style={styles.item_top_title_container}>
                    <Text style={[styles.item_top_title, titleStyle]}>{title}</Text>
                    {titleRight}
                  </View>
                </TouchableWithoutFeedback>
                <Text style={styles.item_top_btn} onPress={onSubmit}>
                  {submitText}
                </Text>
              </View>
          ) : null}
          {children ? (
              children
          ) : data.length > 0 ? (
              scrollEnabled ? (
                  <ScrollView style={styles.items_scroll}>
                    {data.map(renderItem)}
                  </ScrollView>
              ) : (
                  <View style={styles.items}>{data.map(renderItem)}</View>
              )
          ) : (
              ListEmptyComponent
          )}
          {Footer}
        </Animated.View>
      </Modal>
  );
};

export default memo(PickerActionSheet);
