import React from 'react';
import {
  StyleSheet,
  Animated,
  Modal,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

export default class extends React.PureComponent {
  static defaultProps = {
    show: false,
    height: 120,
    bottom: 0,
    title: '',
    titleRight: null,
    data: [],
    renderItem: ({}) => {},
    cancelText: 'cancel',
    submitText: 'submit',
    onSubmit: () => {},
    onCancel: () => {},
    onMask: undefined,
    shadowClick: 'submit',
    renderFooter: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      maskerOpacity: new Animated.Value(props.show ? 0.5 : 0),
      bottomPosition: new Animated.Value(props.show ? 1 : 0),
      show: props.show,
    };
    this.cancelF = () => props.onCancel();
    this.shadowF = () =>
      props.onMask
        ? props.onMask()
        : props.shadowClick === 'submit'
        ? props.onSubmit()
        : props.onCancel();
    this.submitF = () => props.onSubmit();
  }
  render() {
    let item = [];
    for (let i = 0; i < this.props.data.length; i++) {
      item.push(this.props.renderItem({item: this.props.data[i], index: i}));
    }
    if (this.state.show !== this.props.show) {
      requestAnimationFrame(() =>
        Animated.parallel([
          Animated.timing(this.state.maskerOpacity, {
            toValue: this.props.show ? 0.5 : 0,
            duration: this.props.show ? 160 : 100,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.bottomPosition, {
            toValue: this.props.show ? 1 : 0,
            duration: this.props.show ? 160 : 100,
            useNativeDriver: true,
          }),
        ]).start(() => this.setState({show: this.props.show})),
      );
    }
    return this.state.show || this.props.show ? (
      <View>
        <Modal transparent={true} onRequestClose={this.cancelF}>
          <TouchableWithoutFeedback onPress={this.shadowF}>
            <Animated.View
              style={[styles.masker, {opacity: this.state.maskerOpacity}]}
            />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item_container,
              {
                height: this.props.height + this.props.bottom,
                paddingBottom: this.props.bottom,
                transform: [
                  {
                    translateY: this.state.bottomPosition.interpolate({
                      inputRange: [0, 1],
                      outputRange: [this.props.height, 0],
                    }),
                  },
                ],
              },
              this.props.containerStyle,
            ]}>
            <View style={[styles.item_top, this.props.topStyle]}>
              <Text
                style={[styles.item_top_btn, {left: 12, right: 'auto'}]}
                onPress={this.cancelF}>
                {this.props.cancelText}
              </Text>
              <TouchableWithoutFeedback onPress={this.props.titlePress}>
                <View style={styles.item_top_title_container}>
                  <Text
                    style={[styles.item_top_title, this.props.titleStyle]}>
                    {this.props.title}
                  </Text>
                  {this.props.titleRight}
                </View>
              </TouchableWithoutFeedback>
              <Text style={styles.item_top_btn} onPress={this.submitF}>
                {this.props.submitText}
              </Text>
            </View>
            {item.length > 0 ? (
              this.props.scrollEnabled ? (
                <ScrollView style={styles.items_scroll}>{item}</ScrollView>
              ) : (
                <View style={styles.items}>{item}</View>
              )
            ) : (
              this.props.ListEmptyComponent
            )}
            {this.props.renderFooter && this.props.renderFooter()}
          </Animated.View>
        </Modal>
      </View>

    ) : null;
  }
}

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
