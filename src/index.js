import React from 'react';
import {StyleSheet,Animated,Modal,View,ScrollView,Text,TouchableWithoutFeedback,Dimensions} from 'react-native';

export default class extends React.Component{
  static defaultProps={
    show:false,
    height:120,
    title:'',
    titleRight:null,
    data:[],
    renderItem:({})=>{},
    cancelText:'cancel',
    submitText:'submit',
    onSubmit:()=>{},
    onCancel:()=>{},
    shadowClick:'submit'
  };
  constructor(props){
    super(props);
    this.state={maskerOpacity:new Animated.Value(this.props.show?.5:0),bottomPosition:new Animated.Value(this.props.show?1:0),show:!this.props.show};
  }
  render(){
    let item=[];
    for(let i=0;i<this.props.data.length;i++)
      item.push(this.props.renderItem({item:this.props.data[i],index:i}));
    if(this.state.show!==this.props.show)
      Animated.parallel([
        Animated.timing(
          this.state.maskerOpacity,
          {
            toValue: this.props.show ? .5 : 0,
            duration: this.props.show ? 200 : 160
          }
        ),
        Animated.timing(
          this.state.bottomPosition,
          {
            toValue:this.props.show?1:0,
            duration: this.props.show ? 200 : 160
          }
        )
      ]).start(()=>this.setState({show:this.props.show}));
    return(
	    this.state.show||this.props.show?<Modal transparent={true} onRequestClose={()=>this.props.onCancel()}>
        <TouchableWithoutFeedback onPress={()=>this.props.shadowClick==='submit'?this.props.onSubmit():this.props.onCancel()}>
          <Animated.View style={[styles.masker,{opacity:this.state.maskerOpacity}]} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.item_container,{
          height:this.props.height,
          transform:[{
            translateY:this.state.bottomPosition.interpolate({
              inputRange:[0,1],
              outputRange:[this.props.height,0]
            })
          }]
        }]}>
          <View style={styles.item_top}>
            <Text style={styles.item_top_btn} onPress={()=>this.props.onCancel()}>{this.props.cancelText}</Text>
						<View style={styles.item_top_title_container}>
            	<Text style={styles.item_top_title}>{this.props.title}</Text>
							{this.props.titleRight}
						</View>
            <Text style={styles.item_top_btn} onPress={()=>this.props.onSubmit()}>{this.props.submitText}</Text>
          </View>
					{item.length>0?this.props.scrollEnabled?
						<ScrollView style={styles.items_scroll}>
							{item}
						</ScrollView>:
						<View style={styles.items}>
							{item}
						</View>:this.props.ListEmptyComponent}
        </Animated.View>
      </Modal>:null
    );
  }
}

const styles=StyleSheet.create({
  masker:{
    backgroundColor:'#000',
    flex:1
  },
  item_container:{
    position:'absolute',
    bottom:0,
    width:'100%',
    backgroundColor:'#fff'
  },
  item_top:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:12,
    borderColor:'#ddd',
    borderBottomWidth:.5,
    backgroundColor:'#f3f3f3'
  },
  item_top_btn:{
    color:'#666',
    fontWeight:'bold',
    fontSize:14
  },
	item_top_title_container:{
		flexDirection:'row',
		alignItems:'center'
	},
  item_top_title:{
    fontSize:16,
    fontWeight:'bold',
    letterSpacing:1
  },
  items:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    flexWrap:'wrap',
    backgroundColor:'#f9f9f9'
  },
	items_scroll:{
  	paddingVertical:6,
		backgroundColor:'#f9f9f9'
	}
});
