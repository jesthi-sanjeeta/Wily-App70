import React from 'react';
import {Text, View,TouchableOpacity,StyleSheet,Image} from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';
export default class BookTransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
            scannedBookId:'',
            scannedStudentId:''
        }
    }
    getCameraPermission =async(id)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status=== "granted",
            buttonState:id,
            scanned:false
        })
    }
    handleBarCodeScanned=async({type,data})=>{
        if(this.state.buttonState==="bookId")
        this.setState({
            scanned:true,
            scannedBookId:data,
            buttonState:'normal'
        })
        if(this.state.buttonState==="studentId")
        this.setState({
            scanned:true,
            scannedStudentId:data,
            buttonState:'normal'
        })
        

    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState= this.state.buttonState;
        if(buttonState!='normal' && hasCameraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}
            />)
        }
        else if(buttonState === 'normal'){
            return(
                
                <View style={styles.container}>
                    <View>
                        <Image 
                        source={require("../assets/booklogo.jpg")}
                        style ={{width:200,height:200}}
                        />
                        <Text style={{textAlign:'center',fontSize:30}}>Wily</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputBox}
                        placeholder="Book Id"
                        value={this.state.scannedBookId}/>
                        <TouchableOpacity onPress={()=>{this.getCameraPermission("bookId")}}
                        style ={styles.scanButton} >
                            <Text>Scan </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputView}>
                    <TextInput style={styles.inputBox}
                    placeholder="StudentId Id"
                    value={this.state.scannedStudentId}/>
                    <TouchableOpacity onPress={()=>{this.getCameraPermission("studentId")}}
                    style ={styles.scanButton}>
                        <Text>Scan </Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    }
  });