import React, {Component} from 'react';  
import {Platform, StyleSheet,Text, View,Button,TouchableOpacity,Alert,Colors, ToastAndroid} from 'react-native';  
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {AsyncStorage} from 'react-native';
import {PermissionsAndroid, Image} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

/**
 * Array : Choices for a Radio Buttons
 */
var skills = [
  { label : "Yes", value: "You Selected - Yes"},
  { label : "No", value: "You Selected - No" },
  ];

export default class App extends Component {  
  constructor(props) {
    super(props);
    this.state={
      filePath : ''
    }
  }

  /**
   * Method used to take permission from Android Real Device
   * @param
   * @returns
   */
  requestRunTimePermission=()=> {
    var that = this;
    async function externalStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message:'App needs access to Storage data.',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        that.createPDF_File();
      } else {
        alert('WRITE_EXTERNAL_STORAGE permission denied');
      }
    } catch (err) {
      Alert.alert('Write permission err', err);
      console.warn(err);
    }
   }
 
    if (Platform.OS === 'android') {
      externalStoragePermission();
    } else {
      this.createPDF_File();
    }
  }
 
  /**
   * Method used to create PDF file 
   * @param
   * @returns : Feedback Form Data (Questions and Answers selected)
   */

  async createPDF_File() {
    let options = {
      // HTML Content for PDF.
      // I am putting all the HTML code in Single line but if you want to use large HTML code then you can use + Symbol to add them.
      html:
        '<h1 style="text-align: center;"><strong>Thank You for your feedback.</strong></h1><p style="color:red;">Your Feedback.</p><p style="text-align: left; "color:red"><strong>1.Have you worked on React Native ?</strong></p><p style="text-align: left;">Answer - Yes.</p><p style="text-align: left;"><strong>2.Would you like to become Full Stack Developer ?</strong></p><p style="text-align: left;">Answer - No.</p><p style="text-align: left;"><strong>3.Do you need training on AWS Cloud ?</strong></p><p style="text-align: left;">Answer - Yes.</p>',
      // Setting UP File Name for PDF File.
       
      fileName: 'feedback',
 
      //File directory in which the PDF File Will Store.
      directory: 'docs',
    };
 
    let file = await RNHTMLtoPDF.convert(options);
 
    console.log(file.filePath);
 
    Alert.alert(file.filePath);
 
    this.setState({filePath:file.filePath});
  }

  render() {  
    return (    
      <View>    
  <Text style={stylesText.wordBold,stylesText.italicText}>{"\n\t"}Mobiliya Quest</Text>  
    <Text style={styles.welcome}>Hi Nilesh,</Text>    
     <Text style={stylesText.wordBold, stylesText.capitalLetter,stylesText.textcolor}>Complete the Technical Survey. {"\n"}</Text>
        
        <Text style={stylesText.wordBold, stylesText.capitalLetter,stylesText.textBackground}> 1.Have you worked on React Native ?</Text>
        <View style={stylesRadio.container,stylesRadio.text,stylesText.textBackground}>
          <RadioForm 
          radio_props={skills}
          formHorizontal={true}
          labelHorizontal={true}
          radioStyle={{paddingRight: 20}}
          initial={-1}
          selectedLabelColor={'green'}
          labelStyle={{fontSize:17}}
          disable={true}
          onPress= { (value) => {ToastAndroid.show(value.toString(), ToastAndroid.SHORT)}  }
          />
        </View>

        <Text>{"\n"} </Text>
        <Text style={styles.welcome,stylesText.textBackground}>2.Would you like to become a Full Stack Developer?</Text>
        <View style={stylesRadio.container,stylesText.capitalLetter,stylesText.textBackground}>
          <RadioForm 
          radio_props={skills}
          formHorizontal={true}
          labelHorizontal={true}
          radioStyle={{paddingRight: 20}}
          initial={-1}
          selectedLabelColor={'green'}
          labelStyle={{fontSize:17}}
          disable={true}
          onPress= { (value) => {ToastAndroid.show(value.toString(), ToastAndroid.SHORT)}  }
          />
        </View>

        <Text>{"\n"} </Text>
        <Text style={stylesText.wordBold, stylesText.capitalLetter,stylesText.textBackground}> 3.Do you need training on AWS Cloud ?</Text>
        <View style={stylesRadio.container,stylesRadio.text,stylesText.textBackground}>
          <RadioForm 
          radio_props={skills}
          formHorizontal={true}
          labelHorizontal={true}
          radioStyle={{paddingRight: 20}}
          initial={-1}
          selectedLabelColor={'green'}
          labelStyle={{fontSize:17}}
          disable={true}        
          onPress= { (value) => <Text>{ToastAndroid.show(value.toString(), ToastAndroid.SHORT)}</Text>  }
          />
        </View>

    <Text>{"\n"}</Text>
      <View style = {styles2.container}>
      <TouchableOpacity>
        <Text onPress= {this.requestRunTimePermission} style = {styles2.text}>
        Submit Feedback 
        </Text>
      </TouchableOpacity>
      <Text style={stylesFile.text}>{"\n"}{'Saved File Path = ' + this.state.filePath}</Text>
      </View>
    
      </View>  
    );  
  }  
}

/**
 * Stylesheet used for text 
 */
const styles = StyleSheet.create({  
  welcome: {  
    fontSize: 20,  
    textAlign: 'left',
    color: 'black',  
    margin: 10,  
  }  
});

/**
 * Stylesheet used for Submit Touchable Opacity 
 */
const styles2 = StyleSheet.create ({
  container: {
     alignItems: 'center',
     fontSize: 20,
  },
  text: {
     borderWidth: 1,
     padding: 10,
     borderColor: 'black',
     color: 'white',
     fontSize: 20, 
     backgroundColor: '#1e90ff'
    //#7b68ee
  }
})

/**
 * Stylesheet used for Radio Props(Buttons)
 */
const stylesRadio = StyleSheet.create ({
  container: {
     alignItems: 'center',
     fontSize: 20,
  },
  text:{
    fontSize : 25,
  }
})

/**
 * All Text (stylesText) Effects
 */

const stylesText = StyleSheet.create ({
  container: {
     alignItems: 'center',
     marginTop: 100,
     padding: 20    
  },
  text: {
     color: '#41cdf4',
  },
  capitalLetter: {
     color: 'black',
     fontSize: 20,   
  },
  wordBold: {
     fontWeight: 'bold',
     color: 'black'  
  },
  italicText: {
     color: '#37859b',
     fontStyle: 'italic',
     fontWeight: 'bold',
     color: 'black',fontSize: 25
  },
  textBackground: {
    backgroundColor: '#d9f9b1',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textcolor:{
    color : '#008080',fontSize: 20
  },
  wt:{
    fontWeight: 'bold',
  }
})



const stylesFile = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
 
  button: {
    width: '100%',
    paddingTop:10,
    paddingBottom:10,
    backgroundColor: '#00E676',
    borderRadius:9,
  },
 
  text: {
    color: '#000',
    textAlign:'center',
    fontSize: 21
  }
});