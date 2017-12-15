import React from 'react';
import {StyleSheet,Animated,View,Text,TouchableWithoutFeedback} from 'react-native';

export default class extends React.Component{
  static defaultProps={
    show:false,
    height:120,
    title:'',
    data:[],
    renderItem:({})=>{},
    cancelText:'cancel',
    submitText:'submit',
    onCancel:()=>{},
    onSubmit:()=>{}
  };
  constructor(props){
    super(props);
    this.state={maskerOpacity:new Animated.Value(this.props.show?.5:0),bottomPosition:new Animated.Value(this.props.show?1:0),show:this.props.show};
    this.flag=false;
  }
  componentDidMount() {
    this.flag=true;
  }
  render(){
    if(this.props.show&&!this.state.show)
      this.setState({show:true});
    let item=[];
    for(let i=0;i<this.props.data.length;i++)
      item.push(this.props.renderItem({item:this.props.data[i],index:i}));
    if(this.flag)
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
      ]).start(()=>!this.props.show&&this.state.show?this.setState({show:false}):null);
    return(
      this.state.show?<View style={styles.container}>
        <TouchableWithoutFeedback onPress={()=>this.props.onCancel()}>
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
            <Text style={styles.item_top_title}>{this.props.title}</Text>
            <Text style={styles.item_top_btn} onPress={()=>this.props.onSubmit()}>{this.props.submitText}</Text>
          </View>
          <View style={styles.items}>
            {item}
          </View>
        </Animated.View>
      </View>:null
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    zIndex:100
  },
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
  item_top_title:{
    fontSize:16,
    fontWeight:'bold',
    letterSpacing:1
  },
  items:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    flexWrap:'wrap',
    backgroundColor:'#f9f9f9'
  }
});
